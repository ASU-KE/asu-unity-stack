/* eslint-disable no-unused-expressions */
// @ts-check
import Glide from "@glidejs/glide";

/**
 * Compute hoa many items will be visible on different viewport
 * @param {number} perView
 * @returns {object}
 */
function computeItemPerView(perView) {
  let perViewSm;
  let perViewMd;
  let perViewLg;
  switch (perView) {
    case 3:
      // Values used in config call.
      perViewSm = 1;
      perViewMd = 2;
      perViewLg = 3;
      break;
    case 2:
      // Values used in config call.
      perViewSm = 1;
      perViewMd = 2;
      perViewLg = 2;
      break;
    case 1:
    default:
      // Values used in config call.
      perViewSm = 1;
      perViewMd = 1;
      perViewLg = 1;
  }

  return {
    perViewSm,
    perViewMd,
    perViewLg,
  };
}

/**
 *
 * @param {number} perView
 * @param {boolean} isFullWidth
 * @param {boolean} isDraggable
 *
 * @returns {Glide.Options}
 */
function buildConfig(perView = 1, isFullWidth, hasPeek = true, isDraggable) {
  // Set a perView value for each breakpoint so we adapt down appropriately.
  const { perViewSm, perViewMd, perViewLg } = computeItemPerView(perView);

  // Set GlideJS config options, per https://glidejs.com/docs/options/

  const gap = hasPeek ? 24 : 0;
  const smallPeek = hasPeek ? { before: 48, after: 48 } : 0;
  const largePeek = hasPeek ? { before: 124, after: 124 } : 0;

  return {
    type: "slider", // No wrap-around.
    focusAt: 0,
    bound: true, // Only if type slider with focusAt 0
    rewind: false, // Only if type slider
    gap, // Space between slides... may be impacted by viewport size.
    // `keyboard` Left/Right arrow key support for slides - true is default.
    // Is not fully Accessible, on keydown allcarousels move simultaneously
    // A custome keyboard handler is implemented
    keyboard: false,
    startAt: 0,
    swipeThreshold: 80, // Distance required for swipe to change slide.
    dragThreshold: isDraggable ? 120 : false, // Distance for mouse drag to change slide.
    perTouch: 1, // Number of slides that can be moved per each swipe/drag.
    perView: perViewLg, // Can be overwritten at breakpoints
    peek: largePeek, // Can be overwritten at breakpoints
    // if isFullWidth = true, then we have only 1 image per view which takes the full width.
    // no need for breakpoints
    breakpoints: isFullWidth
      ? null
      : {
          576: {
            // BS4 sm
            perView: perViewSm,
            peek: smallPeek,
          },
          768: {
            // BS4 md
            perView: perViewMd,
            peek: smallPeek,
          },
          992: {
            // BS4 lg
            perView: perViewLg,
            peek: smallPeek,
          },
          1260: {
            // BS4 xl
            perView: perViewLg,
            peek: smallPeek,
          },
          1400: {
            perView: perViewLg,
            peek: largePeek,
          },
          1920: {
            perView: perViewLg,
            peek: largePeek,
          },
        },
  };
}

/**
 * This function clears and set class names to show/hide
 * gradients when at the start, middle or end of a slider.
 * @param {Element} gliderElement
 * @param {number} currentIndex
 * @param {number} buttonCount
 * @returns {void}
 */
function setNavButtonGradient(gliderElement, currentIndex, buttonCount) {
  const arrowPrev = gliderElement.querySelector(`.glide__arrow--prev`);
  const arrowNext = gliderElement.querySelector(`.glide__arrow--next`);
  const gliderTrack = gliderElement.querySelector(".glide__track");
  const imageGalleryNavigation = gliderElement.querySelector(
    ".image-navigator-images"
  );

  if (!(arrowPrev || arrowNext)) return; // necessary. it breaks when the nav button are hidden

  // Gradient-triggering classes.
  const gradientClasses = ["slider-start", "slider-mid", "slider-end"];
  const cssDisabledClass = "glide__arrow--disabled";

  gliderTrack?.classList.remove(...gradientClasses);
  imageGalleryNavigation?.classList.remove(...gradientClasses);

  // Set/clear classes for gradients.
  if (currentIndex === 0) {
    // START SLIDE.
    // Gradient for start.
    gliderTrack?.classList.add("slider-start");
    imageGalleryNavigation?.classList.add("slider-start");
    // Enable/disable prev/next styles. Glide takes care of actual disable.
    arrowPrev?.classList.add(cssDisabledClass);
    arrowPrev?.setAttribute("aria-disabled", "true");
    arrowNext?.classList.remove(cssDisabledClass);
    arrowNext?.setAttribute("aria-disabled", "false");
  } else if (currentIndex >= buttonCount - 1) {
    // LAST SLIDE.
    // Gradient for end.
    gliderTrack?.classList.add("slider-end");
    imageGalleryNavigation?.classList.add("slider-end");
    // Enable/disable prev/next styles. Glide takes care of actual disable.
    arrowPrev?.classList.remove(cssDisabledClass);
    arrowPrev?.setAttribute("aria-disabled", "false");
    arrowNext?.classList.add(cssDisabledClass);
    arrowNext?.setAttribute("aria-disabled", "true");
  } else {
    // MIDDLE SLIDES.
    // Gradient for middle.
    gliderTrack?.classList.add("slider-mid");
    imageGalleryNavigation?.classList.add("slider-mid");
    // Enable/disable prev/next styles. Glide takes care of actual disable.
    arrowPrev?.classList.remove(cssDisabledClass);
    arrowNext?.classList.remove(cssDisabledClass);
    arrowPrev?.setAttribute("aria-disabled", "false");
    arrowNext?.setAttribute("aria-disabled", "false");
  }
}

