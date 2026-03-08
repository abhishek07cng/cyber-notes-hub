import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    difficulty: "Beginner",
    order: 0,
    tags: [],
    concept: "",
    payload: "",
    explanation: "",
    mitigation: "",
    references: "",
  });

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

        setNotes(res.data);
      } catch (error) {
        navigate("/admin/login");
      }
    };

    checkAuthAndFetchNotes();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("https://cyber-notes-hub-backend.onrender.com/api/admin/logout",
        {},
        { withCredentials: true }
      );
      navigate("/admin/login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cyber-notes-hub-backend.onrender.com/api/notes/${id}`,
        { withCredentials: true }
      );
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  const startEdit = (note) => {
    setShowForm(true);
    setEditNoteId(note._id);

    setFormData({
      title: note.title,
      summary: note.summary,
      category: note.category,
      difficulty: note.difficulty,
      order: note.order || 0,
      tags: note.tags || [],
      concept: note.concept || "",
      payload: note.payload || "",
      explanation: note.explanation || "",
      mitigation: note.mitigation || "",
      references: note.references || "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (editNoteId) {
        const res = await axios.put(
          `https://cyber-notes-hub-backend.onrender.com/api/notes/${editNoteId}`,
          formData,
          { withCredentials: true }
        );

        setNotes(
          notes.map((note) =>
            note._id === editNoteId ? res.data : note
          )
        );

        setEditNoteId(null);
      } else {
        const res = await axios.post(
          "https://cyber-notes-hub-backend.onrender.com/api/notes",
          formData,
          { withCredentials: true }
        );

        setNotes([...notes, res.data].sort((a,b)=>a.order-b.order));
      }

      setShowForm(false);

      setFormData({
        title: "",
        summary: "",
        category: "",
        difficulty: "Beginner",
        order: 0,
        tags: [],
        concept: "",
        payload: "",
        explanation: "",
        mitigation: "",
        references: "",
      });

    } catch (error) {
      alert("Save failed");
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-400">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded"
      >
        {showForm ? "Cancel" : "Create New Note"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSave}
          className="mb-8 bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="bg-zinc-800 p-3 rounded"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Learning Order"
            className="bg-zinc-800 p-3 rounded"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Summary"
            className="bg-zinc-800 p-3 rounded"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="bg-zinc-800 p-3 rounded"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="bg-zinc-800 p-3 rounded"
            value={formData.tags}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(",").map(tag => tag.trim())
              })
            }
          />

          <select
            className="bg-zinc-800 p-3 rounded"
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <textarea
            placeholder="Concept"
            className="bg-zinc-800 p-3 rounded h-24"
            value={formData.concept}
            onChange={(e) =>
              setFormData({ ...formData, concept: e.target.value })
            }
          />

          <textarea
            placeholder="Payload"
            className="bg-zinc-800 p-3 rounded h-24"
            value={formData.payload}
            onChange={(e) =>
              setFormData({ ...formData, payload: e.target.value })
            }
          />

          <textarea
            placeholder="Explanation"
            className="bg-zinc-800 p-3 rounded h-24"
            value={formData.explanation}
            onChange={(e) =>
              setFormData({ ...formData, explanation: e.target.value })
            }
          />

          <textarea
            placeholder="Mitigation"
            className="bg-zinc-800 p-3 rounded h-24"
            value={formData.mitigation}
            onChange={(e) =>
              setFormData({ ...formData, mitigation: e.target.value })
            }
          />

          <textarea
            placeholder="References"
            className="bg-zinc-800 p-3 rounded h-24"
            value={formData.references}
            onChange={(e) =>
              setFormData({ ...formData, references: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black font-semibold p-3 rounded"
          >
            {editNoteId ? "Update Note" : "Save Note"}
          </button>
        </form>
      )}

      <input
        type="text"
        placeholder="Search notes..."
        className="mb-6 w-full bg-zinc-800 p-3 rounded text-white outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-800">
          <thead className="bg-zinc-900">
            <tr className="text-left text-sm text-zinc-400">
              <th className="p-3">Order</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Difficulty</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredNotes.map((note) => (
              <tr
                key={note._id}
                className="border-t border-zinc-800 hover:bg-zinc-900"
              >
                <td className="p-3">{note.order ?? 0}</td>
                <td className="p-3">{note.title}</td>
                <td className="p-3">{note.category}</td>
                <td className="p-3">{note.difficulty}</td>
                <td className="p-3">
                  {new Date(note.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => startEdit(note)}
                    className="text-yellow-400 hover:text-yellow-600 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;