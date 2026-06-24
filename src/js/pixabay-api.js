 import axios from 'axios';

 
 export async function getImagesByQuery(query, page, perPage = 15) {
  if(perPage < 15) perPage = 15;
  const res = await axios.get('https://pixabay.com/api/', {
    params: {
      q: query,
      page: page,
      per_page: perPage,
      key: '56332607-bb747eac8cf621789c682c14a',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return res.data;
}