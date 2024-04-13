const booksXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE library [
    <!ELEMENT library (book+)>
    <!ELEMENT book (title, author, available)>
    <!ELEMENT title (#PCDATA)>
    <!ELEMENT author (#PCDATA)>
    <!ELEMENT available (#PCDATA)>
]>
<library>
    <book>
        <title>Percy Jackson and the Lightning Thief</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Percy Jackson and the Sea of Monsters</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Percy Jackson and the Titan's Curse</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Percy Jackson and the Battle of the Labyrinth</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Percy Jackson and the Last Olympian</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Percy Jackson and the Chalice of the Gods</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Heroes of Olympus: The Lost Hero</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Heroes of Olympus: The Son of Neptune</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Heroes of Olympus: The Mark of Athena</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Heroes of Olympus: The House of Hades</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Heroes of Olympus: The Blood of Olympus</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Trials of Apollo: The Hidden Oracle</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Trials of Apollo: The Dark Prophecy</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Trials of Apollo: The Burning Maze</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Trials of Apollo: The Tyrant's Tomb</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Trials of Apollo: The Tower of Nero</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Camp Jupiter Classified</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>Magnus Chase and the Sword of Summer</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Magnus Chase and the Hammer of Thor</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>Magnus Chase and the Ship of the Dead</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>The Kane Chronicles: The Red Pyramid</title>
        <author>Rick Riordan</author>
        <available>No</available>
    </book>
    <book>
        <title>The Kane Chronicles: The Throne of Fire</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>
    <book>
        <title>The Kane Chronicles: The Serpent's Shadow</title>
        <author>Rick Riordan</author>
        <available>Yes</available>
    </book>

</library>`;

// Function to search for books using fuzzy search
function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(booksXML, "text/xml");
    const books = xmlDoc.getElementsByTagName("book");
    
    // Define options for fuzzy search
    const options = {
        keys: ['title', 'author'], // Properties to search within
        threshold: 0.3 // Adjust the threshold for fuzzy search accuracy
    };
    
    // Convert XML data to array of objects
    const bookArray = Array.from(books).map(book => {
        return {
            title: book.getElementsByTagName("title")[0].textContent,
            author: book.getElementsByTagName("author")[0].textContent,
            available: book.getElementsByTagName("available")[0].textContent
        };
    });

    // Create a new Fuse instance with the options
    const fuse = new Fuse(bookArray, options);

    // Perform the fuzzy search
    const searchResult = fuse.search(searchTerm);

    let resultHTML = '';
    searchResult.forEach(result => {
        const { title, author, available } = result.item;
        resultHTML += `<tr><td>${title}</td><td>${author}</td><td>${available}</td><td><button onclick="selectBook('${title}')">Select</button></td></tr>`;
    });

    document.getElementById('bookList').innerHTML = resultHTML || '<tr><td colspan="4">No matching books found.</td></tr>';
}


// Function to display all books
function displayAllBooks() {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(booksXML, "text/xml");
    const books = xmlDoc.getElementsByTagName("book");
    let allBooks = '';

    for (let i = 0; i < books.length; i++) {
        const title = books[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        const author = books[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
        const available = books[i].getElementsByTagName("available")[0].childNodes[0].nodeValue;
        allBooks += `<tr><td>${title}</td><td>${author}</td><td>${available}</td><td><button onclick="selectBook('${title}')">Select</button></td></tr>`;
    }

    document.getElementById('bookList').innerHTML = allBooks;
}


// Function to select a book
function selectBook(title) {
    // Check if the book is available
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(booksXML, "text/xml");
    const books = xmlDoc.getElementsByTagName("book");

    let isAvailable = false;

    for (let i = 0; i < books.length; i++) {
        const bookTitle = books[i].getElementsByTagName("title")[0].textContent;
        const available = books[i].getElementsByTagName("available")[0].textContent;
        
        if (bookTitle === title && available === "Yes") {
            isAvailable = true;
            break;
        }
    }

    // If the book is available, proceed to borrow
    if (isAvailable) {
        window.location.href = `borrow.html?book=${title}`;
    } else {
        // If the book is not available, display an alert message
        alert("Sorry, this book is not available for borrowing.");
    }
}

