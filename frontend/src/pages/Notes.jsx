import { useEffect, useState } from "react";
import API from "../api/axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // FETCH NOTES
  useEffect(() => {
  const fetchNotes = async () => {
    const res = await API.get("/notes");
    console.log("NOTES FROM BACKEND:", res.data);
    setNotes(res.data);
  };
  fetchNotes();
}, []);


  // DELETE NOTE
  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  // UPDATE NOTE
  const handleUpdate = async (id) => {
    await API.put(`/notes/${id}`, { title, content });

    setNotes(notes.map(note =>
      note._id === id ? { ...note, title, content } : note
    ));

    setEditingId(null);
  };

  return (
    <div>
      <h2>Your Notes</h2>

      {notes.map(note => (
        <div key={note._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          {editingId === note._id ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={() => handleUpdate(note._id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => {
                setEditingId(note._id);
                setTitle(note.title);
                setContent(note.content);
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(note._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notes;
