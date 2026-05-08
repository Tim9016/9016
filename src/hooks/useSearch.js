import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

export function useSearch(posts) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'content', 'tags', 'category', 'excerpt'],
        threshold: 0.4,
        includeScore: true,
      }),
    [posts]
  );

  const results = useMemo(() => {
    if (!query.trim()) return null;
    return fuse.search(query.trim()).map((r) => r.item);
  }, [query, fuse]);

  return { query, setQuery, results };
}
