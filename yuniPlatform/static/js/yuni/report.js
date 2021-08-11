// Function to add event listener to table
var el = document.getElementById("inlineFormCustomSelect");
var elr = document.getElementById("asset-select");

elr.style.display = 'none';

el.addEventListener("change", function() {
  elr.style.display = 'none';
  if (el.value === "2") {
    console.log("get stores");
    elr.style.display = 'flex';
  }
});

