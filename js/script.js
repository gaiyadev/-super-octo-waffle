notes = [];
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://note-expressjs-api.herokuapp.com/api/note/";

const allNote = () => {
  fetch("https://note-expressjs-api.herokuapp.com/api/note/")
    .then((response) => response.json())
    .then((json) => {
      const data = json.notes;
      localStorage.setItem("notes", JSON.stringify(data));
      notes.push(json.notes);
    })
    .catch((err) => console.log(err));
};

allNote();

const add = (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;

  const data = { title, body };

  fetch("https://note-expressjs-api.herokuapp.com/api/note/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
