import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TagPage from "./pages/TagPage";
import { Link } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import TopicPage from "./pages/TopicPage";
import AppShell from "./components/layout/AppShell";

function App() {
  return (
    <AppShell
      sidebar={
        <div className="flex h-full flex-col p-6">
        <h2 className="text-xl font-bold text-green-400 mb-8">
          Security Journal
        </h2>

        <p className="text-xs text-zinc-500 uppercase mb-3">
          Categories
        </p>

        <nav className="flex flex-col gap-4 text-sm">
          <Link to="/" className="hover:text-green-400">Dashboard</Link>
          <Link to="/category/web-security" className="hover:text-green-400">
            Web Security
          </Link>

          <Link to="/category/network-security" className="hover:text-green-400">
            Network Security
          </Link>

          <Link to="/category/system-exploitation" className="hover:text-green-400">
            System Exploitation
          </Link>

          <Link to="/category/secure-coding" className="hover:text-green-400">
            Secure Coding
          </Link>
        </nav>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<NoteDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/topic/:topic" element={<TopicPage />} />
      </Routes>
      <Footer />
    </AppShell>
  );
}

export default App;