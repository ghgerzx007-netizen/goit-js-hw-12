import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a');
const gallery = document.querySelector(".gallery");
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more')
export function createGallery(images) {
  const markup = images
    .map(
      image => `
        <li>
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton(){
loadMore.classList.add('hidden')
}
export function hideLoadMoreButton(){
loadMore.classList.remove('hidden')
}