import { useState, useEffect, useMemo, useCallback } from 'react';
import { loadBuiltinPosts } from '../utils/posts';
import { getLocalPosts } from '../utils/storage';

export function usePosts() {
  const [builtinPosts, setBuiltinPosts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadBuiltinPosts().then((posts) => {
      setBuiltinPosts(posts);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLocalPosts(getLocalPosts());
  }, [refreshKey]);

  const allPosts = useMemo(() => {
    const combined = [...localPosts, ...builtinPosts];
    return combined.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [builtinPosts, localPosts]);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return { posts: allPosts, loading, refresh };
}
