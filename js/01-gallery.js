import { galleryItems } from "./gallery-items.js";
// Change code below this line

// const basicLightbox = require("basiclightbox");

// import * as basicLightbox from "basiclightbox";

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
  console.log("клик по картинке");
  event.preventDefault();
  const image = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${image}" width="800" height="600">`,
    {
      onShow: (instance) => {
        instance.element().querySelector("img").onclick = instance.close;
      },
    }
  );
  console.log(image);

  instance.show();
}
