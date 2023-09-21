import axios from 'axios';
const baseUrl = 'https://en.wikipedia.org/w/api.php';

// Function to scrape Wikipedia page summary
export default async function scrapeWikipediaSummary(pageTitle) {
  try {
    const encodedTitle = encodeURIComponent(pageTitle);
    const response = await axios.get('http://localhost:5173/wiki-proxy', {
      params: {
        title: encodedTitle,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error scraping Wikipedia:', error.message);
    return null;
  }
}
