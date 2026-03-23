import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/ui/EmptyState";
import { NoteCardSkeletonGrid } from "../components/ui/NoteCardSkeleton";
import { useNoteSearch } from "../context/NoteSearchContext";

function noteMatchesQuery(note, query) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  const searchableText = [
    note.title,
    note.summary,
    note.concept,
    note.explanation,
    note.payload,
    ...(note.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return searchableText.includes(normalized);
}

function CategoryPage() {
  const { category } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, debouncedSearchQuery } = useNoteSearch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("https://cyber-notes-hub-backend.onrender.com/api/notes");

        const filtered = res.data.filter(
          (note) =>
            note.category.toLowerCase().replace(/\s/g, "-") === category
        );

        setNotes(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [category]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        {category.replace("-", " ").toUpperCase()}
      </h1>

      {loading ? (
        <NoteCardSkeletonGrid />
      ) : notes.filter((note) => noteMatchesQuery(note, debouncedSearchQuery)).length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes
            .filter((note) => noteMatchesQuery(note, debouncedSearchQuery))
            .map((note) => (
            <NoteCard key={note._id} note={note} showTags={false} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            searchQuery
              ? `No results found for '${searchQuery}'`
              : "No notes available in this category"
          }
          description={
            searchQuery
              ? "Try another keyword or clear the global search field."
              : "New notes will appear here once this category has published entries."
          }
        />
      )}
    </div>
  );
}

export default CategoryPage;