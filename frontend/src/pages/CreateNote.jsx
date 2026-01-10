import API from "../api/axios";

function CreateNote() {
  const createNote = async () => {
    try {
      const res = await API.post("/notes", {
        title: "My first note",
        content: "I finally see something",
      });

      console.log("CREATED NOTE:", res.data);
      alert("Note created");
    } catch (err) {
      console.log(err);
      alert("Error creating note");
    }
  };

  return (
    <div>
      <h2>Create Note</h2>
      <button onClick={createNote}>Create Test Note</button>
    </div>
  );
}

export default CreateNote;
