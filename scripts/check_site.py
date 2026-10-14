"""Check static page metadata, local links, image dimensions and sitemap coverage."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
PAGES = list(ROOT.glob('*.html')) + [ROOT / 'my-story/index.html']

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = set()
        self.links = []
        self.metas = {}
        self.canonical = []
        self.h1 = 0
        self.title = 0
        self.images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f'{self.path}: duplicate ID {a["id"]}'
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self.title += 1
        if tag == 'meta': self.metas[a.get('name', a.get('property'))] = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a['href'])
        if tag == 'img': self.images.append(a)
        for key in ('src', 'href'):
            if a.get(key): self.links.append(a[key])

pages = {}
for path in PAGES:
    p = Page(path)
    source = path.read_text()
    p.feed(source)
    assert p.h1 == 1 and p.title == 1, f'{path}: expected one h1 and title'
    assert len(p.canonical) == 1 and p.canonical[0].startswith('https://ehsanmohajer.fi/'), path
    for key in ('description','viewport','og:title','og:description','og:url','og:image','twitter:card'):
        assert p.metas.get(key), f'{path}: missing {key}'
    assert p.metas['og:url'] == p.canonical[0], path
    for schema in re.findall(r'<script type="application/ld\+json">(.*?)</script>', source, re.S):
        data = json.loads(schema)
        assert data['url'] == p.canonical[0], path
    for image in p.images:
        assert 'alt' in image, f'{path}: missing image alt'
        if image.get('src') and not image['src'].endswith('.svg'):
            assert int(image.get('width', 0)) > 0 and int(image.get('height', 0)) > 0, f'{path}: missing image dimensions'
    pages[path.resolve()] = p

for path, page in pages.items():
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc: continue
        target = (ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/') else (path.parent / unquote(url.path)) if url.path else path
        if target.is_dir(): target /= 'index.html'
        assert target.exists(), f'{path}: missing {link}'
        if url.fragment and target.resolve() in pages:
            assert unquote(url.fragment) in pages[target.resolve()].ids, f'{path}: missing fragment {link}'

sitemap = ET.parse(ROOT / 'sitemap.xml')
urls = {e.text for e in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
assert urls == {p.canonical[0] for p in pages.values()}, 'Sitemap and canonical URLs differ'
assert 'Sitemap: https://ehsanmohajer.fi/sitemap.xml' in (ROOT / 'robots.txt').read_text()
print(f'Passed: {len(pages)} pages; metadata, structured data, image dimensions, local links/fragments, sitemap and robots.txt.')
