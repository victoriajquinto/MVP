// import axios from 'axios';

// export default async function getWikipediaUrl(firstName) {
//   const searchQuery = `${firstName} (name)`;
//   const apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
//     searchQuery
//   )}&format=json`;

//   try {
//     const response = await axios.get(apiUrl);
//     const urls = response.data;
//     if (urls && urls.length > 0) {
//       return urls[0];
//     } else {
//       throw new Error('No Wikipedia page found for the given name.');
//     }
//   } catch (error) {
//     throw new Error('Error fetching data from Wikipedia API.');
//   }
// }



