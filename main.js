// ===============================
// Art Quote of the Day Script
// ===============================

// Holds the selected quote object (used globally for sharing)
let quote = null;

// ===============================
// Fetch Quotes from JSON File
// ===============================
fetch('quotes.json')
  .then(response => response.json())
  .then(quotes => {
    // Get the current date as a unique string
    const today = new Date().toDateString();

    // Format the date for display (e.g., "Monday, March 25, 2025")
    const displayDate = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Inject the formatted date into the DOM
    document.querySelector('.quote-date').textContent = displayDate;

    // Create a "pseudo-random" hash based on the date
    // Ensures the same quote is shown on the same day
    const hash = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = hash % quotes.length;

    // Select the quote for today
    quote = quotes[index];

    // ===============================
    // Populate Page with Quote Data
    // ===============================

    // Set main quote text
    document.querySelector('.quote-content').textContent = quote.content;

    // Set author name
    document.querySelector('.quote-author').textContent = quote.author;

    // Set author bio
    document.querySelector('.quote-bio').textContent = `- ${quote.bio}`;

    // Set additional artwork info (if available)
    document.querySelector('.quote-art-info').textContent = quote.artInfo || '';

    // Set medium label (e.g., Painting, Sculpture, etc.)
    document.querySelector('.quote-medium').textContent = `Medium: ${quote.medium || 'Unknown'}`;

    // Set artwork title and year (if both exist)
    document.querySelector('.quote-piece-year').textContent =
        quote.piece && quote.year
            ? `“${quote.piece}” (${quote.year})`
            : quote.piece
            ? `“${quote.piece}”`
            : '';

    // Set image source and alt tag
    const img = document.querySelector('.quote-image');
    img.src = quote.image;
    img.alt = quote.author;

    // (Redundant but safe) Re-set fields in case quotes were incomplete
    document.querySelector('.quote-medium').textContent = `Medium: ${quote.medium || 'Unknown'}`;
    document.querySelector('.quote-art-info').textContent = quote.artInfo || '';
  })
  .catch(error => {
    // Log an error if quotes.json fails to load
    console.error('Failed to load quotes:', error);
  });


// ===============================
// Share Button Functionality
// ===============================

// Get DOM references
const shareBtn = document.querySelector('.share-quote-btn');
const shareStatus = document.querySelector('.share-status');

// Add click event for the share button
shareBtn.addEventListener('click', () => {
  // Prevent action if quote hasn't loaded yet
  if (!quote) return;

  // Format quote for sharing
  const text = `"${quote.content}" — ${quote.author}`;

  // Try to use Web Share API if available (mobile-friendly)
  if (navigator.share) {
    navigator.share({
      title: 'Art Quote of the Day',
      text: text,
      url: window.location.href
    }).then(() => {
      shareStatus.textContent = 'Thanks for sharing!';
    }).catch(err => {
      shareStatus.textContent = 'Sharing canceled.';
    });

  // Fallback: copy quote to clipboard
  } else {
    navigator.clipboard.writeText(text)
      .then(() => {
        shareStatus.textContent = 'Quote copied to clipboard!';
      })
      .catch(() => {
        shareStatus.textContent = 'Failed to copy quote.';
      });
  }
});