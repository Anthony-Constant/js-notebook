window.onload = function() { // execute a JavaScript immediately after the page has been loaded 
    displayNote(); // call the function 'displayTask' everytime the page loads. 
    
}

// Create some variables
const input = document.querySelector("input");
const btn = document.querySelector("button");
const todoList = document.querySelector(".todo-list");
const clear = document.querySelector(".clear");

// Add an EventListener to the BTN
btn.addEventListener("click", addNote);

// Create function for adding each task
function addNote() { // create a function called 'addTask'
    if (input.value != "") { // if the input field is not equal to an empty string
        addNoteToLS(); // call the function addTaskToLS (Local storage )
        todoList.innerHTML = "A note has been added."; // set the todoList to an empty string to avoid repeat in the array.
        displayNote(); // call the display task function to show new set of tasks.
    } else {
        alert("Please enter a note") // otherwise present an alert message to the user
        
    }
}

// Save to the browser local storage
function addNoteToLS() { // create a variable called 'addTaskToLS'
    let notes; // declare a variable 'tasks'
    if (localStorage.getItem("notes") === null) {  // first get item from local storage then if task does not exist in the local storage 
        notes = []; // indicates an empty array and append task from local storage into the array.
    } else { // the index determines the position of the array
        notes = JSON.parse(localStorage.getItem("notes")) // otherwise get the 'tasks' from local storage
    }
    notes.push(input.value); // push whatever we typed and push it into the 'tasks' array
    localStorage.setItem("notes", JSON.stringify(notes)); // need a key and a value convert from object into string using JSON.stringify
    console.log(input.value); // note: to save anything in local storage it must be converted into a string. initiate console.log with the input.value for debugging purposes.
    input.value = ""; 
}
// we need to check the local storage to see if we have any tasks already stored there. Otherwise set the task to an empty array.
// BUT if we do have the tasks within the array, we need to parse that array so it becomes accessible. 
// Copy code from 'addTaskToLS' function.
// Display Tasks
function displayNote() { // create a variable called 'displayTask'
    let notes;
    if (localStorage.getItem("notes") === null) {
        notes = [];
        todoList.innerHTML = "You have no notes yet!"; // present message to the user
        
    } else {
        notes = JSON.parse(localStorage.getItem("notes"))
        
        
    }
    

    notes.forEach(function(note, index) { // add the index number to each task i.e. task1 stored in index 1 ...
        
        // create some variables
        const newLi = document.createElement("li"); // used to create new list
        const complete = document.createElement("p"); // used create the complete button.
        const checkBtn = document.createElement("button"); // create the tick(add) button.
        const delBtn = document.createElement("button"); // create the cross(delete) button.

        // Add icons to the buttons for the variables created 
        delBtn.innerHTML = `<i class="fa fa-times"></i>`; 
        checkBtn.innerHTML = `<i class="fas fa-check"></i>`;
        complete.innerHTML = `<i class="fas fa-check"></i>`;
        newLi.appendChild(document.createTextNode(note)); // create a TextNode with a specified text and append it to the array list (in this case task.)
        newLi.appendChild(checkBtn); // apend the tick button with the task bar
        newLi.appendChild(delBtn); // apend the cross button with the task bar

        todoList.appendChild(newLi); // append the task (newLi) to the todoList. 

         // MARK TASK AS COMPLETED
         checkBtn.addEventListener("click", () => {
            newLi.appendChild(complete);
            
        })

        
        // Delete a Task
        delBtn.addEventListener("click", function(){ // create an event listener function here
            
            
                if (localStorage.getItem("notes") === null) { // if the local storage has nothing stored inside it
                    notes = []; // create the tasks empty list
                } else { // otherwise...
                    notes = JSON.parse(localStorage.getItem("notes")) // use the JSON parse method to store the task into the local storage.
                    
                }
            
            notes.splice(index, 1); // the splice() method add/removes items to/from an aerray, and returns the removed item(s).     
           
            localStorage.setItem("notes", JSON.stringify(notes)); // the JSON.stringify() method converts a JavaScript object or value to a JSON string. so we can store it inside of local storage it must be a string. 
            todoList.innerHTML = "A note has been removed."; // present message to the user
            displayNote(); // call the 'displayNote' function

       
        });

        })      
    
}

// Clear All Tasks
clear.addEventListener("click", clearNote); // add an event listener for the 'clearTask' function.

function clearNote() { // create a function called clearTask
   
        localStorage.clear(); // then clear the local storage using the '.clear' method.
        todoList.innerHTML = "All notes have been cleared."; // empty the list
        displayNote(); // call the 'displayTask' function.
    }


for (i = 0; i <= localStorage.length; i++) { // create a for loop set i = 0. i less than or equal to localstorage length.increment i using '++'
    let key = localStorage.key(i); // create a variable called key and equal to localStorage.key(i)
    console.log(localStorage.getItem(key)); // console for debugging the key
}
