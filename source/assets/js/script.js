"use strict";

(function () {
  (function () {
    const mainNav = document.querySelector(".main-nav");
    const mainNavItems = mainNav.querySelectorAll(".main-nav__item");

    window.addEventListener("load", () => {
      mainNav.addEventListener("click", mainNavClickHandler);
    });

    const mainNavClickHandler = evt => {
      if (evt.target.classList.contains("main-nav__link")) {
        setInitialStateMainNav();
        removeAcitveClasses();
        setActiveClass(evt);
        scrollToAnchor(evt);
      }
    };

    const setInitialStateMainNav = () => {
      mainNavItems.forEach(item => {
        item.classList.remove("main-nav__item--active");

        let itemLink = item.querySelector(".main-nav__link");
        itemLink.setAttribute("href", `#${itemLink.textContent.toLowerCase()}`);
      });
    };

    const removeAcitveClasses = () => {
      mainNavItems.forEach(item => {
        item.classList.remove("main-nav__item--active");
      });
    };

    const setActiveClass = evt => {
      evt.target
        .closest(".main-nav__item")
        .classList.add("main-nav__item--active");
    };

    const scrollToAnchor = evt => {
      evt.preventDefault();

      let mainHeader = document.querySelector(".main-header");
      let mainHeaderHeight = mainHeader.getBoundingClientRect().height;

      let anchor = evt.target.hash;
      let elementToScroll = document.querySelector(anchor);
      let elementToScrollPositionY =
        elementToScroll.getBoundingClientRect().top + window.scrollY;

      location.hash = anchor;

      scrollTo(0, elementToScrollPositionY - mainHeaderHeight);
    };
  })();

  (function () {
    const promoSlider = document.querySelector('.promo-slider');
    const promoSliderButtons = promoSlider.querySelector('.promo-slider__buttons');
    const promoSliderSlides = promoSlider.querySelectorAll('.promo-slider__slide');

    window.addEventListener('load', () => {
      hideSlides();
      promoSliderButtons.addEventListener('click', promoSliderButtonsHandler);
    });

    const promoSliderButtonsHandler = (evt) => {
      if (evt.target.classList.contains('promo-slider__button')) {
        changeSlides(evt);
        changeSliderBackground();
      }
    };

    const hideSlides = () => {
      promoSliderSlides.forEach((slide, idx) => {
        if (idx > 0) {
          slide.classList.add('promo-slider__slide--hidden');
        }
      });
    };

    const changeSlides = (evt) => {
      let directionChange = evt.target;
      let currentActiveSlide;

      promoSliderSlides.forEach(slide => {
        if (!slide.classList.contains('promo-slider__slide--hidden')) {
          currentActiveSlide = slide;
        }
      });

      if (directionChange.classList.contains('promo-slider__button--right')) {
        let nextSlide = currentActiveSlide.nextElementSibling;

        if (nextSlide === null) {
          nextSlide = promoSliderSlides[0];
        }

        nextSlide.classList.remove('promo-slider__slide--hidden');
        currentActiveSlide.classList.add('promo-slider__slide--hidden');
      } else {
        let previousSlide = currentActiveSlide.previousElementSibling;

        if (previousSlide === null) {
          previousSlide = promoSliderSlides[promoSliderSlides.length - 1];
        }

        previousSlide.classList.remove('promo-slider__slide--hidden');
        currentActiveSlide.classList.add('promo-slider__slide--hidden');
      }
    };

    const changeSliderBackground = () => {
      promoSliderSlides.forEach(slide => {
        if (!slide.classList.contains('promo-slider__slide--hidden')) {
          let currentSlideBackground = window.getComputedStyle(slide).backgroundColor;
          promoSlider.style.backgroundColor = currentSlideBackground;
        }
      });
    };
  })();
})();

