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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Hello, {user?.name} 👋
        </h1>
        <LogoutButton />
      </div>

      {/* Create Note */}
      <CreateNote onNoteCreated={addNoteToState} />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white rounded-xl shadow p-4"
          >
            {editingId === note._id ? (
              <>
                <input
                  className="w-full border p-2 rounded mb-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full border p-2 rounded mb-2"
                  rows="4"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate(note._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <p className="text-gray-600 mt-2">{note.content}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditingId(note._id);
                      setTitle(note.title);
                      setContent(note.content);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="text-red-500"
                  >
                    Delete
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
