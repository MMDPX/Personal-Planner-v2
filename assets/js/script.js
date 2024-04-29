const modal = document.getElementById("staticBackdrop");
const modalSeen = localStorage.getItem("modalSeen");
const modalButton = document.getElementById("modalButton");
const sleepingHours = document.getElementById("sleepingHours");
const workingHours = document.getElementById("workingHours");
const includeSleepingHours = document.getElementById("includeSleepingHours");
const includeWorkingHours = document.getElementById("includeWorkingHours");
const container = document.getElementById("container"); 

// Determining whether the modal appears based on local storage
if (!modalSeen) { 
  document.addEventListener("DOMContentLoaded", () => {
    myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), { backdrop: 'static' });
    myModal.show();
  });    
  }

// Function for rendering the schedule based on user input
const renderSchedule = (numberOfRows) => {
  console.log(sleepingHours.value);

  if (includeSleepingHours.checked) {
    console.log("The hours will not be included in the schedule.");
  }

  console.log(workingHours.value)

  if (includeWorkingHours.checked) {
    console.log("The hours will not be included in the schedule.")
  }

  // Getting the amount of hours slept
  sleepHours = sleepingHours.value
  const [startSleepHourStr, endSleepHourStr] = sleepHours.split("-");
  startSleepHour = parseInt(startSleepHourStr, 10);
  endSleepHour = parseInt(endSleepHourStr, 10); 
  let amountOfSleep =  endSleepHour - startSleepHour
  // Handling working across midnight  
  if (startSleepHour > endSleepHour) {
  amountOfSleep = 24 - startSleepHour + endSleepHour
  console.log(amountOfSleep)
  }
  
  for (let i = 0; i < numberOfRows; i++) {
    // Creating the row element
    const row = document.createElement("div");
    row.className = "row";

    // Creating the time column
    const timeCol = document.createElement("div");
    timeCol.className = "col";
    timeCol.id = "time";
    timeCol.textContent = `${[i]} PM`; 

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
  renderSchedule();
  myModal.hide();
});

// const getSleepHours = () => {
//   totalSleepHours = sleepingHours.value
//   const [startSleepHour, endSleepHour] = totalSleepHours.split("-")
//   console.log(startSleepHour)
// }
// getSleepHours();