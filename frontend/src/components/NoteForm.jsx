function NoteForm({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  editingId,
  handleCancelEdit,
}) {
  return (
    <div
      className="
  bg-white
  rounded-3xl
  shadow-xl
  border
  border-gray-200
  p-6
  mb-10
"
    >
      <h2 className="text-2xl font-bold mb-5">
        {editingId ? " ✏️ Edit Note" : "✨ Create New Note"}
      </h2>

      <input
        type="text"
        placeholder="📝 Enter note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
w-full
border
border-gray-300
rounded-xl
p-4
mb-4
outline-none
placeholder:text-gray-500
placeholder:font-medium
focus:ring-2
focus:ring-blue-500
"
      />

      <textarea
        rows="5"
        placeholder="✍️ Write your thoughts here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="
w-full
border
border-gray-300
rounded-xl
p-4
mb-4
outline-none
placeholder:text-gray-500
placeholder:font-medium
focus:ring-2
focus:ring-blue-500
"
      />

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-6
      py-3
      rounded-xl
      transition
      cursor-pointer
    "
        >
          {editingId ? "Update Note" : "Create Note"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="
        bg-gray-200
        hover:bg-gray-300
        text-gray-800
        px-6
        py-3
        rounded-xl
        transition
        cursor-pointer
      "
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default NoteForm;
