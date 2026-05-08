import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import { useLocalPosts } from '../../hooks/useLocalPosts';
import PostEditor from '../../components/PostEditor/PostEditor';
import styles from './Create.module.css';

export default function Create() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts, loading, refresh } = usePosts();
  const { save } = useLocalPosts(refresh);

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  const isEditing = Boolean(slug);
  const existingPost = isEditing ? posts.find((p) => p.slug === slug) : null;

  if (isEditing && !existingPost) {
    return (
      <div className={styles.notFound}>
        <h2>文章不存在</h2>
      </div>
    );
  }

  if (isEditing && !existingPost.isLocal) {
    return (
      <div className={styles.notFound}>
        <h2>无法编辑</h2>
        <p>内置文章不支持在线编辑。</p>
      </div>
    );
  }

  function handleSave(post) {
    save(post);
    navigate(`/post/${post.slug}`);
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>
        {isEditing ? '编辑文章' : '写新文章'}
      </h1>
      <PostEditor initialData={existingPost} onSave={handleSave} />
    </div>
  );
}
