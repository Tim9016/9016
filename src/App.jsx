import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Create from './pages/Create/Create';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter basename="/9016">
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:slug" element={<Create />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
