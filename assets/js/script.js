// Determining whether the modal appears based on local storage
const modal = document.getElementById("staticBackdrop");
const modalSeen = localStorage.getItem("modalSeen");
const modalButton = document.querySelectorAll("#modalButton");

if (!modalSeen) { 
    const myModal = new bootstrap.Modal(modal, { backdrop: 'static'});
    myModal.show();
  }