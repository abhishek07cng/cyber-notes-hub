import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NAV_CATEGORIES } from "../data/navigation";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const initialFormData = {
  title: "",
  summary: "",
  category: "",
  topic: "",
  difficulty: "Beginner",
  order: 0,
  tags: [],
  concept: "",
  payload: "",
  explanation: "",
  mitigation: "",
  references: "",
};

function AdminDashboard() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteNote, setConfirmDeleteNote] = useState(null);

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {

    const checkAuthAndFetchNotes = async () => {

      try {

        const auth = await axios.get(
          "https://cyber-notes-hub-backend.onrender.com/api/admin/me",
          { withCredentials: true }
        );

        if (!auth.data) {
          navigate("/admin/login");
          return;
        }

        const res = await axios.get(
          "https://cyber-notes-hub-backend.onrender.com/api/notes"
        );

        setNotes(res.data.sort((a, b) => a.order - b.order));

      } catch (error) {
        navigate("/admin/login");
      }

    };

    checkAuthAndFetchNotes();

  }, [navigate]);

  const handleLogout = async () => {

    try {

      await axios.post(
        "https://cyber-notes-hub-backend.onrender.com/api/admin/logout",
        {},
        { withCredentials: true }
      );

      navigate("/admin/login");

    } catch (error) {
      setToast({ message: "Logout failed", type: "error" });
    }

  };

  const handleDelete = async (id) => {

    try {
      setDeletingId(id);

      await axios.delete(
        `https://cyber-notes-hub-backend.onrender.com/api/notes/${id}`,
        { withCredentials: true }
      );

      const remainingNotes = notes.filter((note) => note._id !== id);
      const sortedRemaining = [...remainingNotes].sort(
        (a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)
      );
      const normalizedNotes = sortedRemaining.map((note, index) => ({
        ...note,
        order: index + 1,
      }));

      const updatedNotes = await Promise.all(
        normalizedNotes.map((note) =>
          axios
            .put(
              `https://cyber-notes-hub-backend.onrender.com/api/notes/${note._id}`,
              { ...note, order: note.order },
              { withCredentials: true }
            )
            .then((res) => res.data)
        )
      );

      setNotes(updatedNotes.sort((a, b) => a.order - b.order));
      setToast({ message: "Note deleted and order normalized", type: "success" });

    } catch (error) {
      setToast({ message: "Delete failed", type: "error" });
    } finally {
      setDeletingId(null);
      setConfirmDeleteNote(null);
    }

  };

  const startEdit = (note) => {

    setShowForm(true);
    setEditNoteId(note._id);

    setFormData({
      title: note.title,
      summary: note.summary,
      category: note.category,
      topic: note.topic || "",
      difficulty: note.difficulty,
      order: note.order || 0,
      tags: note.tags || [],
      concept: note.concept || "",
      payload: note.payload || "",
      explanation: note.explanation || "",
      mitigation: note.mitigation || "",
      references: note.references || "",
    });
    setValidationErrors({});
    setTagInput("");

  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required.";
    if (!formData.summary.trim()) errors.summary = "Summary is required.";
    if (!formData.category.trim()) errors.category = "Category is required.";
    if (!formData.topic.trim()) errors.topic = "Topic is required.";
    return errors;
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2200);
  };

  const addTagFromInput = () => {
    const tag = tagInput.trim();
    if (!tag) return;
    if (formData.tags.includes(tag)) {
      setTagInput("");
      return;
    }
    setFormData({ ...formData, tags: [...formData.tags, tag] });
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSave = async (e) => {

    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    try {
      setIsSaving(true);

      if (editNoteId) {

        const res = await axios.put(
          `https://cyber-notes-hub-backend.onrender.com/api/notes/${editNoteId}`,
          formData,
          { withCredentials: true }
        );

        setNotes(
          notes
            .map((note) =>
              note._id === editNoteId ? res.data : note
            )
            .sort((a, b) => a.order - b.order)
        );

        setEditNoteId(null);

      } else {

        const res = await axios.post(
          "https://cyber-notes-hub-backend.onrender.com/api/notes",
          formData,
          { withCredentials: true }
        );

        setNotes([...notes, res.data].sort((a, b) => a.order - b.order));

      }

      setShowForm(false);
      setFormData(initialFormData);
      setTagInput("");
      showToast(editNoteId ? "Note updated successfully" : "Note created successfully");

    } catch (error) {
      showToast("Save failed", "error");
    } finally {
      setIsSaving(false);
    }

  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );
  const nextOrder =
    notes.reduce((max, note) => Math.max(max, Number(note.order) || 0), 0) + 1;
  const topicSuggestions = [...new Set(notes.map((note) => note.topic).filter(Boolean))];
  const fieldBaseClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30";
  const sectionTitleClass = "mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-400";
  const cardSectionClass = "mb-5 rounded-xl border border-zinc-800/90 bg-zinc-900/50 p-4 shadow-[0_10px_30px_-24px_rgba(16,185,129,0.6)]";
  const btnPrimaryClass =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 font-semibold text-black transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60";
  const btnSecondaryClass =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 transition hover:border-emerald-600 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60";
  const btnDangerClass =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-rose-700/60 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-500/30 disabled:cursor-not-allowed disabled:opacity-60";
  const difficultyBadgeClass = (difficulty) => {
    if (difficulty === "Beginner") {
      return "border border-emerald-700/60 bg-emerald-500/15 text-emerald-300";
    }
    if (difficulty === "Intermediate") {
      return "border border-amber-700/60 bg-amber-500/15 text-amber-300";
    }
    return "border border-rose-700/60 bg-rose-500/15 text-rose-300";
  };
  const previewMarkdown = [
    formData.summary ? `## Summary\n${formData.summary}` : "",
    formData.concept ? `## Concept\n${formData.concept}` : "",
    formData.payload ? `## Payload\n\`\`\`bash\n${formData.payload}\n\`\`\`` : "",
    formData.explanation ? `## Explanation\n${formData.explanation}` : "",
    formData.mitigation ? `## Mitigation\n${formData.mitigation}` : "",
    formData.references ? `## References\n${formData.references}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return (

    <div className="space-y-6">
      {toast.message ? (
        <div
          className={`fixed right-5 top-20 z-50 rounded-lg border px-3 py-2 text-sm shadow-lg backdrop-blur ${
            toast.type === "error"
              ? "border-rose-700/70 bg-rose-500/15 text-rose-200"
              : "border-emerald-700/70 bg-emerald-500/15 text-emerald-200"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold text-green-400">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className={btnDangerClass}
        >
          Logout
        </button>

      </div>

      <button
        onClick={() => {
          if (showForm) {
            setShowForm(false);
            setEditNoteId(null);
            setFormData(initialFormData);
            setTagInput("");
            setValidationErrors({});
            return;
          }

          setShowForm(true);
          setEditNoteId(null);
          setFormData({ ...initialFormData, order: nextOrder });
          setTagInput("");
          setValidationErrors({});
        }}
        className={btnPrimaryClass}
      >
        {showForm ? "Cancel" : "Create New Note"}
      </button>

      {showForm && (

        <form
          onSubmit={handleSave}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-[0_20px_45px_-40px_rgba(16,185,129,0.8)]"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
          <section className={cardSectionClass}>
            <h3 className={sectionTitleClass}>Basic Info</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Title"
                  className={fieldBaseClass}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                {validationErrors.title ? (
                  <p className="mt-1 text-xs text-rose-400">{validationErrors.title}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Learning Order"
                  className={fieldBaseClass}
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                />
                {!editNoteId ? (
                  <p className="mt-1 text-xs text-emerald-400">
                    Auto-generated: {nextOrder}
                  </p>
                ) : null}
              </div>

              <div>
                <select
                  className={fieldBaseClass}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {NAV_CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.apiCategory}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {validationErrors.category ? (
                  <p className="mt-1 text-xs text-rose-400">{validationErrors.category}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Topic (example: SQL Injection)"
                  className={fieldBaseClass}
                  value={formData.topic}
                  list="topic-suggestions"
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  required
                />
                <datalist id="topic-suggestions">
                  {topicSuggestions.map((topic) => (
                    <option key={topic} value={topic} />
                  ))}
                </datalist>
                {validationErrors.topic ? (
                  <p className="mt-1 text-xs text-rose-400">{validationErrors.topic}</p>
                ) : null}
              </div>

              <div>
                <select
                  className={fieldBaseClass}
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </section>

          <section className={cardSectionClass}>
            <h3 className={sectionTitleClass}>Content</h3>
            <div className="space-y-4">
              <div>
                <textarea
                  placeholder="Summary"
                  className={`${fieldBaseClass} min-h-[88px]`}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  required
                />
                {validationErrors.summary ? (
                  <p className="mt-1 text-xs text-rose-400">{validationErrors.summary}</p>
                ) : null}
              </div>

              <textarea
                placeholder="Concept"
                className={`${fieldBaseClass} min-h-[100px]`}
                value={formData.concept}
                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
              />

              <textarea
                placeholder="Explanation"
                className={`${fieldBaseClass} min-h-[100px]`}
                value={formData.explanation}
                onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              />
            </div>
          </section>

          <section className={cardSectionClass}>
            <h3 className={sectionTitleClass}>Payload</h3>
            <div className="rounded-xl border border-emerald-900/60 bg-black/40 p-3">
              <div className="mb-2 text-xs uppercase tracking-wide text-emerald-400">Code Payload</div>
              <textarea
                placeholder="Payload"
                className="min-h-[120px] w-full rounded-lg border border-zinc-800 bg-black px-3 py-2.5 font-mono text-sm text-emerald-300 outline-none transition focus:border-emerald-500"
                value={formData.payload}
                onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
              />
            </div>
          </section>

          <section className={cardSectionClass}>
            <h3 className={sectionTitleClass}>Mitigation</h3>
            <textarea
              placeholder="Mitigation"
              className={`${fieldBaseClass} min-h-[100px]`}
              value={formData.mitigation}
              onChange={(e) => setFormData({ ...formData, mitigation: e.target.value })}
            />
          </section>

          <section className={cardSectionClass}>
            <h3 className={sectionTitleClass}>References</h3>
            <textarea
              placeholder="References"
              className={`${fieldBaseClass} min-h-[100px]`}
              value={formData.references}
              onChange={(e) => setFormData({ ...formData, references: e.target.value })}
            />
          </section>

          <section className={cardSectionClass}>
            <h3 className={sectionTitleClass}>Tags</h3>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-700/60 bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-emerald-200 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tag and press Enter"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-emerald-500"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTagFromInput();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTagFromInput}
                  className={btnSecondaryClass}
                >
                  Add
                </button>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSaving}
            className={`${btnPrimaryClass} w-full`}
          >
            {isSaving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/60 border-t-transparent" />
                Saving...
              </>
            ) : editNoteId ? "Update Note" : "Save Note"}
          </button>
            </div>

            <aside className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 lg:sticky lg:top-24 lg:max-h-[70vh] lg:overflow-y-auto">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-400">
                Live Markdown Preview
              </h3>
              {previewMarkdown ? (
                <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
                  <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                    {previewMarkdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm text-zinc-500">
                  Start typing in the form to preview markdown here.
                </p>
              )}
            </aside>
          </div>

        </form>

      )}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="max-h-[520px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-[0_18px_40px_-36px_rgba(16,185,129,0.8)]">

        <table className="w-full border-collapse">

          <thead className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur">
            <tr className="text-left text-xs uppercase tracking-wide text-zinc-400">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Topic</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredNotes.map((note) => (
              <tr key={note._id} className="border-t border-zinc-800 text-sm transition-colors hover:bg-zinc-800/40">

                <td className="px-4 py-3 text-zinc-300">{note.order ?? 0}</td>
                <td className="px-4 py-3 font-medium text-zinc-100">{note.title}</td>
                <td className="px-4 py-3 text-zinc-300">{note.topic}</td>
                <td className="px-4 py-3 text-zinc-300">{note.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${difficultyBadgeClass(note.difficulty)}`}>
                    {note.difficulty}
                  </span>
                </td>

                <td className="px-4 py-3 text-zinc-400">
                  {new Date(note.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">

                  <button
                    onClick={() => startEdit(note)}
                    className={btnSecondaryClass}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === note._id}
                    onClick={() => setConfirmDeleteNote(note)}
                    className={btnDangerClass}
                  >
                    {deletingId === note._id ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rose-300/70 border-t-transparent" />
                        Deleting...
                      </>
                    ) : "Delete"}
                  </button>
                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {confirmDeleteNote ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-5 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold text-zinc-100">Confirm deletion</h3>
            <p className="mb-5 text-sm text-zinc-400">
              Delete <span className="font-medium text-zinc-200">{confirmDeleteNote.title}</span>? This action will also re-normalize note order.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteNote(null)}
                className={btnSecondaryClass}
                disabled={!!deletingId}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteNote._id)}
                className={btnDangerClass}
                disabled={!!deletingId}
              >
                {deletingId ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rose-300/70 border-t-transparent" />
                    Deleting...
                  </>
                ) : "Delete Note"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

    </div>

  );

}

export default AdminDashboard;