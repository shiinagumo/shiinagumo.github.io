// ========================
// Fade In Animation
// ========================

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });
    },
    {
        threshold: 0.1
    }
);

fadeElements.forEach((element) => {
    observer.observe(element);
});


// ========================
// Album Lightbox
// ========================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeButton = document.getElementById("close-lightbox");

if (lightbox) {

    const images = document.querySelectorAll(".gallery-image");

    images.forEach((image) => {

        image.addEventListener("click", () => {

            lightbox.style.display = "flex";

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            document.body.style.overflow = "hidden";
        });

    });

    closeButton.addEventListener("click", () => {

        lightbox.style.display = "none";

        document.body.style.overflow = "auto";
    });

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";
        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            lightbox.style.display = "none";

            document.body.style.overflow = "auto";
        }

    });

}