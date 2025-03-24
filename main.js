let quote = null;

fetch('quotes.json')
  .then(response => response.json())
  .then(quotes => {
    const today = new Date().toDateString();
    //const today = new Date(2025, 2, 26).toDateString(); // Simulated date

    const displayDate = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    document.querySelector('.quote-date').textContent = displayDate;

    const hash = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = hash % quotes.length;
    quote = quotes[index];

    document.querySelector('.quote-content').textContent = quote.content;
    document.querySelector('.quote-author').textContent = quote.author;
    document.querySelector('.quote-date').textContent = displayDate;
    document.querySelector('.quote-bio').textContent = `- ${quote.bio}`;
    document.querySelector('.quote-art-info').textContent = quote.artInfo || '';
    document.querySelector('.quote-medium').textContent = `Medium: ${quote.medium || 'Unknown'}`;

    // New line to show the piece name and year
    document.querySelector('.quote-piece-year').textContent =
        quote.piece && quote.year
            ? `“${quote.piece}” (${quote.year})`
             : quote.piece
            ? `“${quote.piece}”`
            : '';
    const img = document.querySelector('.quote-image');
    img.src = quote.image;
    img.alt = quote.author;

    // New Fields
    document.querySelector('.quote-medium').textContent = `Medium: ${quote.medium || 'Unknown'}`;
    document.querySelector('.quote-art-info').textContent = quote.artInfo || '';
  })
  .catch(error => {
    console.error('Failed to load quotes:', error);
  });

const shareBtn = document.querySelector('.share-quote-btn');
const shareStatus = document.querySelector('.share-status');

shareBtn.addEventListener('click', () => {
  if (!quote) return;

  const text = `"${quote.content}" — ${quote.author}`;
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