// Smooth in-page navigation between sections (CSS scroll-behavior handles the
// motion; this only moves focus so keyboard/screen-reader users land on the
// target section after a click).
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.setAttribute("tabindex", "-1");
  });
});

// --- Mobile bottom CTA: mirrors the current section --------------------
// Tracks which section the visitor is mostly looking at and shows the
// matching link in the persistent bottom bar. Harmless on desktop: the
// bar stays display:none there regardless of this running.
const ctaBar = document.querySelector(".mobile-cta");
if (ctaBar) {
  const sections = document.querySelectorAll("main > section[id]");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ctaBar.dataset.current = entry.target.id;
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// --- Photo gallery dot pagers -------------------------------------------
// Each swipeable gallery gets its dots synced to whichever slide is
// currently most in view.
document.querySelectorAll(".montage__images, .usage__images, .specs__images").forEach((gallery) => {
  const slides = gallery.querySelectorAll(".crop");
  const dots = gallery.querySelectorAll(".dots .dot");
  if (!slides.length || !dots.length) return;
  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.6) {
          const index = Array.from(slides).indexOf(entry.target);
          dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
        }
      });
    },
    { root: gallery, threshold: [0.6] }
  );
  slides.forEach((slide) => galleryObserver.observe(slide));
});

// --- Scroll reveal --------------------------------------------------------
// One-shot fade/rise for section text blocks as they enter view.
const revealTargets = document.querySelectorAll(".reveal");
if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));
}
