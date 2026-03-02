import { useParams } from "react-router-dom";

function NoteDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Research Note Details
      </h1>
      <p className="text-zinc-400">
        Showing note with ID: {id}
      </p>
    </div>
  );
}

export default NoteDetails;