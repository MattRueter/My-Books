
// USED TO OPEN/CLOSE --- MENU / ADD a book form / DELETE a book form
function toggle (elementId) {
    const element = document.getElementById(elementId);
    if(element.style.display === "block"){
        element.style.display = "none";
    }else{
        element.style.display = "block";
    }
}
