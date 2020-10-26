const grid = document.querySelector('.grid')
async function getBookApi() {
    const url = "https://bookshelf.goodideas-studio.com/api";
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
async function parseData() {
    const data = await getBookApi();
    grid.innerHTML = data.list.map(bookInfo => {
        return createBookList(bookInfo);
    }).join('');

    let msnry = new Masonry(grid);
    imagesLoaded(grid).on('progress', function () {
        // layout Masonry after each image loads
        msnry.layout();
    });
}

parseData();

function createBookList(bookInfo) {
    return `
<div class="grid-item">
    <a href="${bookInfo.link}">
        <div class="book_name">
            ${bookInfo.name}
        </div>
        <img src="${bookInfo.image}"
            alt=""
            class="img">
        <div class="price">
            <div class="isbn">${bookInfo.ISBN}</div>
            <div class="originPrice">原價:${bookInfo.originPrice}</div>
            <div class="sellPrice">折扣:${bookInfo.sellPrice}</div>
        </div>
    </a>
</div>`
}
