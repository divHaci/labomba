document.addEventListener("DOMContentLoaded", function () {
  console.log("suca");
  // Hide the loading animation
  var loader = document.querySelector(".loader");
  loader.style.display = "none";

  // Show the content
  var content = document.querySelector(".content");
  content.style.display = "block";
});
