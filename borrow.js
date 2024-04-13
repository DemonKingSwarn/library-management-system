// Function to display selected books on borrow page
function displaySelectedBooks() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookTitle = urlParams.get('book');
    
    const borrowedBooks = [];
    const currentDate = new Date();
    const returnDate = new Date(currentDate.setDate(currentDate.getDate() + 14)); // Set return date to 14 days from current date
    const formattedReturnDate = formatDate(returnDate);

    borrowedBooks.push({ title: bookTitle, returnDate: formattedReturnDate });
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

    let borrowedBooksHTML = '<h2>Borrowed Books</h2>';
    borrowedBooks.forEach(book => {
        borrowedBooksHTML += `<div>${book.title} - Return Date: ${book.returnDate}</div>`;
    });

    document.getElementById('borrowedList').innerHTML = borrowedBooksHTML;
}

// Function to format date as YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
}

// Function to return to the main page
function returnToMain() {
    window.location.href = 'index.html';
}

// Call displaySelectedBooks function when page loads
displaySelectedBooks();

