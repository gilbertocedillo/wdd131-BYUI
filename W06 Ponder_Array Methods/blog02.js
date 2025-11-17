const articles = [
    {id: 1, title: "Septimus Heap Book One: Magyk", date: "July 5, 2022", description:"If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.", imgSrc: "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg", imgAlt: "Book cover for Septimus Heap 1", ages: "10-14", genre: "Fantasy", stars: "⭐⭐⭐⭐"},
    {id: 2, title: "Magnus Chase Book One: Sword of Summer", date: "December 12, 2021", description:"The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.", imgSrc:"https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300", imgAlt: "Book cover for Magnus Chase 1", ages: "12-16", genre: "Fantasy", stars: "⭐⭐⭐⭐"},
    {id: 3,title: "Belgariad Book One: Pawn of Prophecy",date: "Feb 12, 2022",description:"A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",imgSrc:"https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",imgAlt: "Book cover for Pawn of Prophecy",ages: "12-16",genre: "Fantasy",stars: "⭐⭐⭐⭐⭐"}
];

/**
 * 
 * @param {object} article
 * @returns {string} 
 */
function articleTemplate(article) {
    
    return `
        <article class="book-review" aria-labelledby="book-title-${article.id}">
            <div class="post-main-grid">
                
                <section class="post-metadata">
                    <p class="post-date">${article.date}</p>
                    <p class="post-age">${article.ages}</p>
                    <p class="post-genre">${article.genre}</p>
                    <p class="post-stars">${article.stars}</p>
                </section>
                
                <section class="post-content">
                    <h2 id="book-title-${article.id}" class="book-title">${article.title}</h2>
                    
                    <figure class="book-image">
                        <img src="${article.imgSrc}" 
                            alt="${article.imgAlt}">
                    </figure>
                    
                    <p class="post-description">
                        ${article.description}
                    </p>
                </section>
            </div> 
            <p class="post-author">Gilberto Cedillo</p>
        </article>
    `;
}

/**
 * Generates the HTML for all articles and injects it into the DOM.
 * @param {Array<object>} articleList - Array of article data objects.
 */
function outputArticles(articleList) {

    const outputElement = document.querySelector('#article-list');
    
    if (!outputElement) {
        console.error("The insertion point #article-list was not found.");
        return;
    }

    const articlesHTML = articleList.map(article => articleTemplate(article)).join('');
       outputElement.innerHTML = articlesHTML;


}


outputArticles(articles);