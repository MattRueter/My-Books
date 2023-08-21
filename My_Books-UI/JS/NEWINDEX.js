console.log("I am connected to pug file");



function openMenu(){
    const menu = document.getElementById("menu");
    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }
};
