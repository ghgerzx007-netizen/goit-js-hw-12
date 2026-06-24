import {createGallery, clearGallery, showLoader,hideLoader, hideLoadMoreButton, showLoadMoreButton,} from './js/render-functions.js';
import {getImagesByQuery} from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const loadMoreBtn = document.querySelector(".load-more")



 let currentQuery = "";
let page = 1;
const perPage = 15;
let totalHits = 0;

hideLoadMoreButton();
const form = document.querySelector(".form")
form.addEventListener('submit', async e =>{
    e.preventDefault();
    page = 1;
    hideLoadMoreButton();
    
  const input = document.querySelector('[name="search-text"]')
  hideLoadMoreButton(); 
  if (input.value.trim() === "") {
        return;
        
  } 
  currentQuery = input.value.trim()
clearGallery();
showLoader();



try {
const data = await getImagesByQuery(currentQuery,page,perPage);
  
    const hits = data.hits;
    totalHits = data.totalHits;
    if (hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!'
      });
      return;
    }
      createGallery(hits);

    const maxPage = Math.ceil(totalHits / perPage);

    if (page < maxPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
}

catch (error) {
    
    iziToast.error({
      message: error.message || 'Something went wrong. Please try again.'
    });
}
finally {
    hideLoader();
    input.value = '';
  }
});
   

  loadMoreBtn.addEventListener("click", async e =>{
    e.preventDefault();
    page += 1;
    showLoader();
    try {
const data = await getImagesByQuery(currentQuery,page,perPage);
     totalHits = data.totalHits;
     const maxPage = Math.ceil(totalHits / perPage);
    const hits = data.hits;
createGallery(hits);
const firstCard = document.querySelector('.gallery li');
if (firstCard) {
  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}
    if(page >= maxPage){
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results."
      });
      
      return;
    }else{
      showLoadMoreButton();
    }
    }

catch (error) {
    
    iziToast.error({
      message: error.message || 'Something went wrong. Please try again.'
    });
}
finally {
    hideLoader();

  }
  });






