const addBtn = document.getElementById("addBtn");
const input = document.getElementById("input");
const invalidMsg = document.getElementById('invalid');
const removeEl = document.getElementsByTagName("i");

let index=0;
let listArr = [];
window.onload = ()=>{
    load();
}
function load(){
    listArr = JSON.parse(localStorage.getItem("todos"))||[];
    listArr.forEach(todo=>{
        displayTodo(todo);
    });
}
function addItems(){
    let todo = input.value;
    listArr.push(todo);
    localStorage.setItem("todos",JSON.stringify(listArr))
    displayTodo(todo);
}
function displayTodo(todo){
    let listItems = document.createElement("li");
    listItems.id=`list${index}`;
    listItems.innerHTML = `
    <input type="checkbox" id="task${index}">
    <label for="task${index}">${todo}</label>
    <i onclick=removeItem(${index})></i>`;
    document.getElementById("list").appendChild(listItems);
    input.value="";
    index++;
}
function removeItem(index){
    console.log(index);
    if(index>-1){
        listArr.splice(index,1);
        localStorage.setItem("todos",JSON.stringify(listArr));
        listArr=[];
        //location.reload();
    }
    updateList(index);
}
function updateList(index){
    let listId = `list${index}`;
    let li = document.getElementById(listId);
    document.getElementById("list").removeChild(li);
}

addBtn.addEventListener("click",()=>{
    if(input.value==="" || input.value===" "){
        input.style.border = "2px solid red";
        invalidMsg.innerHTML = "*Empty value is invalid";
    }
    else{
        input.style.border = "none";
        invalidMsg.innerHTML = "";
        addItems();
    }
});
input.addEventListener("keyup",function(event){
    if(event.key=="Enter" && input.value!=="" && input.value!==" "){
        input.style.border = "none";
        invalidMsg.innerHTML = "";
        addItems();
    }
    else if(event.key=="Enter" && input.value==="" || input.value===" "){
        input.style.border = "2px solid red"; 
        invalidMsg.innerHTML = "*Empty value is invalid"
    }
})