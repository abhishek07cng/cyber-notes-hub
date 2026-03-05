import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-400 mb-4">
        {note.title}
      </h1>

      {/* Summary */}
      <p className="text-zinc-400 mb-6">
        {note.summary}
      </p>

      {/* Tags */}
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

      {/* Metadata */}
      <div className="mb-6 text-sm text-zinc-500 flex gap-4">
        <span>Category: {note.category}</span>
        <span>Difficulty: {note.difficulty}</span>
      </div>

      {/* Concept */}
      {note.concept && (
        <>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            Concept
          </h2>
          <p className="text-zinc-400 mb-6 whitespace-pre-line">
            {note.concept}
          </p>
        </>
      )}

      {/* Payload */}
      {note.payload && (
        <>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            Payload Example
          </h2>
          <SyntaxHighlighter
            language="bash"
            style={oneDark}
            customStyle={{
              background: "#000000",
              color: "#00ff9c",
              borderRadius: "10px",
              padding: "20px",
              fontSize: "14px",
            }}
          >
            {note.payload}
          </SyntaxHighlighter>
        </>
      )}

      {/* Explanation */}
      {note.explanation && (
        <>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            Explanation
          </h2>
          <p className="text-zinc-400 mb-6 whitespace-pre-line">
            {note.explanation}
          </p>
        </>
      )}

      {/* Mitigation */}
      {note.mitigation && (
        <>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            Mitigation
          </h2>
          <p className="text-zinc-400 mb-6 whitespace-pre-line">
            {note.mitigation}
          </p>
        </>
      )}

      {/* References */}
      {note.references && (
        <>
          <h2 className="text-xl font-semibold text-green-400 mb-2">
            References
          </h2>
          <p className="text-zinc-400 whitespace-pre-line">
            {note.references}
          </p>
        </>
      )}

    </div>
  );
}

export default NoteDetails;