/**
 * Update ARIA attributes on slides that are not currently visible.
 *
 * When a slide is not visible, we set aria-hidden to true and tabindex to
 * -1 to remove it from the accessibility tree. When a slide is visible, we
 * set aria-hidden to false and remove tabindex to make it accessible.
 *
 * @param {HTMLElement} gliderElement - The element that contains the slides.
 * @param {number} currentIndex - The index of the currently active slide.
 * @param {number} perView - The number of slides that are visible at a time.
 */
function updateNonVisibleSlides(gliderElement, currentIndex, perView) {
  const slides = gliderElement.querySelectorAll(".glide__slide");
  // Get first visible slide
  const startVisibleIndex = currentIndex;
  // Get last visible slide
  const endVisibleIndex = Math.min(
    slides.length - 1,
    currentIndex + perView - 1
  );

  slides.forEach((slide, index) => {
    if (index < startVisibleIndex || index > endVisibleIndex) {
      // Slide is not visible
      slide.setAttribute("aria-hidden", "true");
      slide.setAttribute("tabindex", "-1");
      slide.setAttribute("inert", "");
    } else {
      // Slide is visible
      slide.setAttribute("aria-hidden", "false");
      slide.removeAttribute("tabindex");
      slide.removeAttribute("inert");
    }
  });
}

/**
 *
 * @param {{
 *  instanceName: string
 *  perView: number
 *  buttonCount: number
 *  isFullWidth?: boolean
 *  onItemClick?: (index: number) =>  void
 *  hasPeek?: boolean
 *  isDraggable?: boolean
 * }} props
 *
 * @returns {Glide.Static}
 */
function setupCaroarousel({
  instanceName,
  perView,
  buttonCount,
  isFullWidth = false,
  onItemClick,
  hasPeek = true,
  isDraggable,
}) {
  const sliderConfig = buildConfig(perView, isFullWidth, hasPeek, isDraggable);
  // Load up a new glideJS slider, but don't mount until we have event
  // listener (https://glidejs.com/docs/events/) handlers defined and configs
  // all mustered.

  const slider = new Glide(`#${instanceName}`, sliderConfig);

  // Implement glidejs event listeners.

  // Attatch event listener and instruct slide to go left and right
  /** @type {HTMLElement} */
  let gliderElement = document.querySelector(`#${instanceName}`);
  gliderElement.addEventListener("keyup", event => {
    /** @type {KeyboardEventInit} */
    const e = event;
    if (e.keyCode === 39) {
      slider.go(">");
    } else if (e.keyCode === 37) {
      slider.go("<");
    } else if (e.keyCode === 13) {
      // @ts-ignore
      slider.go(document.activeElement.dataset.glideDir);
    }
  });

  // On build.before event...
  slider.on("build.before", () => {
    // Set .slider-start for starting gradient styles.
    /** @type {HTMLElement} */
    gliderElement = document.querySelector(`#${instanceName}`);
    if (!gliderElement) return; // necessary. it breaks on resize
    gliderElement.classList.add("slider-start");
  });

  // On Move event...
  slider.on("move", () => {
    // Get glider top level element.
    gliderElement = document.querySelector(`#${instanceName}`);
    if (!gliderElement) return; // necessary. it breaks on resize

    // @ts-ignore
    const currentIndex = slider.index;
    updateNonVisibleSlides(gliderElement, currentIndex, perView);
    /** @type {HTMLElement} */
    const imageGalleryNav = gliderElement.querySelector(".navigation-slider");
    const imageNav = gliderElement.querySelector(".image-navigator-images");
    if (imageGalleryNav && imageNav) {
      const images = imageGalleryNav.querySelectorAll(
        ".bullet-image-container"
      );
      const fullNavWidth = imageGalleryNav.clientWidth;
      const viewPadding = 82;

      const currentSlide = images[currentIndex];
      const imageNavLeft = imageNav.getBoundingClientRect().x;

      const currentLeft =
        imageGalleryNav.getBoundingClientRect().x - imageNavLeft;
      const currentSlideLeft =
        currentSlide.getBoundingClientRect().x - imageNavLeft;
      const currentSlideRight =
        currentSlide.getBoundingClientRect().x +
        currentSlide.getBoundingClientRect().width -
        imageNavLeft;

      if (currentIndex === 0 || currentSlideLeft <= 0 + viewPadding) {
        imageGalleryNav.style.left = `${
          currentLeft - currentSlideLeft + viewPadding
        }px`;
      } else if (currentSlideRight >= fullNavWidth - viewPadding) {
        const outsideAmount = currentSlideRight - fullNavWidth;
        imageGalleryNav.style.left = `${
          currentLeft - outsideAmount - viewPadding
        }px`;
      }
    }

    // We use event listeners to clear and set class names to show/hide
    // gradients when at the start, middle or end of a slider.
    setNavButtonGradient(gliderElement, currentIndex, buttonCount);
    // set the current index
    gliderElement.setAttribute("data-current-index", currentIndex);
    onItemClick && onItemClick(currentIndex);
  });

  // On Resize event...
  /* TODO Leverage this event to recalculate and updating number of bullets.
     * See notes about this above.
    slider.on("resize", function () {
      // Get Original viewport width
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      console.log("VW on resize", vw);
      if (vw < 768) {
        // Value for sm breakpoint
        console.log("VW sm", vw);
      } else if (vw < 992) {
        // Value for md breakpoint
        console.log("VW md", vw);
      } else {
        // Value for lg breakpoint
        console.log("VW lg", vw);
      }
    });
    */

  slider.mount();
  return slider;
}

export { setupCaroarousel };
