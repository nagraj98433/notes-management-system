import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/noteService";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [recentlyUpdatedId, setRecentlyUpdatedId] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const res = await getNotes();

      setNotes(res.data);
    } catch (error) {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.dismiss();
      toast.error("Please enter both title and content", {
        id: "required-fields",
      });
      return;
    }

    try {
      if (editingId) {
        await updateNote(editingId, {
          title,
          content,
        });

        setRecentlyUpdatedId(editingId);

        setTimeout(() => {
          setRecentlyUpdatedId(null);
        }, 3000);

        toast.success(`✏️ "${title}" updated`);
      } else {
        await createNote({
          title,
          content,
        });

        toast.success(`📝 "${title}" created`);
      }

      setTitle("");
      setContent("");
      setEditingId(null);

      fetchNotes();

      document.getElementById("my-notes")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");

    toast("Editing cancelled", {
      icon: "❌",
    });
  };

  const handleDelete = async (id) => {
    const noteToDelete = notes.find((note) => note._id === id);

    const result = await Swal.fire({
      title: "Delete Note?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteNote(id);

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success(`🗑️ "${noteToDelete?.title}" deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete "${noteToDelete?.title}"`);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <NoteForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleSubmit={handleSubmit}
          editingId={editingId}
          handleCancelEdit={handleCancelEdit}
        />

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between w-full md:w-auto">
                <h2 id="my-notes" className="text-2xl font-bold text-gray-800">
                  My Notes
                </h2>

                <span className="text-gray-500 font-medium md:hidden">
                  {filteredNotes.length} Notes
                </span>
              </div>

              <div className="w-full md:w-80">
                <SearchBar search={search} setSearch={setSearch} />
              </div>

              <span className="hidden md:block text-gray-500 font-medium">
                {filteredNotes.length} Notes
              </span>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-md p-12 text-center">
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No Notes Found
                </h3>

                <p className="text-gray-500">Create your first note.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    setSelectedNote={setSelectedNote}
                    recentlyUpdatedId={recentlyUpdatedId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {selectedNote && (
        <div
          className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      p-4
      z-50
    "
        >
          <div
            className="
        bg-white
        rounded-3xl
        max-w-2xl
        w-full
        max-h-[80vh]
        overflow-y-auto
        shadow-2xl
      "
          >
            {/* Sticky Header */}
            <div
              className="
          sticky
          top-0
          bg-white
          z-10
          flex
          justify-between
          items-center
          p-5
          border-b
          shadow-sm
        "
            >
              <h2
                className="
            text-lg
            md:text-2xl
            font-bold
            wrap-break-word
            pr-4
          "
              >
                {selectedNote.title}
              </h2>

              <button
                onClick={() => setSelectedNote(null)}
                className="
            text-gray-500
            hover:text-black
            text-2xl
            font-bold
            cursor-pointer
            transition
          "
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div
                className="
            whitespace-pre-wrap
            wrap-break-word
            text-gray-700
            leading-7
          "
              >
                {selectedNote.content}
              </div>

              <div className="mt-6 pt-4 border-t text-sm text-gray-500">
                Last Updated:{" "}
                {new Date(selectedNote.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
