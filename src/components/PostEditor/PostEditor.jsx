import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './PostEditor.module.css';

export default function PostEditor({ initialData, onSave }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tagsStr, setTagsStr] = useState(
    initialData?.tags ? initialData.tags.join(', ') : ''
  );
  const [content, setContent] = useState(initialData?.content || '');
  const [preview, setPreview] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({
      slug: initialData?.slug || generateSlug(title),
      title: title.trim(),
      category: category.trim() || '未分类',
      tags: tagsStr
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      content: content.trim(),
      date: initialData?.date || new Date().toISOString().slice(0, 10),
      excerpt: content.replace(/[#*>`\[\]()!_~|]/g, '').slice(0, 120).trim() + '...',
      isLocal: true,
    });
  }

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="文章标题"
          required
        />
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>分类</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="例如：技术"
          />
        </div>
        <div className={styles.field}>
          <label>标签（逗号分隔）</label>
          <input
            type="text"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="例如：React, JavaScript"
          />
        </div>
      </div>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${!preview ? styles.activeTab : ''}`}
          onClick={() => setPreview(false)}
        >
          编辑
        </button>
        <button
          type="button"
          className={`${styles.tab} ${preview ? styles.activeTab : ''}`}
          onClick={() => setPreview(true)}
        >
          预览
        </button>
      </div>
      {preview ? (
        <div className={styles.preview}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="用 Markdown 写文章..."
          rows={16}
          required
        />
      )}
      <button type="submit" className={styles.submit}>
        保存文章
      </button>
    </form>
  );
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) + '-' + Date.now().toString(36);
}
