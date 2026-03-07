import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `https://cyber-notes-hub-backend.onrender.com/api/notes/${id}`
        );
        setNote(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNote();
  }, [id]);

  const copyPayload = () => {
    navigator.clipboard.writeText(note.payload);
    alert("Payload copied!");
  };

  if (!note) {
    return <p className="text-zinc-400">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* MAIN CONTENT */}
      <div className="lg:col-span-3">

        {/* Title */}
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          <ReactMarkdown>{note.title}</ReactMarkdown>
        </h1>

        {/* Summary */}
        <div className="text-zinc-400 mb-6">
          <ReactMarkdown>{note.summary}</ReactMarkdown>
        </div>

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
            <h2 id="concept" className="text-xl font-semibold text-green-400 mb-2">
              Concept
            </h2>

            <div className="text-zinc-400 mb-6">
              <ReactMarkdown>{note.concept}</ReactMarkdown>
            </div>
          </>
        )}

        {/* Payload */}
        {note.payload && (
          <>
            <div className="flex justify-between items-center mb-2">
              <h2 id="payload" className="text-xl font-semibold text-green-400">
                Payload
              </h2>

              <button
                onClick={copyPayload}
                className="text-xs bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700"
              >
                Copy
              </button>
            </div>

            <SyntaxHighlighter
              language="bash"
              style={oneDark}
              customStyle={{
                background: "#000000",
                borderRadius: "10px",
                padding: "20px",
                fontSize: "14px",
                marginBottom: "20px"
              }}
            >
              {note.payload}
            </SyntaxHighlighter>
          </>
        )}

        {/* Explanation */}
        {note.explanation && (
          <>
            <h2 id="explanation" className="text-xl font-semibold text-green-400 mb-2">
              Explanation
            </h2>

            <div className="text-zinc-400 mb-6">
              <ReactMarkdown>{note.explanation}</ReactMarkdown>
            </div>
          </>
        )}

        {/* Mitigation */}
        {note.mitigation && (
          <>
            <h2 id="mitigation" className="text-xl font-semibold text-green-400 mb-2">
              Mitigation
            </h2>

            <div className="text-zinc-400 mb-6">
              <ReactMarkdown>{note.mitigation}</ReactMarkdown>
            </div>
          </>
        )}

        {/* References */}
        {note.references && (
          <>
            <h2 id="references" className="text-xl font-semibold text-green-400 mb-2">
              References
            </h2>

            <div className="text-zinc-400 mb-6">
              <ReactMarkdown>{note.references}</ReactMarkdown>
            </div>
          </>
        )}

      </div>

      {/* TABLE OF CONTENTS */}
      <div className="hidden lg:block">

        <div className="sticky top-24 bg-zinc-900 border border-zinc-800 rounded-xl p-4">

          <h3 className="text-green-400 font-semibold mb-3">
            Contents
          </h3>

          <nav className="flex flex-col gap-2 text-sm text-zinc-400">

            {note.concept && (
              <a href="#concept" className="hover:text-green-400">
                Concept
              </a>
            )}

            {note.payload && (
              <a href="#payload" className="hover:text-green-400">
                Payload
              </a>
            )}

            {note.explanation && (
              <a href="#explanation" className="hover:text-green-400">
                Explanation
              </a>
            )}

            {note.mitigation && (
              <a href="#mitigation" className="hover:text-green-400">
                Mitigation
              </a>
            )}

            {note.references && (
              <a href="#references" className="hover:text-green-400">
                References
              </a>
            )}

          </nav>

        </div>

      </div>

    </div>
  );
}

export default NoteDetails;