import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";


function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex md:w-64 bg-zinc-900 border-r border-zinc-800 flex-col p-6">
        <h2 className="text-xl font-bold text-green-400 mb-8">
          Security Journal
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <a href="#" className="hover:text-green-400">Dashboard</a>
          <a href="#" className="hover:text-green-400">Web Security</a>
          <a href="#" className="hover:text-green-400">Network Security</a>
          <a href="#" className="hover:text-green-400">System Exploitation</a>
          <a href="#" className="hover:text-green-400">Secure Coding</a>
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
              <a href="#" className="hover:text-green-400">Dashboard</a>
              <a href="#" className="hover:text-green-400">Web Security</a>
              <a href="#" className="hover:text-green-400">Network Security</a>
              <a href="#" className="hover:text-green-400">System Exploitation</a>
              <a href="#" className="hover:text-green-400">Secure Coding</a>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetails />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;