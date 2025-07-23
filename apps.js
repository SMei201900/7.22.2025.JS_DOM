const { create } = require("@mui/material/styles/createTransitions");


const createToDoForm = document.querySelector("#create-todo"); //gets the form from HTML 
const todosContainer = document.querySelector("#todos-container") //gets the todos container from HTML

const apiURL = "https://jsonplaceholder.typicode.com/todos"; //API endpoint 

const headers = {//reusable headers for our requests 
    "Content-Type":"application/json" //expected data type being exchanged
}

async function createToDo(event) { //submit function to create a new todo and to add to the HTML 
    try {
        event.preventDefault(); //prevents the default behavior of form submission 
        const payload = { //data is being sent to the API 
            userID: 2,
            title: event.target.title.value, //value of target input 
            completed: false,
        }; 
        const response = await fetch(apiURL, { //creating a new TODO with this method 
            method: "POST", //HTTP type 
            body: JSON.stringify(payload), //converting our data to JSON 
            headers
        });

        const data = await response.json(); //we need to convert the response to JSON 

        //create new element to add with our JSON data 
        const newElement = document.createElement("section") 
            //creates a new element to add with out JSON data
        newElement.innerHTML = ` 
        <p>${data.title} </p>
        <p>${data.completed ? "TODO COMPLETE" : "TODO INCOMPLETE"} </p>
        <button class="toggle-complete">Toggle Complete </button>
        <button class="delete-todo">DELETE</button>
        `;

        todosContainer.appendChild(newElement);
        event.target.reset() //resetting the form 

    } catch {error} {
        console.log(error.message); 
    }
}

createToDoForm.addEventListener("submit", createToDo);

//Part 2, deleting todo from the HTML 
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-todo")) {
        event.target.parentElement.remove();
    }
});