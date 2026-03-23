import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const codeBlockStyle = {
  background: "#000000",
  borderRadius: "10px",
  padding: "20px",
  fontSize: "14px",
  marginBottom: "20px",
};

function NoteDetails() {

  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {

    const fetchData = async () => {

      try {

        const noteRes = await axios.get(
          `https://cyber-notes-hub-backend.onrender.com/api/notes/${id}`
        );

        setNote(noteRes.data);

        const allRes = await axios.get(
          "https://cyber-notes-hub-backend.onrender.com/api/notes"
        );

        setAllNotes(allRes.data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchData();

  }, [id]);


  if (!note) {
    return <p className="text-zinc-400">Loading...</p>;
  }


  // -------- LESSON NAVIGATION --------

  const topicNotes = allNotes
    .filter(n => n.topic === note.topic)
    .sort((a,b)=>a.order-b.order);

  const currentIndex = topicNotes.findIndex(n => n._id === note._id);

  const prevNote = topicNotes[currentIndex - 1];
  const nextNote = topicNotes[currentIndex + 1];


  const showCopyToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 1800);
  };

  const copyText = async (value, successMessage) => {
    try {
      await navigator.clipboard.writeText(value);
      showCopyToast(successMessage);
    } catch (error) {
      console.error(error);
      showCopyToast("Copy failed");
    }
  };

  const copyPayload = () => {
    copyText(note.payload, "Payload copied");
  };

  const renderMarkdown = (content) => (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks]}
      components={{
        code({ inline, className, children, ...props }) {
          const languageMatch = /language-(\w+)/.exec(className || "");
          const codeText = String(children).replace(/\n$/, "");

          if (inline || !languageMatch) {
            return (
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-emerald-300" {...props}>
                {children}
              </code>
            );
          }

          return (
            <div className="mb-5 overflow-hidden rounded-xl border border-zinc-800 bg-black/70">
              <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-xs">
                <span className="font-mono uppercase tracking-wide text-zinc-400">
                  {languageMatch[1]}
                </span>
                <button
                  type="button"
                  onClick={() => copyText(codeText, "Code copied")}
                  className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-zinc-300 transition hover:border-emerald-600 hover:text-emerald-300"
                >
                  Copy code
                </button>
              </div>
              <SyntaxHighlighter
                language={languageMatch[1]}
                style={oneDark}
                customStyle={{ ...codeBlockStyle, marginBottom: 0 }}
              >
                {codeText}
              </SyntaxHighlighter>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );


  return (

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {toastMessage ? (
        <div className="fixed right-4 top-20 z-50 rounded-lg border border-emerald-700/70 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200 shadow-lg backdrop-blur">
          {toastMessage}
        </div>
      ) : null}

      {/* MAIN CONTENT */}
      <div className="lg:col-span-3">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          {renderMarkdown(note.title)}
        </h1>


        {/* SUMMARY */}
        <div className="text-zinc-400 mb-6">
          {renderMarkdown(note.summary)}
        </div>


        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags?.map((tag,index)=>(
            <span
              key={index}
              className="text-xs bg-zinc-800 px-2 py-1 rounded text-green-400"
            >
              {tag}
            </span>
          ))}
        </div>


        {/* META */}
        <div className="mb-6 text-sm text-zinc-500 flex gap-4">
          <span>Category: {note.category}</span>
          <span>Topic: {note.topic}</span>
          <span>Difficulty: {note.difficulty}</span>
        </div>



        {/* CONCEPT */}
        {note.concept && (
          <>
            <h2 id="concept" className="text-xl font-semibold text-green-400 mb-2">
              Concept
            </h2>

            <div className="text-zinc-400 mb-6">
              {renderMarkdown(note.concept)}
            </div>
          </>
        )}



        {/* PAYLOAD */}
        {note.payload && (
          <>
            <div className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <h2 id="payload" className="text-xl font-semibold text-green-400">
                  Quick Payload Box
                </h2>

                <button
                  type="button"
                  onClick={copyPayload}
                  className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-200 transition hover:border-emerald-600 hover:text-emerald-300"
                >
                  Copy Payload
                </button>
              </div>
              <p className="text-xs text-zinc-400">
                Click to copy the payload instantly.
              </p>
            </div>

            <SyntaxHighlighter
              language="bash"
              style={oneDark}
              customStyle={codeBlockStyle}
            >
              {note.payload}
            </SyntaxHighlighter>

          </>
        )}



        {/* EXPLANATION */}
        {note.explanation && (
          <>
            <h2 id="explanation" className="text-xl font-semibold text-green-400 mb-2">
              Explanation
            </h2>

            <div className="text-zinc-400 mb-6">
              {renderMarkdown(note.explanation)}
            </div>
          </>
        )}



        {/* MITIGATION */}
        {note.mitigation && (
          <>
            <h2 id="mitigation" className="text-xl font-semibold text-green-400 mb-2">
              Mitigation
            </h2>

            <div className="text-zinc-400 mb-6">
              {renderMarkdown(note.mitigation)}
            </div>
          </>
        )}



        {/* REFERENCES */}
        {note.references && (
          <>
            <h2 id="references" className="text-xl font-semibold text-green-400 mb-2">
              References
            </h2>

            <div className="text-zinc-400 mb-6">
              {renderMarkdown(note.references)}
            </div>
          </>
        )}



        {/* PREVIOUS / NEXT NAVIGATION */}

        <div className="flex justify-between mt-12 border-t border-zinc-800 pt-6">

          {prevNote ? (
            <Link
              to={`/notes/${prevNote._id}`}
              className="text-green-400 hover:text-green-300"
            >
              ← Previous Lesson
              <p className="text-sm text-zinc-400">{prevNote.title}</p>
            </Link>
          ) : <div></div>}


          {nextNote && (
            <Link
              to={`/notes/${nextNote._id}`}
              className="text-right text-green-400 hover:text-green-300"
            >
              Next Lesson →
              <p className="text-sm text-zinc-400">{nextNote.title}</p>
            </Link>
          )}

        </div>

      </div>



      {/* SIDEBAR */}
      <div className="hidden lg:block">

        <div className="sticky top-24 space-y-6">


          {/* TOPIC LESSONS */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

            <h3 className="text-green-400 font-semibold mb-3">
              {note.topic} Lessons
            </h3>

            <nav className="flex flex-col gap-2 text-sm text-zinc-400">

              {topicNotes.map((lesson)=>(
                <Link
                  key={lesson._id}
                  to={`/notes/${lesson._id}`}
                  className={`hover:text-green-400 ${
                    lesson._id === note._id
                    ? "text-green-400 font-semibold"
                    : ""
                  }`}
                >
                  {lesson.order}. {lesson.title}
                </Link>
              ))}

            </nav>

          </div>



          {/* PAGE SECTIONS */}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

            <h3 className="text-green-400 font-semibold mb-3">
              Page Sections
            </h3>

            <nav className="flex flex-col gap-2 text-sm text-zinc-400">

              {note.concept && (
                <a href="#concept" className="hover:text-green-400">Concept</a>
              )}

              {note.payload && (
                <a href="#payload" className="hover:text-green-400">Payload</a>
              )}

              {note.explanation && (
                <a href="#explanation" className="hover:text-green-400">Explanation</a>
              )}

              {note.mitigation && (
                <a href="#mitigation" className="hover:text-green-400">Mitigation</a>
              )}

              {note.references && (
                <a href="#references" className="hover:text-green-400">References</a>
              )}

            </nav>

          </div>

        </div>

      </div>

    </div>
  );

}

export default NoteDetails;