import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const imagesMarkup = createGalleryImagesMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkup);

galleryContainer.addEventListener("click", onImageClick);

function createGalleryImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>
        `;
    })
    .join("");
}

function onImageClick(event) {
  event.preventDefault();
  const url = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${url}" width="800" height="600">`,
    {
      onShow: (instance) => {
        instance.element().querySelector("img").onclick = instance.close;
      },
    }
  );

  instance.show();
}
