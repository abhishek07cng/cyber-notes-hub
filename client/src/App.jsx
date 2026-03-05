import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TagPage from "./pages/TagPage";
import { Link } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row">

      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex md:w-64 bg-zinc-900 border-r border-zinc-800 flex-col p-6 sticky top-0 h-screen">


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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar (Mobile) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
          <h2 className="text-lg font-bold text-green-400">
            Security Journal
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-400"
          >
            ☰
          </button>
        </div>

        {/* Mobile Sidebar */}
        {isOpen && (
          <div className="md:hidden bg-zinc-900 p-4 border-b border-zinc-800">
            <nav className="flex flex-col gap-3 text-sm">
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
        )}

        {/* Page Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/tags/:tag" element={<TagPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default App;