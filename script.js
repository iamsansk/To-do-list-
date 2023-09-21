const addBtn = document.querySelector("#addBtn");
const input = document.querySelector("#input");
const invalidMsg = document.querySelector('#invalid');
const list = document.querySelector("#list");

let listArr = [];

window.onload = () => {
    load();
}

function load() {
    listArr = JSON.parse(localStorage.getItem("todos")) || [];
    listArr.forEach(todo => {
        displayTodo(todo);
    });
}

function addItems() {
    const todo = input.value.trim(); 
    if (todo !== "") {
        listArr.push(todo);
        localStorage.setItem("todos", JSON.stringify(listArr))
        displayTodo(todo);
        input.value = "";
    } else {
        input.style.border = "2px solid red";
        invalidMsg.innerHTML = "*Empty value is invalid";
    }
}

function displayTodo(todo) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <input type="checkbox">
        <label>${todo}</label>
        <i class="remove-btn"></i>`;
    list.appendChild(listItem);
}

list.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
        const listItem = event.target.parentElement;
        console.log(listItem);
        const index = Array.from(list.children).indexOf(listItem);
        console.log(index);
        listArr.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(listArr));
        list.removeChild(listItem);
    }
});

addBtn.addEventListener("click", addItems);

input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addItems();
    }
});
