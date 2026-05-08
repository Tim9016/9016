import { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import styles from './CommentSection.module.css';

export default function CommentSection({ postSlug }) {
  const { comments, add, remove } = useComments(postSlug);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    add(name.trim(), content.trim());
    setContent('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <section className={styles.section}>
      <h3>评论 ({comments.length})</h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.nameInput}
          placeholder="你的昵称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className={styles.contentInput}
          placeholder="写下你的评论..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
        />
        <button type="submit" className={styles.submitBtn}>
          {submitted ? '已提交！' : '发表评论'}
        </button>
      </form>

      {!comments.length && (
        <p className={styles.empty}>暂无评论，快来抢沙发吧！</p>
      )}

      <div className={styles.list}>
        {comments
          .slice()
          .reverse()
          .map((c) => (
            <div key={c.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.commentName}>{c.name}</span>
                <span className={styles.commentTime}>
                  {new Date(c.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <p className={styles.commentContent}>{c.content}</p>
              <button
                className={styles.deleteBtn}
                onClick={() => remove(c.id)}
              >
                删除
              </button>
            </div>
          ))}
      </div>
    </section>
  );
}
