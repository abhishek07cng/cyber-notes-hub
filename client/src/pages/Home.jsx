import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);
  console.log(notes);
  const filteredNotes = notes
    .filter((note) =>
      category === "All" ? true : note.category === category
    )
    .filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  return (
    <div>
      <input
        type="text"
        placeholder="Search research topics..."
        className="mb-6 w-full bg-zinc-800 p-3 rounded text-white outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
      <h1 className="text-2xl font-bold mb-6">
        Latest Research Logs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Link
            to={`/notes/${note._id}`}
            key={note._id}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-green-400 transition"
          >
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              {note.title}
            </h2>

            <p className="text-zinc-400 text-sm mb-3">
              {note.summary}
            </p>
            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-3">
              {note.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-zinc-800 px-2 py-1 rounded text-green-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-zinc-500">

              <span>{note.category}</span>

              <span
                className={`px-2 py-1 rounded text-xs font-medium ${note.difficulty === "Beginner"
                    ? "bg-green-900 text-green-400"
                    : note.difficulty === "Intermediate"
                      ? "bg-yellow-900 text-yellow-400"
                      : "bg-red-900 text-red-400"
                  }`}
              >
                {note.difficulty}
              </span>

              <span>{new Date(note.createdAt).toLocaleDateString()}</span>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;