import axios from 'axios';
import cheerio from 'cheerio';

// Function to fetch and scrape the Wikipedia page
const findWikiTop = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract the top section content
    const topSection = $('body > #content > #bodyContent > #mw-content-text > .mw-parser-output > p')
      .first()
      .text();

    return topSection;
  } catch (error) {
    console.error('Error scraping Wikipedia:', error);
    return null;
  }
};

export default findWikiTop;