const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-navigation");
const themeToggle = document.querySelector(".theme-toggle");
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

if (themeToggle) {
  const savedTheme = localStorage.getItem("ivannac-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  }

  const updateThemeToggle = (darkModeEnabled) => {
    themeToggle.setAttribute("aria-pressed", String(darkModeEnabled));
    themeToggle.textContent = darkModeEnabled ? "Modo claro" : "Modo oscuro";
  };

  updateThemeToggle(isDark);

  themeToggle.addEventListener("click", () => {
    const enableDarkMode = themeToggle.getAttribute("aria-pressed") !== "true";
    const theme = enableDarkMode ? "dark" : "light";

    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ivannac-theme", theme);
    updateThemeToggle(enableDarkMode);
  });
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
