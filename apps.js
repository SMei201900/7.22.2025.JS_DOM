// PART 1 CREATING NEW TODO FROM FORM
const createTodoForm = document.querySelector("#create-todo"); // gets the form from HTML
const todosContainer = document.querySelector("#todos-container"); // gets the todos container from HTML
const apiUrl = "https://jsonplaceholder.typicode.com/todos"; // API endpoint
const headers = { // reusable headers for our requests
    "Content-Type": "application/json", // expected data type being exchanged
}

// submit function to create a new todo and add to the HTML
async function createTodo(event){ 
    try {
        event.preventDefault(); // prevents default behavior of form submission
        const payload = { // data being sent to API
            userId: 2,
            title: event.target.title.value, // value of target input
            completed: false,
        };
        const response = await fetch(apiUrl, { // creating a new TODO with this method
            method: "POST", // HTTP type
            body: JSON.stringify(payload), // converting our data to JSON
            headers
        });

        const data = await response.json(); // we need to convert the response to JSON
        
        const newElement = document.createElement("section"); 
            // create new element to add with our JSON data
        newElement.innerHTML = `
        <p>${data.title}</p>
        <p>${data.completed ? "TODO COMPLETE" : "TODO INCOMPLETE"}</p>
        <button class="toggle-complete">Toggle Complete</button>
        <button id="${data.id}" class="delete-todo">DELETE</button>
        `;

        todosContainer.prepend(newElement); 
            //adds to the beginning; appendChild also work but for the end 
        event.target.reset(); //reset the form

    } catch (error) {
        console.log(error.message);
    }
}

createTodoForm.addEventListener("submit", createTodo);

// PART 2 DELETING TODO FROM HTML
async function deleteTodo(id){ // function to delete todo from server
    try {
        const response = await fetch(`${api}/${id}`, { // sending DELETE request
            method: "DELETE", // using DELETE HTTP method
            headers, // setting the headers
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// using event delegation for click events on delete button
document.addEventListener("click", async function (event) {
    if (event.target.classList.contains("delete-todo")){ // checking if the event.target is the delete button
        await deleteTodo(event.target.id); // mock deleting todo from server
        event.target.parentElement.remove(); // remove the element from the DOM
    }
});

// PART 3 LOAD IN TODOS FROM API
async function fetchTodos() {
    try {
        const response = await fetch(apiUrl); // GETs todos from API
        const data = await response.json(); // converts response to JSON
        const filteredData = data.filter((_, idx) => idx < 5); // limiting the TODOs to first 5
        for (const item of filteredData) { // iterate through todo list to create new element
            const newElement = document.createElement("section"); // create new element to add with our JSON data
            newElement.innerHTML = `
            <p>${item.title}</p>
            <p>${item.completed ? "TODO COMPLETE" : "TODO INCOMPLETE"}</p>
            <button class="toggle-complete">Toggle Complete</button>
            <button id="${item.id}" class="delete-todo">DELETE</button>
            `;
            todosContainer.prepend(newElement);
        }
    } catch (error) {
        console.log(error);
    }
}
fetchTodos();
