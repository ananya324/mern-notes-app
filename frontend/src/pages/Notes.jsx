import { useEffect, useState } from "react";
import API from "../api/axios";
import CreateNote from "./CreateNote";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../context/AuthContext";

function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addNoteToState = (note) => {
    setNotes([note, ...notes]);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await API.get("/notes");
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    setNotes(notes.filter((note) => note._id !== id));
  };

  const handleUpdate = async (id) => {
    await API.put(`/notes/${id}`, { title, content });

    setNotes(
      notes.map((note) =>
        note._id === id ? { ...note, title, content } : note
      )
    );

    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Hello, {user?.name} ✨
        </h1>
        <LogoutButton />
      </div>

      {/* Create Note */}
      <CreateNote onNoteCreated={addNoteToState} />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {notes.map((note) => (
          <div
            key={note._id}
            className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl shadow-lg p-5 transition hover:scale-[1.02]"
          >
            {editingId === note._id ? (
              <>
                <input
                  className="w-full border border-purple-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  className="w-full border border-purple-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <button
                  onClick={() => handleUpdate(note._id)}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
                >
                  💾 Save
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold text-xl text-gray-800">
                  {note.title}
                </h3>

                <p className="text-gray-700 mt-2 line-clamp-4">
                  {note.content}
                </p>

                <div className="flex gap-4 mt-5">
                  <button
                    onClick={() => {
                      setEditingId(note._id);
                      setTitle(note.title);
                      setContent(note.content);
                    }}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-rose-600 font-medium hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
