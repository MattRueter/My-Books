console.log("I am connected to pug file");
let page = 3;

function openMenu(){
    const menu = document.getElementById("menu");
    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }
};


function test(){
    console.log("Turn the page. Display items # through #");
    // clearDisplay and create new li 's 
    // but how to get data here?
}