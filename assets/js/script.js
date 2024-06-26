// First modal
const modal = document.getElementById("staticBackdrop");
const modalSeen = localStorage.getItem("modalSeen");
const modalButton = document.getElementById("modalButton");
const sleepingHours = document.getElementById("sleepingHours");
const workingHours = document.getElementById("workingHours");
const dontIncludeSleepingHours = document.getElementById("dontIncludeSleepingHours");
const dontIncludeWorkingHours = document.getElementById("dontIncludeWorkingHours");
const container = document.getElementById("container"); 

// Randomiser modal
const randomiserBtn = document.getElementById("randomiserBtn");
const closeRandomiserBtn = document.getElementById("closeRandomiserBtn");
const addTask = document.getElementById("addTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskDiv = document.getElementById("taskDiv");

// Day.js
const time = document.querySelector("#currentDay");


// Function for getting the current day with Day.js
function updateTime(){
  time.textContent = dayjs().format("YYYY-MM-DD HH:mm:ss");
  }
  setInterval(updateTime, 1000);

// Determining whether the modal appears based on local storage
if (!modalSeen) { 
  document.addEventListener("DOMContentLoaded", () => {
    myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), { backdrop: 'static' });
    myModal.show();
  });    
  }

  const calculateHours = () => {
    // Getting the amount of sleeping hours
    sleepHours = sleepingHours.value
    const [startSleepHourStr, endSleepHourStr] = sleepHours.split("-");
    startSleepHour = parseInt(startSleepHourStr, 10);
    endSleepHour = parseInt(endSleepHourStr, 10); 
    let sleepTime =  endSleepHour - startSleepHour
  
    // Handling working across midnight  
    if (startSleepHour > endSleepHour) {
    sleepTime = 24 - startSleepHour + endSleepHour
    } 

     // Getting the amount of working hours
     workHours = workingHours.value
     const [startWorkHourStr, endWorkHourStr] = workHours.split("-");
     startWorkHour = parseInt(startWorkHourStr, 10);
     endWorkHour = parseInt(endWorkHourStr, 10); 
     let workTime =  endWorkHour - startWorkHour
   
     // Handling working across midnight  
     if (startWorkHour > endWorkHour) {
     workTime = 24 - startWorkHour + endWorkHour
     } 


    const freeTime = 24 - sleepTime - workTime
    let totalTime = freeTime + sleepTime + workTime
    let newTime

    if (dontIncludeSleepingHours.checked && dontIncludeWorkingHours.checked) {
      newTime = totalTime - sleepTime - workTime
    } else if (dontIncludeSleepingHours.checked) {
      newTime = totalTime - sleepTime
    } else if (dontIncludeWorkingHours.checked) {
      newTime = totalTime - workTime
    } else {
      newTime = 24
    }
      return newTime    
  }

// Function for rendering the schedule based on user input
const renderSchedule = (newTime) => {
  for (let i = 0; i < newTime; i++) {
    // Creating the row element
    const row = document.createElement("div");
    row.className = "row";

    // Creating the time column
    const timeCol = document.createElement("div");
    timeCol.className = "col";
    timeCol.id = "time";

    if (dontIncludeSleepingHours.checked && dontIncludeWorkingHours.checked && startWorkHour > endSleepHour) {
    timeCol.textContent = `${i + endWorkHour} :00`; 
    } else if (dontIncludeSleepingHours.checked && dontIncludeWorkingHours.checked && startSleepHour > endWorkHour) {
      timeCol.textContent = `${i + endSleepHour} :00`; 
    } else {
      timeCol.textContent = `${i} :00`; 
    }

    // Creating the task input
    const taskInput = document.createElement("input");
    taskInput.className = "col-11";
    taskInput.id = "task";
    taskInput.type = "text";

    // Creating the submit button
    const submitButton = document.createElement("div");
    submitButton.className = "col btn btn-primary";
    submitButton.type = "submit";
    submitButton.id = "save";
    submitButton.innerHTML = "Save"

    // Appending elements to the row
    row.appendChild(timeCol);
    row.appendChild(taskInput);
    row.appendChild(submitButton);

    // Appending the row to the container
    container.appendChild(row);
  }
};

//Randomiser user input
const randomiserModalUserInput = (taskText) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("taskItem");
  const taskContent = document.createElement("p");
  taskContent.textContent = taskText;
  taskContainer.appendChild(taskContent);
  const closeButton = document.createElement("button");
  closeButton.classList.add("removeTaskButton");
  closeButton.textContent = addTask.value

  closeButton.addEventListener("click", () => {
    taskContainer.remove();
  });

  taskContainer.appendChild(closeButton);
  taskDiv.appendChild(taskContainer);
};

// First modal 
modalButton.addEventListener("click", () => {
  renderSchedule(calculateHours());
  myModal.hide();
});

// Randomiser modal
randomiserBtn.addEventListener("click", () => {
  randomiserModal = new bootstrap.Modal(document.getElementById("randomiserModal"));
  randomiserModal.show();
});

closeRandomiserBtn.addEventListener("click", () => {
  randomiserModal.hide();
});

addTaskBtn.addEventListener("click", () => {
 randomiserModalUserInput();
});

