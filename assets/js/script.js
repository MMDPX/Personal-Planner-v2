const modal = document.getElementById("staticBackdrop");
const modalSeen = localStorage.getItem("modalSeen");
const modalButton = document.getElementById("modalButton");
const sleepingHours = document.getElementById("sleepingHours");
const workingHours = document.getElementById("workingHours");
const dontIncludeSleepingHours = document.getElementById("dontIncludeSleepingHours");
const dontIncludeWorkingHours = document.getElementById("dontIncludeWorkingHours");
const container = document.getElementById("container"); 
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
     console.log(freeTime)

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
    timeCol.textContent = `${i + startSleepHour} :00`; 

    // Creating the task input
    const taskInput = document.createElement("input");
    taskInput.className = "col-8";
    taskInput.id = "task";
    taskInput.type = "text";

    // Creating the submit button
    const submitButton = document.createElement("div");
    submitButton.className = "col btn btn-primary";
    submitButton.type = "submit";
    submitButton.value = "Submit";
    submitButton.id = "save";

    // Appending elements to the row
    row.appendChild(timeCol);
    row.appendChild(taskInput);
    row.appendChild(submitButton);

    // Appending the row to the container
    container.appendChild(row);

  }
};

modalButton.addEventListener("click", () => {
  renderSchedule(calculateHours());
  myModal.hide();
});



