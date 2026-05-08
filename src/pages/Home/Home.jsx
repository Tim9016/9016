import { useState, useMemo } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { useSearch } from '../../hooks/useSearch';
import { getAllTags, getAllCategories } from '../../utils/posts';
import PostCard from '../../components/PostCard/PostCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import TagList from '../../components/TagList/TagList';
import Pagination from '../../components/Pagination/Pagination';
import styles from './Home.module.css';

const PAGE_SIZE = 6;

export default function Home() {
  const { posts, loading } = usePosts();
  const { query, setQuery, results } = useSearch(posts);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);

  const allTags = useMemo(() => getAllTags(posts), [posts]);
  const allCategories = useMemo(() => getAllCategories(posts), [posts]);

  const filtered = useMemo(() => {
    let list = results || posts;
    if (selectedTag) {
      list = list.filter((p) => p.tags.includes(selectedTag));
    }
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    return list;
  }, [posts, results, selectedTag, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  function handleTagSelect(tag) {
    setSelectedTag(tag);
    setPage(1);
  }

  function handleCategorySelect(cat) {
    setSelectedCategory(cat);
    setPage(1);
  }

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <SearchBar query={query} onSearch={setQuery} />
        <TagList
          title="分类"
          items={allCategories}
          selected={selectedCategory}
          onSelect={handleCategorySelect}
        />
        <TagList
          title="标签"
          items={allTags}
          selected={selectedTag}
          onSelect={handleTagSelect}
        />
      </aside>
      <main className={styles.main}>
        {filtered.length === 0 && (
          <p className={styles.empty}>没有找到匹配的文章。</p>
        )}
        <div className={styles.grid}>
          {paged.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <Pagination current={page} total={totalPages} onPage={setPage} />
      </main>
    </div>
  );
}
