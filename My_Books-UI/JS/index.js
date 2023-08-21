const nav = document.querySelector("nav");
const root = document.getElementById("root");
const paginationBox = document.getElementById("paginationBox");
const table = document.getElementById("result_table");

let itemsPerPage = 5;


async function getBooks (queryValue) {
    //const response = await fetch(`http://localhost:5000/book/${queryValue}`);
    //const books = await response.json();
    console.log(books);

    //paint initial UI
    const startIndex = 0;
    const finalIndex = itemsPerPage - 1;
    createPaginationButtons(getTotalPages(books))
    showResults(books, startIndex, finalIndex);
    createCurrentPageMsg(1, getTotalPages(books))
    
    //assign resolved data to global data variable. === STATE
    data = books.map(book => book);
}




function showResults (results, firstIndex, lastIndex) {
    // Determines if on the last page and updates lastIndex accordingly.
    lastIndex = checkIfLastPage (results, lastIndex)
   
    if(showTable){
        clearDisplay("result_list")
        clearDisplay("result_table");
        table.style.display ="block"
        createTableHeader ()
        displayResults(results, firstIndex, lastIndex, "result_table", "tr", "td");
    }else{
        clearDisplay("result_table");
        clearDisplay("result_list");
        table.style.display ="none"
        displayResults(results, firstIndex, lastIndex, "result_list", "li", "p");
   
    }
};

function displayResults(results, firstIndex, lastIndex, parentElement, childElement, detailElement){
    // parentElement = the container. Either results_list or results_table
    //childElement = the items which insert into container. Either <li> or <tr>
    // detailElement = the book details which insert into each child. So <p> or <td> with title, author etc...
    
    console.log(parentElement,childElement,detailElement);

    const parent = document.getElementById(parentElement);

    for(let i=firstIndex; i<=lastIndex; i++){
        let msg = statusMessage(results, i);

        const info = {
            title:`${results[i].title}`,
            author: ` ${results[i].author_firstName} ${results[i].author_lastName}`,
            language: ` ${results[i].language}`,
            status: msg
        };

        const child = document.createElement(childElement);
        parent.append(child);

        addBookDetails(info.title, child, detailElement);
        addBookDetails(info.author, child, detailElement);
        addBookDetails(info.language, child, detailElement);
        addBookDetails(info.status, child, detailElement);         

    }
    function addBookDetails(infoKey, parentElement, detailElement){
        const detail = document.createElement(detailElement);
        detail.textContent = infoKey
        parentElement.append(detail);
    };
    function statusMessage (results, i) {
        let msg;
        results[i].have_read === true ? msg = "Have read" : msg = "Haven't read";
        return msg;
    }
};

function clearDisplay(parentId){
    const parentContainer = document.getElementById(parentId)
    
    while(parentContainer.firstChild){
        parentContainer.removeChild(parentContainer.firstChild)
    };
};


//PAGINATION-------------------------------refactor and simplify --------------------------------------------------
function getTotalPages (results) {
    const size = results.length;
    const totalPages = Math.ceil(size/itemsPerPage);

    return totalPages
};

function createPaginationButtons (totalPages) {
    clearDisplay("paginationBox")
    for(let i = 1; i <=totalPages; i++ ){
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () =>{
            turnPage(i);
        });
        paginationBox.append(pageBtn)
    }
};

function createCurrentPageMsg (currentPage, totalPages) {
    const parentContainer = document.getElementById("result_list")
    const currentPgDisplay = document.createElement("p");
    currentPgDisplay.classList.add("msg")
    currentPgDisplay.textContent = `page ${currentPage} / ${totalPages}`
    parentContainer.append(currentPgDisplay);

};

function turnPage (pg) {
    let page = pg 
    let firstIndex = (page - 1) * itemsPerPage;
    let lastIndex = firstIndex + itemsPerPage-1;
    
    showResults(data, firstIndex, lastIndex)
    createCurrentPageMsg(page, getTotalPages(data))
};

function checkIfLastPage (results, lastIndex){
    let index;
    lastIndex > results.length - 1 ? index = results.length-1 : index = lastIndex;
    return index;
};

//SETTINGS:
function toggleMenu() {
    const menu = document.getElementById("menu");
    if(menu.style.display === "none"){
        menu.style.display = "block"
    }else{
        menu.style.display ="none"
    }
};

function toggleDisplay (){
    const table = document.getElementById("menuTable");
    const cards = document.getElementById("menuCards");

    if(showTable){
        showTable = false;
        table.textContent = "View as table:  ";
        cards.textContent = `View as cards:  selected`;  
    }else{
        showTable = true;
        table.textContent = `View as table:  selected`;
        cards.textContent = "View as cards:  ";
    }
};

function logout(){
    console.log("loggin out.")
}
//Table header workaround :Temp
function createTableHeader (){
    const headers = ["Title", "Author", "Language", "Read ?"]
    
    const tr = document.createElement("tr");
    table.append(tr);

    let i=0;
    while(i<4){
        const th = document.createElement("th");
        th.textContent = headers[i]
        tr.append(th)
        
        i++;
    }
}


// NEW FRONT END JS called in PUG files. 
function openMenu(){
    const menu = document.getElementById("menu");
    if(menu.style.display === "block"){
        menu.style.display = "none";
    }else{
        menu.style.display = "block";
    }
};
