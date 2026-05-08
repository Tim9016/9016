const STORAGE_KEYS = {
  POSTS: 'blog_posts',
  COMMENTS: 'blog_comments',
};

export function getLocalPosts() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalPost(post) {
  const posts = getLocalPosts();
  const index = posts.findIndex((p) => p.slug === post.slug);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...post };
  } else {
    posts.push(post);
  }
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
}

export function deleteLocalPost(slug) {
  const posts = getLocalPosts().filter((p) => p.slug !== slug);
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
}

export function getComments(postSlug) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const all = data ? JSON.parse(data) : {};
    return all[postSlug] || [];
  } catch {
    return [];
  }
}

export function saveComment(postSlug, comment) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const all = data ? JSON.parse(data) : {};
    if (!all[postSlug]) all[postSlug] = [];
    all[postSlug].push(comment);
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(all));
  } catch {
    // ignore
  }
}

export function deleteComment(postSlug, commentId) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const all = data ? JSON.parse(data) : {};
    if (all[postSlug]) {
      all[postSlug] = all[postSlug].filter((c) => c.id !== commentId);
    }
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(all));
  } catch {
    // ignore
  }
}
