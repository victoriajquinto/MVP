import axios from 'axios';

export default async function extractNamesFromHTML(name) {

  const wikipediaURL = `https://en.wikipedia.org/wiki/Victoria_(name)#Given_name`;

  try {
    const response = await await axios.get('http://localhost:3000/wiki-proxy', {
      params: {
        title: encodedTitle,
      }});
    const html = response.data;

    // Regular expression to match the bulleted list
    const regex = /<ul>.*?<\/ul>/gs;
    const match = html.match(regex);

    if (!match) {
      console.error('Given names section not found on the page.');
      return [];
    }

    // Extract the list items from the matched HTML
    const listItemsRegex = /<li>(.*?)<\/li>/gs;
    const listItems = match[0].match(listItemsRegex);

    if (!listItems) {
      console.error('No list items found in the given names section.');
      return [];
    }

    // Extract and clean the names from the list items
    const names = listItems.map((item) => item.replace(/<[^>]+>/g, ''));

    return names;
  } catch (error) {
    console.error('Error fetching the Wikipedia page:', error.message);
    return [];
  }
}
}
// console.error(`Given names section not found on the page ${html}.`);

// https://en.wikipedia.org/wiki/Victoria_(name)#Given_name
// https://en.wikipedia.org/wiki/Victoria_(name)#Given_name

  // const $ = cheerio.load(html);
  // console.log('all content', $.html());

  // // Find the list of names under the "Given names" section
  // const namesList = [];
  // const givenNameSection = $('#Given_name');
  // console.log("givenNameSection", givenNameSection);

  // if (!givenNameSection.length) {
  //   console.error(`Given names section not found on the page ${html}.`);
  //   return [];
  // }

  // // Traverse the <ul> element containing the names
  // const namesListElement = givenNameSection.next('ul');
  // if (namesListElement.length) {
  //   namesListElement.find('li').each((index, element) => {
  //     const name = $(element).text().trim();
  //     namesList.push(name);
  //   });
  // } else {
  //   console.error('Names list not found under the "Given names" section.');
  // }

  // return namesList;
