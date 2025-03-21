// Load quotes and show one random quote per day (based on the date)
fetch('quotes.json')
  .then(response => response.json())
  .then(quotes => {
    const today = new Date().toDateString(); 
    //const today = new Date(2025, 2, 3).toDateString(); // Simulates March 22, 2025

    // Simple hash function based on the current date
    const hash = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = hash % quotes.length;
    const quote = quotes[index];

    // Populate the content
    document.querySelector('.quote-content').textContent = quote.content;
    document.querySelector('.quote-author').textContent = `~ ${quote.author}`;
    document.querySelector('.quote-bio').textContent = `- ${quote.bio}`;

    const img = document.querySelector('.quote-image');
    img.src = quote.image;
    img.alt = quote.author;
  })
  .catch(error => {
    console.error('Failed to load quotes:', error);
  });