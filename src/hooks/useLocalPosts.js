import { useCallback } from 'react';
import { saveLocalPost, deleteLocalPost } from '../utils/storage';

export function useLocalPosts(refresh) {
  const save = useCallback(
    (post) => {
      saveLocalPost(post);
      refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    (slug) => {
      deleteLocalPost(slug);
      refresh();
    },
    [refresh]
  );

  return { save, remove };
}
