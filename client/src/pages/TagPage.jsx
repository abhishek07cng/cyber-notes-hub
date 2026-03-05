import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TagPage() {
  const { tag } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");

        const filtered = res.data.filter(note =>
          note.tags?.includes(tag)
        );

        setNotes(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, [tag]);

  return (
    <div>

      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Notes tagged with: #{tag}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.map((note) => (
          <Link
            key={note._id}
            to={`/notes/${note._id}`}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-green-400 transition"
          >

            <h2 className="text-lg font-semibold text-green-400 mb-2">
              {note.title}
            </h2>

            <p className="text-zinc-400 text-sm mb-3">
              {note.summary}
            </p>

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
                className={`px-2 py-1 rounded text-xs ${
                  note.difficulty === "Beginner"
                    ? "bg-green-900 text-green-400"
                    : note.difficulty === "Intermediate"
                    ? "bg-yellow-900 text-yellow-400"
                    : "bg-red-900 text-red-400"
                }`}
              >
                {note.difficulty}
              </span>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}

export default TagPage;