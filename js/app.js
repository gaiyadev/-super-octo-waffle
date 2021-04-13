const courseTable = document.getElementById("course-table");
const url = "https://note-expressjs-api.herokuapp.com/api/note/";

//Add table headers
courseTable.innerHTML = `<tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>`;

const allNote = () => {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const data = json.notes;
      data.forEach((note) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${note._id}</td>
                     <td>${note.title}</td>
                     <td>${note.body}</td>
                     <td> <button onclick="deleteNote('${note._id}')" type="button">Del</button> </td>
                    <td> <button onclick="viewNote('${note._id}')" type="button">View</button> </td>
                     `;
        courseTable.appendChild(tr);
      });
    })
    .catch((err) => console.log(err));
};

allNote();

const addNote = (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  const bodyData = {
    title,
    body,
  };

  fetch(`${url}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(">>>", json);
      const error = json.error;
      const success = json.message;
      if (error) {
        return alert(error);
      } else {
        alert(success);
      }
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE
const deleteNote = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((json) => {
      const error = json.error;
      const success = json.message;
      if (error) {
        alert(error);
      } else {
        alert(success);
      }

      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewNote = (id) => {
  window.location.href = `view.html?arg=${id}`;
  //console.log(queryString);
};

// by id
const getNoteById = () => {
  const id = document.getElementById("id").value;
  console.log(">>>", id);

  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => console.log(err));
};

// update
const updateNote = (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  // const title = document.getElementById("title").value;
  // const body = document.getElementById("body").value;
  return console.log("id>>", id);
  const bodyData = {
    title,
    body,
  };

  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(">>>", json);
      const error = json.error;
      const success = json.message;
      if (error) {
        return alert(error);
      } else {
        alert(success);
      }
      // location.reload();
    })
    .catch((err) => {
      alert(err);
      console.log(err);
    });
};
