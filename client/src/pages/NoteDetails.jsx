import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notes/${id}`
        );
        setNote(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <p className="text-zinc-400">Loading...</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-green-400 mb-4">
        {note.title}
      </h1>

      <p className="text-zinc-400 mb-6">
        {note.summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-zinc-800 px-2 py-1 rounded text-green-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mb-4 text-sm text-zinc-500 flex gap-4">
        <span>Category: {note.category}</span>
        <span>Difficulty: {note.difficulty}</span>
      </div>

      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 leading-relaxed whitespace-pre-line">
        {note.content}
      </div>
    </div>
  );
}

export default NoteDetails;