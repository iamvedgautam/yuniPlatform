console.log('Login page');

var emailFeild = document.getElementById("emailFeild");
var feedBackArea = document.querySelector(".invalid-feedback");
var showPasswordToggle = document.querySelector(".showPasswordToggle");
var passwordField = document.querySelector("#passwordField")

const handleToggleInput = (e) => {
    if(showPasswordToggle.textContent==='SHOW') {
        showPasswordToggle.textContent = 'HIDE'
        passwordField.setAttribute("type", "text");
    } else {
        showPasswordToggle.textContent = 'SHOW';
        passwordField.setAttribute("type", "password");
    }
};

showPasswordToggle.addEventListener("click", handleToggleInput);

emailFeild.addEventListener("keyup", function(e){
    // console.log('777777',777777);
    var emailVal = e.target.value;
    console.log(emailVal);
    
    feedBackArea.style.display = 'none';
    emailFeild.classList.remove("is-invalid");
    emailFeild.classList.remove("is-valid");

    if(emailVal.length>0){
        fetch('/authentication/validate-email',{
            body: JSON.stringify({'email': emailVal}),
            method: "POST"
        })
        .then((res )=> res.json())
        .then((data) => {
            console.log(data["email_error"])
            if (data["email_error"]=="Invalid email id"){
                emailFeild.classList.remove("is-valid");
                feedBackArea.style.display = 'none';
                emailFeild.classList.add("is-invalid");
                feedBackArea.style.display = 'block';
                feedBackArea.style.color = "#e60000";
                feedBackArea.innerHTML = `<p>${data["email_error"]}</p>`;
            } else if (data["email_error"]=="Correct email id"){
                emailFeild.classList.remove("is-invalid");
                feedBackArea.style.display = 'none';
                emailFeild.classList.add("is-valid");
                feedBackArea.style.display = 'block';
                feedBackArea.style.color = "#009900";
                feedBackArea.innerHTML = `<p>${data["email_error"]}</p>`;
            }
        });
    }
    
});