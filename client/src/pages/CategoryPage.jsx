import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CategoryPage() {
  const { category } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");

        const filtered = res.data.filter(
          (note) =>
            note.category.toLowerCase().replace(/\s/g, "-") === category
        );

        setNotes(filtered);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, [category]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        {category.replace("-", " ").toUpperCase()}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link
            key={note._id}
            to={`/notes/${note._id}`}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-green-400"
          >
            <h2 className="text-lg font-semibold text-green-400 mb-2">
              {note.title}
            </h2>

            <p className="text-zinc-400 text-sm mb-3">
              {note.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;