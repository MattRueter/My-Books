


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


function test(){
    console.log("Turn the page. Display items # through #");
    // clearDisplay and create new li 's 
    // but how to get data here?
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
