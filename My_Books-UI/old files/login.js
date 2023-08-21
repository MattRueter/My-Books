console.log("hello from login.");



const form = document.getElementById("loginForm");
form.addEventListener("submit", formSubmit);



async function formSubmit(e){
    e.preventDefault();

    const formData = new FormData();
    formData.append(
        "username",
        document.getElementById("nameField").value
    )
    formData.append(
        "password",
        document.getElementById("passwordField").value
    )
    
    const dataObject = Object.fromEntries(formData.entries());
    const data = JSON.stringify(dataObject);
    console.log(data);
    


    const response = await fetch("http://localhost:3000/login",
    {
        method:'POST',
        headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: data,
    });
    
    const url = new URL(response.url);
    const path = url.pathname;
    console.log(url)
    console.log(path);
}
