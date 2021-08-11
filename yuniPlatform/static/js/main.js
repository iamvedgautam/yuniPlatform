// console.log('main JS');

var pageURL = document.URL;
var activeNavMenu1 = document.querySelector(".dashboard");
var activeNavMenu2 = document.querySelector(".asset");
var activeNavMenu3 = document.querySelector(".report");
var activeNavMenu4 = document.querySelector(".analysis");
var paageHeader = document.querySelector(".pageHeader h2")

console.log(pageURL);


if (pageURL.includes("asset")) {

  activeNavMenu2.classList.add("active");
  paageHeader.textContent = "Asset";

} else if (pageURL.includes("dashboard")) {

  activeNavMenu1.classList.add("active");
  paageHeader.textContent = "Dashboard";

} else if (pageURL.includes("report")) {

  activeNavMenu3.classList.add("active");
  paageHeader.textContent = "Report Generate";

} else if (pageURL.includes("analysis")) {

  activeNavMenu4.classList.add("active");
  paageHeader.textContent = "Analysis";

} 