/* Import */
import "./style.css";

/* Read the local storage */
if (!localStorage.getItem("todos")) {
  localStorage.setItem(
    "todos",
    JSON.stringify(
      Array.from(document.querySelectorAll("li")).map((x) => [
        x.childNodes[0].textContent,
        x.classList.contains("checked"),
      ])
    )
  );
}

/* Add Eventlistener to Button */
document.querySelector(".add-btn").addEventListener("click", function () {
  createNewElement(document.getElementById("todo-input").value);
});

/* Build the todo list */
buildTodoList(Array.from(JSON.parse(localStorage.getItem("todos"))));


/** Add the items from local storage to the HTML DOM */
function buildTodoList(todos) {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";
  Array.from(todos).forEach((item, index) => {
    /* Now create the list items */
    const li = document.createElement("li");
    if (item[1]) {
      li.classList.add("checked");
    }
    const textNode = document.createTextNode(item[0]);
    li.appendChild(textNode);
    /* Append to list */
    document.getElementById("todo-list").appendChild(li);
  });

  /* Create Close button */
  const todoItems = document.querySelectorAll("li");
  todoItems.forEach((item, index) => {
    const closeSpan = document.createElement("span");
    const todoText = document.createTextNode("\u00D7");
    closeSpan.className = "close";
    closeSpan.appendChild(todoText);
    item.appendChild(closeSpan);
  });

  /* Remove the clicked item */
  const closeSpans = document.querySelectorAll(".close");
  closeSpans.forEach((item, index) => {
    item.onclick = function () {
      this.parentElement.remove();
    };
  });

  /* Add checked symbol */
  const list = document.querySelector("ul#todo-list");
  list.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName == "LI") {
        ev.target.classList.toggle("checked");
        /* Set the local storage todo list */
        localStorage.setItem(
          "todos",
          JSON.stringify(
            Array.from(document.querySelectorAll("li")).map((x) => [
              x.childNodes[0].textContent,
              x.classList.contains("checked"),
            ])
          )
        );
      }
    },
    false
  );
}

/** Create new list item */
function createNewElement(text) {
  /* New list element */
  const li = document.createElement("li");
  const textNode = document.createTextNode(text);
  li.appendChild(textNode);
  if (text === "") {
    console.warn("No todo");
  } else {
    /* Append to list */
    document.getElementById("todo-list").appendChild(li);
  }
  document.getElementById("todo-input").value = "";

  /* Close span */
  const closeSpan = document.createElement("span");
  const todoText = document.createTextNode("\u00D7");
  closeSpan.className = "close";
  closeSpan.appendChild(todoText);
  li.appendChild(closeSpan);

  /* Add Eventlistener to close span */
  closeSpan.onclick = function () {
    this.parentElement.remove();
  };

  /* Local Storage */
  localStorage.setItem(
    "todos",
    JSON.stringify(
      Array.from(document.querySelectorAll("li")).map((x) => [
        x.childNodes[0].textContent,
        x.classList.contains("checked"),
      ])
    )
  );
}
