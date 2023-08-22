import books from "../dummy_db.mjs"

function getTotalPages (results, itemsPerPage) {
    const size = results.length;
    const totalPages = Math.ceil(size/itemsPerPage);

    return totalPages
};


function createPages (totalPages, itemsPerPage, array) {
    let pages = [];
    let page = [];
    let bookIndex = 0;
    const pushBooksToPage = () =>{
        for(let i=1; i<=itemsPerPage; i ++){
            page.push(array[bookIndex]);
            bookIndex ++;
            if(checkIfLastPage(array, bookIndex)){return}
        } 
    }
    
    for(let i = 1; i<=totalPages; i++){
        pushBooksToPage();
        pages.push(page);
        page = [];
    }

    return pages;
}


function checkIfLastPage (array, currentIndex){
    let isLastItem = false;
    currentIndex > array.length - 1 ? isLastItem = true : isLastItem = false;
    return isLastItem;
};
//__________________________________________________________________________


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




export const paginationFunctions = { getTotalPages, createPages } 