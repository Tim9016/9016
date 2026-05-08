import profile from '../../data/profile';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <h1>关于我</h1>
      <div className={styles.card}>
        <div className={styles.avatar}>{profile.avatar}</div>
        <h2>你好，我是{profile.name}</h2>
        <p>{profile.bio}</p>
        <div className={styles.skills}>
          <h3>专业领域</h3>
          <div className={styles.tags}>
            {profile.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
        <div className={styles.contact}>
          <h3>联系方式</h3>
          <p>📧 {profile.email}</p>
          {profile.github && <p>GitHub: {profile.github}</p>}
        </div>
      </div>
    </div>
  );
}
