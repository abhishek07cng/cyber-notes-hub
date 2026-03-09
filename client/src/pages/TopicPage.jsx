import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TopicPage() {
  const { topic } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(
        "https://cyber-notes-hub-backend.onrender.com/api/notes"
      );

      const filtered = res.data
        .filter(
          (note) =>
            note.topic.toLowerCase().replace(/\s/g, "-") === topic
        )
        .sort((a, b) => a.order - b.order);

      setNotes(filtered);
    };

    fetchNotes();
  }, [topic]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        {topic.replace("-", " ").toUpperCase()}
      </h1>

      <div className="space-y-4">

        {notes.map((note) => (
          <Link
            key={note._id}
            to={`/notes/${note._id}`}
            className="block bg-zinc-900 p-5 rounded-xl border border-zinc-800 hover:border-green-400"
          >
            <span className="text-green-400 mr-3">
              {note.order}.
            </span>

            {note.title}
          </Link>
        ))}

      </div>
    </div>
  );
}

export default TopicPage;