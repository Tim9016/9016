import matter from 'gray-matter';

const mdModules = import.meta.glob('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
});

function generateSlug(filename) {
  return filename.replace(/^.*[\\/]/, '').replace(/\.md$/, '');
}

function generateExcerpt(content, maxLen = 150) {
  const plain = content.replace(/[#*>`\[\]()!_~|]/g, '').replace(/\n+/g, ' ').trim();
  return plain.length > maxLen ? plain.slice(0, maxLen) + '...' : plain;
}

export async function loadBuiltinPosts() {
  const entries = await Promise.all(
    Object.entries(mdModules).map(async ([path, loader]) => {
      const raw = await loader();
      const { data, content } = matter(raw);
      const slug = generateSlug(path);
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        category: data.category || '未分类',
        tags: data.tags || [],
        excerpt: data.excerpt || generateExcerpt(content),
        content,
        isLocal: false,
      };
    })
  );
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllTags(posts) {
  const tagSet = new Set();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return [...tagSet].sort();
}

export function getAllCategories(posts) {
  const catSet = new Set();
  posts.forEach((p) => catSet.add(p.category));
  return [...catSet].sort();
}
