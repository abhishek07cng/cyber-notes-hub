import { useEffect, useState } from "react";
import axios from "axios";
import { ReactTyped } from "react-typed";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/ui/EmptyState";
import { NoteCardSkeletonGrid } from "../components/ui/NoteCardSkeleton";
import { useNoteSearch } from "../context/NoteSearchContext";

function noteMatchesQuery(note, query) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  const searchableText = [
    note.title,
    note.summary,
    note.concept,
    note.explanation,
    note.payload,
    ...(note.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return searchableText.includes(normalized);
}

function Home() {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { searchQuery, debouncedSearchQuery } = useNoteSearch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("https://cyber-notes-hub-backend.onrender.com/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notes
    .filter((note) =>
      category === "All" ? true : note.category === category
    )
    .filter((note) => noteMatchesQuery(note, debouncedSearchQuery));

  return (
    <div>

      {/* HERO SECTION */}
      <div className="mb-12 text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
          Abhishek Kumar Singh
        </h1>

        <h2 className="text-xl md:text-2xl text-zinc-300 mb-4">
          Cybersecurity Learning Journal
        </h2>

        <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
          Documenting my journey in ethical hacking, vulnerability research,
          and hands-on security labs from platforms like TryHackMe and
          PortSwigger Web Security Academy.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:border-green-400"
          >
            GitHub
          </a>

          <a
            href="https://tryhackme.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:border-green-400"
          >
            TryHackMe
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:border-green-400"
          >
            LinkedIn
          </a>

        </div>

      </div>

      {/* TERMINAL BANNER */}
      <div className="mb-10 bg-black border border-zinc-800 rounded-xl p-6 font-mono text-green-400">

        <p>
          $ <ReactTyped strings={["whoami"]} typeSpeed={60} />
        </p>

        <p className="text-zinc-300 mb-3">
          <ReactTyped
            strings={["Abhishek Kumar Singh"]}
            typeSpeed={40}
            startDelay={800}
          />
        </p>

        <p>
          $ <ReactTyped
            strings={["role"]}
            typeSpeed={60}
            startDelay={2000}
          />
        </p>

        <p className="text-zinc-300 mb-3">
          <ReactTyped
            strings={["Cybersecurity Student"]}
            typeSpeed={40}
            startDelay={2800}
          />
        </p>

        <p>
          $ <ReactTyped
            strings={["status"]}
            typeSpeed={60}
            startDelay={4200}
          />
        </p>

        <p className="text-zinc-300">
          <ReactTyped
            strings={["Learning Ethical Hacking"]}
            typeSpeed={40}
            startDelay={5000}
          />
        </p>

      </div>

      {/* CURRENTLY LEARNING */}
      <div className="mb-10">

        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Currently Learning
        </h2>

        <div className="flex flex-wrap gap-3">

          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-sm text-green-400">
            SQL Injection
          </span>

          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-sm text-green-400">
            Cross-Site Scripting (XSS)
          </span>

          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-sm text-green-400">
            JWT Attacks
          </span>

          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-sm text-green-400">
            Privilege Escalation
          </span>

          <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-sm text-green-400">
            Network Enumeration
          </span>

        </div>

      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex gap-3 mb-6 flex-wrap">

        <button
          onClick={() => setCategory("All")}
          className="px-3 py-1 bg-zinc-800 rounded"
        >
          All
        </button>

        <button
          onClick={() => setCategory("Web Security")}
          className="px-3 py-1 bg-zinc-800 rounded"
        >
          Web Security
        </button>

        <button
          onClick={() => setCategory("Network Security")}
          className="px-3 py-1 bg-zinc-800 rounded"
        >
          Network Security
        </button>

        <button
          onClick={() => setCategory("System Exploitation")}
          className="px-3 py-1 bg-zinc-800 rounded"
        >
          System Exploitation
        </button>

      </div>

      {/* NOTES GRID */}
      <h1 className="text-2xl font-bold mb-6">
        Latest Research Logs
      </h1>

      {loading ? (
        <NoteCardSkeletonGrid />
      ) : filteredNotes.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} linkTags />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            searchQuery
              ? `No results found for '${searchQuery}'`
              : "No matching notes found"
          }
          description={
            searchQuery
              ? "Try a different keyword or clear search to see more notes."
              : "Try adjusting your category filters to discover relevant cybersecurity notes."
          }
        />
      )}

    </div>
  );
}

export default Home;