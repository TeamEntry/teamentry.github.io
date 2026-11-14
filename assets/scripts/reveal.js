const REVEAL_SELECTOR = "[data-reveal]";
const VISIBLE_CLASS = "is-visible";
const VIEWPORT_MARGIN = "0px 0px -10% 0px";

function showElement(element) {
  element.classList.add(VISIBLE_CLASS);
}

function handleIntersections(entries, observer) {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach(({ target }) => {
      showElement(target);
      observer.unobserve(target);
    });
}

export function observeReveals() {
  const elements = document.querySelectorAll(REVEAL_SELECTOR);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(showElement);
    return;
  }

  const observer = new IntersectionObserver(handleIntersections, { rootMargin: VIEWPORT_MARGIN });
  elements.forEach((element) => observer.observe(element));
}
