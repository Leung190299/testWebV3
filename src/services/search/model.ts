import { generateRandomId } from '@/utilities/string';

let mapSearch = new Map<string, { id: string; text: string; timestamp: number }[]>();
const KEY = '__pit-ui-search';
export function saveSearchQuery(key: string, text: string) {
  if (!text) return;
  const history = getHistory(key);
  const itemIndex = history.findIndex((s) => s.text == text);
  if (itemIndex !== -1) history.splice(itemIndex, 1);
  const query = { id: generateRandomId(), text, timestamp: Date.now() };
  history.unshift(query);
  if (history.length > 6) history.splice(6, history.length - 1);
  localStorage.setItem(KEY + '_' + key, JSON.stringify(history));
  return history;
}
export function getSearchQueryHistory(key: string) {
  const history = getHistory(key);
  try {
    const raw = localStorage.getItem(KEY + '_' + key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((s) => typeof s === 'object')) {
        history.length = 0;
        history.push(...parsed.slice(0, 6).map((d) => (d.id ? d : { ...d, id: generateRandomId() })));
      }
    }
  } catch (error) {}
  return history;
}

function getHistory(key: string) {
  return mapSearch.get(key) || mapSearch.set(key, []).get(key)!;
}
