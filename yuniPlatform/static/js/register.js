var emailFeild = document.getElementById("emailFeild");
var feedBackArea = document.querySelector(".invalid-feedback")
var submitBtn = document.querySelector(".submit-btn");

emailFeild.addEventListener("keyup", function(e){
    console.log('777777',777777);
    var emailVal = e.target.value;
    console.log(emailVal);

    feedBackArea.style.display = 'none';
    emailFeild.classList.remove("is-invalid");
    emailFeild.classList.remove("is-valid");
    submitBtn.disabled = true;

    if(emailVal.length>0){

        fetch('/authentication/validate-email',{
            body: JSON.stringify({'email': emailVal}),
            method: "POST"
        })
        .then((res )=> res.json())
        .then((data) => {
            console.log(data["email_error"])
            if (data["email_error"]=="Invalid email id"){
                submitBtn.disabled = true;
                emailFeild.classList.remove("is-valid");
                feedBackArea.style.display = 'none';
                emailFeild.classList.add("is-invalid");
                feedBackArea.style.display = 'block';
                feedBackArea.style.color = "#e60000";
                feedBackArea.innerHTML = `<p>${data["email_error"]}</p>`;
            } else if (data["email_error"]=="Correct email id"){
                // submitBtn.removrAttribute("disabled");
                submitBtn.disabled = false;
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