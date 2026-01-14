import { useState } from "react";
import API from "../api/axios";

function CreateNote({ onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/notes", {
        title,
        content,
      });

      // add note instantly to UI
      onNoteCreated(res.data);

      // clear inputs
      setTitle("");
      setContent("");
    } catch (err) {
      alert("Error creating note");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={createNote}
      className="bg-white p-4 rounded-xl shadow mb-6"
    >
      <h2 className="text-lg font-semibold mb-2">Create a Note</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note here..."
        rows="4"
        className="w-full border p-2 rounded mb-3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Add Note"}
      </button>
    </form>
  );
}

export default CreateNote;

