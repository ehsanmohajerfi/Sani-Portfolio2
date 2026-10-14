// Lightweight behavior checks; these do not replace browser layout testing.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../site.js', import.meta.url), 'utf8');
function element(dataset = {}) {
  const classes = new Set(), listeners = {};
  return { dataset, listeners, attributes: {}, hidden: true, focused: false,
    addEventListener(name, fn) { listeners[name] = fn; },
    setAttribute(key, value) { this.attributes[key] = value; },
    focus() { this.focused = true; },
    classList: { add(c) { classes.add(c); }, remove(c) { classes.delete(c); }, contains(c) { return classes.has(c); }, toggle(c) { if (classes.has(c)) { classes.delete(c); return false; } classes.add(c); return true; } }
  };
}
for (const storageBlocked of [false, true]) {
  const root = { lang: 'en', dataset: { lang: 'fi', theme: 'light' } };
  const menu = element(), nav = element(), theme = element(), top = element();
  const en = element({language:'en'}), fi = element({language:'fi'}), link = element();
  const title = element({en:'English title',fi:'Suomenkielinen otsikko'});
  const desc = element({en:'English description',fi:'Suomenkielinen kuvaus'});
  const themeMeta = element(), ogTitle = element(), ogDescription = element();
  const text = { textContent: ' Home ', parentElement: { closest() { return null; } } };
  const selectors = { '[data-menu]':menu, '.links':nav, '[data-theme-toggle]':theme, '[data-back-top]':top, '[data-back-top],#top':top,
    'title':title, 'meta[name="description"]':desc, 'meta[name="theme-color"]':themeMeta,
    'meta[property="og:title"]':ogTitle, 'meta[property="og:description"]':ogDescription };
  const documentListeners = {}, windowListeners = {}, stored = {};
  const doc = { documentElement:root, body:{}, title:'English title',
    querySelector(s) { return selectors[s] ?? null; },
    querySelectorAll(s) { return s === '.links a' ? [link] : s === '[data-menu]' ? [menu] : s === '[data-language],[data-set]' ? [en,fi] : []; },
    createTreeWalker() { let done = false; return { currentNode:text, nextNode() { if(done) return false; done=true; return true; } }; },
    addEventListener(n,f) { documentListeners[n]=f; }
  };
  const win = { finnishTranslations:{Home:'Etusivu'}, innerWidth:320, scrollY:0, addEventListener(n,f) {windowListeners[n]=f;}, scrollTo(v) {this.scrollResult=v;} };
  vm.runInNewContext(source, {document:doc,window:win,NodeFilter:{SHOW_TEXT:4},matchMedia:()=>({matches:true}),localStorage:{setItem(k,v){if(storageBlocked) throw Error('blocked');stored[k]=v;}}});
  assert.equal(root.lang,'fi'); assert.equal(text.textContent,' Etusivu '); assert.equal(doc.title,title.dataset.fi); assert.equal(desc.content,desc.dataset.fi);
  en.listeners.click(); assert.equal(text.textContent,' Home '); assert.equal(root.lang,'en'); assert.equal(doc.title,title.dataset.en);
  theme.listeners.click(); assert.equal(root.dataset.theme,'dark'); assert.equal(theme.attributes['aria-pressed'],'true'); assert.equal(themeMeta.attributes.content,'#000000');
  menu.listeners.click(); assert.equal(menu.attributes['aria-expanded'],'true');
  documentListeners.keydown({key:'Escape'}); assert.equal(menu.attributes['aria-expanded'],'false'); assert.equal(menu.focused,true);
  menu.listeners.click(); link.listeners.click(); assert.equal(menu.attributes['aria-expanded'],'false');
  menu.listeners.click(); win.innerWidth=1300; windowListeners.resize(); assert.equal(menu.attributes['aria-expanded'],'false');
  win.scrollY=500; windowListeners.scroll(); assert.equal(top.hidden,false);
  top.listeners.click(); assert.deepEqual({...win.scrollResult},{top:0,behavior:'auto'});
  win.scrollY=0; windowListeners.scroll(); assert.equal(top.hidden,true);
}
console.log('Passed: language/metadata switching, theme toggle, menu close/focus, resize, back-to-top, reduced motion and blocked storage.');
