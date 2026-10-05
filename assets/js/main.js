const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");
const currentYear = document.querySelector("#current-year");
const artCards = document.querySelectorAll(".art-card");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.removeAttribute("src");
  document.body.style.overflow = "";
};

artCards.forEach((artCard) => {
  artCard.addEventListener("click", (event) => {
    const image = artCard.querySelector("img");

    if (!image || !lightbox || !lightboxImage) {
      return;
    }

    event.preventDefault();
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
