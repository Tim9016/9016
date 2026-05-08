import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { usePosts } from '../../hooks/usePosts';
import { useLocalPosts } from '../../hooks/useLocalPosts';
import CommentSection from '../../components/CommentSection/CommentSection';
import styles from './Post.module.css';

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts, loading, refresh } = usePosts();
  const { remove } = useLocalPosts(refresh);

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>文章未找到</h2>
        <p>你查找的文章不存在或已被删除。</p>
        <Link to="/" className={styles.backLink}>
          返回首页
        </Link>
      </div>
    );
  }

  function handleDelete() {
    if (window.confirm('确定要删除这篇文章吗？')) {
      remove(post.slug);
      navigate('/');
    }
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <time>{post.date}</time>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {post.isLocal && (
        <div className={styles.actions}>
          <Link to={`/edit/${post.slug}`} className={styles.editBtn}>
            编辑
          </Link>
          <button onClick={handleDelete} className={styles.deleteBtn}>
            删除
          </button>
        </div>
      )}

      <CommentSection postSlug={post.slug} />
    </article>
  );
}
