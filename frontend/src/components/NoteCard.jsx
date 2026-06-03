import { FaEdit, FaTrash } from "react-icons/fa";

const colors = [
  "bg-amber-50",
  "bg-sky-50",
  "bg-emerald-50",
  "bg-rose-50",
  "bg-violet-50",
];

function NoteCard({
  note,
  handleEdit,
  handleDelete,
  setSelectedNote,
  recentlyUpdatedId,
}) {
  const color = colors[note.title.length % colors.length];

  const isUpdated = recentlyUpdatedId === note._id;

  return (
    <div
      className={`
        ${color}
  ${isUpdated ? "ring-4 ring-yellow-400" : ""}
        rounded-3xl
        p-5
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        h-80
        flex
        flex-col
      `}
    >
      <>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-xl font-bold wrap-break-word">{note.title}</h3>

          {note.createdAt !== note.updatedAt && (
            <span
              className="
      text-blue-600
      text-xs
      font-medium
      whitespace-nowrap
    "
            >
              ✏️ Edited
            </span>
          )}
        </div>
      </>

      <p className="text-gray-700 line-clamp-6 wrap-break-word">
        {note.content}
      </p>

      {note.content.length > 180 && (
        <button
          type="button"
          onClick={() => setSelectedNote(note)}
          className="
text-blue-600
text-sm
font-medium
mt-2
text-left
cursor-pointer
hover:text-blue-800
transition
"
        >
          Read More
        </button>
      )}

      <div className="mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4">
          <span>
            {note.createdAt === note.updatedAt
              ? `Created: ${new Date(note.createdAt).toLocaleString()}`
              : `Last Updated: ${new Date(note.updatedAt).toLocaleString()}`}
          </span>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleEdit(note)}
              className="
                p-2.5
                rounded-full
                bg-blue-100
                text-blue-600
                hover:bg-blue-200
                cursor-pointer
                transition
              "
            >
              <FaEdit size={16} />
            </button>

            <button
              type="button"
              onClick={() => handleDelete(note._id)}
              className="
                p-2.5
                rounded-full
                bg-red-100
                text-red-500
                hover:bg-red-200
                cursor-pointer
                transition
              "
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
