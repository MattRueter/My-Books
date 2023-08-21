
function getTotalPages (results, itemsPerPage) {
    const size = results.length;
    const totalPages = Math.ceil(size/itemsPerPage);

    return totalPages
};

//______________________


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

export const paginationFunctions = { getTotalPages } 