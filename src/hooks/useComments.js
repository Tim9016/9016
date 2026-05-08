import { useState, useCallback } from 'react';
import { getComments, saveComment, deleteComment } from '../utils/storage';

export function useComments(postSlug) {
  const [comments, setComments] = useState(() => getComments(postSlug));

  const refresh = useCallback(() => {
    setComments(getComments(postSlug));
  }, [postSlug]);

  const add = useCallback(
    (name, content) => {
      const comment = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
        name,
        content,
        createdAt: new Date().toISOString(),
      };
      saveComment(postSlug, comment);
      refresh();
    },
    [postSlug, refresh]
  );

  const remove = useCallback(
    (commentId) => {
      deleteComment(postSlug, commentId);
      refresh();
    },
    [postSlug, refresh]
  );

  return { comments, add, remove };
}
