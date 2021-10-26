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
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const url = event.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${url}" width="800" height="600">`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscapeClick);
        function onEscapeClick(e) {
          if (e.code === "Escape") {
            instance.close();
            window.removeEventListener("keydown", onEscapeClick);
          }
          console.log("клик на кнопку:", e.code);
        }

        instance.element().querySelector("img").onclick = instance.close;
      },
    }
  );

  instance.show();
}
