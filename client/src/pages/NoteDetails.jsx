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

const COMPLETED_NOTES_KEY = "cnh_completed_note_ids";

const toSlug = (value = "") => value.toLowerCase().replace(/\s+/g, "-");

function NoteDetails() {

  const { id } = useParams();

  const [note, setNote] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [completedNoteIds, setCompletedNoteIds] = useState([]);
  const [isPayloadCopied, setIsPayloadCopied] = useState(false);

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

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_NOTES_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setCompletedNoteIds(parsed);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_NOTES_KEY, JSON.stringify(completedNoteIds));
    } catch (error) {
      console.error(error);
    }
  }, [completedNoteIds]);


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
  const topicCompletedCount = topicNotes.filter((n) => completedNoteIds.includes(n._id)).length;
  const topicProgressPercent = topicNotes.length
    ? Math.round((topicCompletedCount / topicNotes.length) * 100)
    : 0;
  const isCompleted = completedNoteIds.includes(note._id);


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
    setIsPayloadCopied(true);
    setTimeout(() => setIsPayloadCopied(false), 900);
  };

  const toggleCompleted = () => {
    setCompletedNoteIds((prev) => {
      if (prev.includes(note._id)) {
        showCopyToast("Marked as incomplete");
        return prev.filter((idValue) => idValue !== note._id);
      }
      showCopyToast("Marked as completed");
      return [...prev, note._id];
    });
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
        <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <Link to="/" className="transition hover:text-emerald-300">Dashboard</Link>
          <span>/</span>
          <Link to={`/category/${toSlug(note.category)}`} className="transition hover:text-emerald-300">
            {note.category}
          </Link>
          <span>/</span>
          <Link to={`/topic/${toSlug(note.topic)}`} className="transition hover:text-emerald-300">
            {note.topic}
          </Link>
          <span>/</span>
          <span className="text-emerald-300">{note.title}</span>
        </nav>

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

        <div className="mb-7 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
            <span>Topic progress</span>
            <span>{topicCompletedCount}/{topicNotes.length} completed</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-800">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${topicProgressPercent}%` }}
            />
          </div>
          <div className="mt-3">
            <button
              type="button"
              onClick={toggleCompleted}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                isCompleted
                  ? "border-emerald-700/70 bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25"
                  : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-emerald-600 hover:text-emerald-300"
              }`}
            >
              {isCompleted ? "Completed" : "Mark as Completed"}
            </button>
          </div>
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
                  Exploit Payload
                </h2>

                <button
                  type="button"
                  onClick={copyPayload}
                  className={`rounded-md border bg-zinc-900 px-3 py-1 text-xs font-medium transition ${
                    isPayloadCopied
                      ? "scale-105 border-emerald-600 text-emerald-300 shadow-[0_0_16px_-6px_rgba(16,185,129,0.8)]"
                      : "border-zinc-700 text-zinc-200 hover:border-emerald-600 hover:text-emerald-300"
                  }`}
                >
                  {isPayloadCopied ? "Copied!" : "Copy Payload"}
                </button>
              </div>
              <p className="text-xs text-zinc-400">
                One-click copy for rapid lab execution.
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

        <div className="mt-12 grid grid-cols-1 gap-3 border-t border-zinc-800 pt-6 sm:grid-cols-2">

          {prevNote ? (
            <Link
              to={`/notes/${prevNote._id}`}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-green-400 transition hover:border-emerald-700/60 hover:text-green-300"
            >
              ← Previous Lesson
              <p className="text-sm text-zinc-400">{prevNote.title}</p>
            </Link>
          ) : <div className="hidden sm:block" />}


          {nextNote && (
            <Link
              to={`/notes/${nextNote._id}`}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-right text-green-400 transition hover:border-emerald-700/60 hover:text-green-300"
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
                  className={`flex items-center justify-between rounded-md px-2 py-1.5 transition ${
                    lesson._id === note._id
                    ? "bg-emerald-500/10 text-green-300 font-semibold"
                    : "hover:bg-zinc-800/70 hover:text-green-400"
                  }`}
                >
                  <span>{lesson.order}. {lesson.title}</span>
                  {completedNoteIds.includes(lesson._id) ? (
                    <span className="ml-2 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  ) : null}
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