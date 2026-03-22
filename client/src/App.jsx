import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TagPage from "./pages/TagPage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import TopicPage from "./pages/TopicPage";
import AppShell from "./components/layout/AppShell";

function App() {
  return (
    <AppShell>
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