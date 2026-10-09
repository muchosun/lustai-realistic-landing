'use strict';
const search = document.querySelector('#search');
const age = document.querySelector('#age');
const sort = document.querySelector('#sort');
const grid = document.querySelector('#character-grid');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
const clear = document.querySelector('#clear-search');
const incoming = new URLSearchParams(location.search);
const attributionKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','source_id','clickid','click_id','affid','tracker','fbclid','gclid','ttclid','sub1','sub2','sub3','sub4','sub5'];
function productUrl(path = '/', recipient) {
  const url = new URL(path, 'https://lustai.chat');
  url.searchParams.set('utm_source', 'github_pages');
  url.searchParams.set('utm_medium', 'landing');
  for (const key of attributionKeys) {
    const value = incoming.get(key);
    if (value && value.length <= 512) url.searchParams.set(key, value);
  }
  url.searchParams.set('lander', 'realistic_catalog');
  if (recipient !== undefined) url.searchParams.set('recipient', String(recipient));
  return url.href;
}
document.querySelectorAll('[data-product-link]').forEach(link => {
  link.href = productUrl(new URL(link.href).pathname);
});
let characters = [];
function createCard(character, index) {
  const link = document.createElement('a');
  link.className = 'character-card';
  link.href = productUrl('/chat', character.id);
  link.setAttribute('aria-label', `Chat with ${character.name}, ${character.age}`);
  const image = document.createElement('img');
  image.src = `assets/characters/${character.id}.webp`;
  image.alt = `${character.name}, an AI-generated character`;
  image.loading = index < 5 ? 'eager' : 'lazy';
  image.decoding = 'async';
  if (index < 2) image.fetchPriority = 'high';
  const content = document.createElement('div');
  content.className = 'card-content';
  const name = document.createElement('h2');
  name.className = 'card-name';
  name.append(document.createTextNode(character.name));
  const years = document.createElement('span');
  years.className = 'card-age';
  years.textContent = character.age;
  name.append(years);
  const bio = document.createElement('p');
  bio.className = 'card-bio';
  bio.textContent = character.bio;
  const action = document.createElement('div');
  action.className = 'card-action';
  const label = document.createElement('span');
  label.textContent = 'Start chatting';
  const arrow = document.createElement('span');
  arrow.textContent = '→';
  arrow.setAttribute('aria-hidden', 'true');
  action.append(label, arrow);
  content.append(name, bio, action);
  link.append(image, content);
  return link;
}
function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const filtered = characters.filter(c => {
    const textMatch = !query || `${c.name} ${c.bio}`.toLocaleLowerCase().includes(query);
    const ageMatch = age.value === 'all' || (age.value === '30' ? c.age >= 30 : c.age >= Number(age.value.split('-')[0]) && c.age <= Number(age.value.split('-')[1]));
    return textMatch && ageMatch;
  });
  if (sort.value === 'popular') filtered.sort((a,b) => b.likes-a.likes);
  if (sort.value === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
  grid.replaceChildren(...filtered.map(createCard));
  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'character' : 'characters'}`;
  empty.hidden = filtered.length !== 0;
  clear.hidden = !search.value;
}
search.addEventListener('input', render);
age.addEventListener('change', render);
sort.addEventListener('change', render);
clear.addEventListener('click', () => {search.value = ''; render(); search.focus();});
document.querySelector('#reset-filters').addEventListener('click', () => {search.value = ''; age.value = 'all'; sort.value = 'featured'; render(); search.focus();});
fetch('characters.json').then(r => {if (!r.ok) throw new Error('Catalog unavailable'); return r.json();}).then(data => {
  characters = data.filter(c => Number.isInteger(c.id) && c.age >= 18 && typeof c.name === 'string' && typeof c.bio === 'string');
  render();
}).catch(() => {count.textContent = 'Catalog unavailable'; document.querySelector('#load-error').hidden = false;});
