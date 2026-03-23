import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function TagPage() {
  const { tag } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, debouncedSearchQuery } = useNoteSearch();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("https://cyber-notes-hub-backend.onrender.com/api/notes");

        const filtered = res.data.filter(note =>
          note.tags?.includes(tag)
        );

        setNotes(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [tag]);

  return (
    <div>

      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Notes tagged with: #{tag}
      </h1>

      {loading ? (
        <NoteCardSkeletonGrid />
      ) : notes.filter((note) => noteMatchesQuery(note, debouncedSearchQuery)).length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes
            .filter((note) => noteMatchesQuery(note, debouncedSearchQuery))
            .map((note) => (
            <NoteCard key={note._id} note={note} showDate={false} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={
            searchQuery
              ? `No results found for '${searchQuery}'`
              : `No notes found for #${tag}`
          }
          description={
            searchQuery
              ? "Try a different keyword or clear search to see tagged notes."
              : "Try another tag or explore the dashboard to discover related cybersecurity topics."
          }
        />
      )}

    </div>
  );
}

export default TagPage;