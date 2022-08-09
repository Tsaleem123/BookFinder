var altImg = "https://bulma.io/images/placeholders/128x128.png";
document.getElementById("searchButton").onclick = function () {
document.getElementById("test").innerHTML = "";



var myBook = document.getElementById("bookName").value;
getBookByName(myBook);
};
const input = document.querySelector("input");
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    var myBook = document.getElementById("bookName").value;
    getBookByName(myBook);

    document.getElementById("test").innerHTML = "";
  }
});

/**
 * @param {bookName} bookName 
 * Method to retrieve a query of 40 books related to 
 * the keyword provided by the user. 
 */

const getBookByName = async (bookName) => {
  if (bookName === "" || bookName === null) 
  {
  } 
  else {
    const res = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        bookName +
        "&maxResults=40"
    );
    makeImages(res.data);

  }
};
/**
 * @param {books} books
 * Method to retrieve important information
 * regarding the queried books which will 
 * be required to present the books in a card format. 
 */
const makeImages = (books) => {
  for (var i = 0; i < books.items.length; i += 1) {
    const img = document.createElement("IMG");
    if (books.items[i].volumeInfo.industryIdentifiers) {
      try {
        img.src = books.items[i].volumeInfo.imageLinks
          ? books.items[i].volumeInfo.imageLinks.thumbnail : altImg;
        descrption = books.items[i].searchInfo
          ? books.items[i].searchInfo.textSnippet : " ";
        author = books.items[i].volumeInfo.authors[0];
        date = books.items[i].volumeInfo.publishedDate;
        title = books.items[i].volumeInfo.title;
        isbn = books.items[i].volumeInfo.industryIdentifiers[0].identifier;
        createCard(img.src, author, descrption, date, title);
      } catch {
        continue;
      }
    }
  }
};


/** 
 * @param {img} img 
 * @param {author} author 
 * @param {descrption} descrption 
 * @param {date} date 
 * @param {title} title 
 * Method to create a card which contains
 * important information regarding the book. 
 */
function createCard(img,author,descrption,date,title) {
  const content = `
  <div class="card">
  <div class="card-image is-centered">
    <figure class="mx-2 my-6 image is-128x128 ">
      <img class = "is-rounded" src="${img}" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">

          <img src="${img}" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">${title}</p>
        <p class="subtitle is-6">${author}</p>
      </div>
    </div>

    <div class="content">
    ${descrption} 

      <br>
      <time class = "title is-6">${date}</time>
    </div>
  </div>
  <a href = "https://books.google.com/books?vid=ISBN${isbn}" target="_blank">
  <button class="mx-3 my-3 button is-responsive">
  Read
</button>
</a>
</div>
`;
  document.getElementById("test").innerHTML += content;
}
