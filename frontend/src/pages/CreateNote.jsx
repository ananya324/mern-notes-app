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

      onNoteCreated(res.data);
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
      className="bg-gradient-to-br from-white/80 to-purple-100/80 backdrop-blur-lg 
                 border border-white/50 rounded-2xl shadow-xl p-6 "
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        ✍️ Create a New Note
      </h2>

      <input
        type="text"
        placeholder="Note title "
        className="w-full mb-3 px-4 py-2 rounded-xl border border-purple-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your thoughts here 💭"
        rows="4"
        className="w-full mb-4 px-4 py-2 rounded-xl border border-purple-300 
                   focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 
                   text-white font-semibold py-2 rounded-xl shadow-md
                   hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "💾 Saving..." : "➕ Add Note"}
      </button>
    </form>
  );
}

export default CreateNote;
