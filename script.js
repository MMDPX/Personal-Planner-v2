const modal = document.getElementById("staticBackdrop");
const modalSeen = localStorage.getItem("modalSeen");
const modalButton = document.getElementById("modalButton");
const sleepingHours = document.getElementById("sleepingHours");
const workingHours = document.getElementById("workingHours");
const includeSleepingHours = document.getElementById("includeSleepingHours");
const includeWorkingHours = document.getElementById("includeWorkingHours");



// Determining whether the modal appears based on local storage
if (!modalSeen) { 
    const myModal = new bootstrap.Modal(modal, { backdrop: 'static'});
    myModal.show();
  }

// Function for console logging inputs' value
const logHours = () => {
  console.log(sleepingHours.value);

  if (includeSleepingHours.checked) {
    console.log("The hours will not be included in the schedule.");
  }

  console.log(workingHours.value)

  if (includeWorkingHours.checked) {
    console.log("The hours will not be included in the schedule.")
  }

};


modalButton.addEventListener("click", () => {
  logHours();
});



