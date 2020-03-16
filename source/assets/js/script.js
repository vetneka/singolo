"use strict";

(function () {
  // Main nav module
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

  // Slider module
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

  // Slider phone module
  (function () {
    const promoSlider = document.querySelector('.promo-slider');

    window.addEventListener('load', () => {
      slidePhoneHandler();
    });

    const slidePhoneHandler = () => {
      promoSlider.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('slide-phone__button')) {
          let slidePhoneButton = evt.target;
          let slidePhone = slidePhoneButton.closest('.slide-phone');
          let slidePhoneScreen = slidePhone.querySelector('.slide-phone__screen');

          slidePhoneScreen.classList.toggle('slide-phone__screen--hidden');
        }
      });
    };
  })();

  // Portfolio module
  (function () {
    const tagsList = document.querySelector('.tags');
    const tags = tagsList.querySelectorAll('.tags__item');

    const portfolioWorksList = document.querySelector('.portfolio__works');
    const portfolioWorks = portfolioWorksList.querySelectorAll('.portfolio__work');
    let portfolioWorksArray = Array.from(portfolioWorks);

    window.addEventListener('load', () => {
      tagsList.addEventListener('click', tagsClickHandler);
      portfolioWorksList.addEventListener('click', portfolioWorksClickHandler);
    });

    const tagsClickHandler = (evt) => {
      if (evt.target.classList.contains('tags__button')) {
        deactivateTags(evt);
        setActiveClass(evt);

        resetPortfolioWorks();
        renderPortfolioWorks(slidePortfolioWorks());
      }
    };

    const deactivateTags = (evt) => {
      tags.forEach(tag => {
        if (tag.classList.contains('tags__item--active')) {
          const tagButton = tag.querySelector('.tags__button');

          tag.classList.remove('tags__item--active');
          tagButton.removeAttribute('disabled');
        }
      });
    };

    const setActiveClass = (evt) => {
      const activeTagButton = evt.target;
      const activeTagItem = activeTagButton.closest('.tags__item');

      activeTagItem.classList.add('tags__item--active');
      activeTagButton.setAttribute('disabled', '');
    };

    const slidePortfolioWorks = () => {
      const SLICE_SIZE = 4;

      portfolioWorksArray =
        portfolioWorksArray
          .slice(portfolioWorksArray.length - SLICE_SIZE)
          .concat(portfolioWorksArray.slice(0, portfolioWorksArray.length - SLICE_SIZE));

      return portfolioWorksArray;
    };

    const renderPortfolioWorks = (portfolioWorks) => {
      const portfolioFragment = document.createDocumentFragment();

      portfolioWorks.forEach((work) => {
        setAnimationWork(work);
        portfolioFragment.appendChild(work);
      })

      portfolioWorksList.appendChild(portfolioFragment);
    };

    const resetPortfolioWorks = () => {
      portfolioWorksList.innerHTML = '';
    };

    const setAnimationWork = (work) => {
      work.style.animationDelay = `${getRandomNumber(1, 9) / 10}s`;
    };

    const getRandomNumber = (min, max) => {
      let result = min + Math.random() * (max - min + 1);
      return Math.floor(result);
    };

    const portfolioWorksClickHandler = (evt) => {
      if (evt.target.classList.contains('portfolio__work-link')) {
        evt.preventDefault();

        deactivateWorks(evt);
        setActiveWorkClass(evt.target);
      }
    };

    const deactivateWorks = (evt) => {
      const elementParent = evt.target.closest('.portfolio__work');

      portfolioWorks.forEach(work => {
        if (!elementParent.classList.contains('portfolio__work--active')) {
          work.classList.remove('portfolio__work--active');
        }
      });
    };

    const setActiveWorkClass = (element) => {
      const elementParent = element.closest('.portfolio__work')
      elementParent.classList.toggle('portfolio__work--active');
    };
  })();

  // Get a quote module
  (function () {
    const feedbackModalTemplate = document.querySelector('#feedback-modal').content;
    const feedbackForm  = document.querySelector('.feedback-form');
    const feedbackFormSubject  = feedbackForm.querySelector('#user-subject');
    const feedbackFormDescription  = feedbackForm.querySelector('#user-message');

    window.addEventListener('load', () => {
      feedbackForm.addEventListener('submit', formSubmitHandler);
    });

    const formSubmitHandler = (evt) => {
      evt.preventDefault();
      const feedbackModal = createFeedbackModal(collectFormData(feedbackForm));
      document.body.appendChild(feedbackModal);
    };

    const createFeedbackModal = (formData) => {
      const feedbackModal = feedbackModalTemplate.cloneNode(true);
      const overlay = feedbackModal.querySelector('.overlay');

      const feedbackModalTheme = feedbackModal.querySelector('.modal__paragraph--theme .modal__paragraph-text');
      const feedbackModalDescription = feedbackModal.querySelector('.modal__paragraph--description .modal__paragraph-text');
      const feedbackModalButton = feedbackModal.querySelector('.modal__button');

      const modalCloseButtonHandler = (evt) => {
        const modalOverlay = evt.target.closest('.overlay');
        modalOverlay.remove();
        feedbackModalButton.removeEventListener('click', modalCloseButtonHandler);
      };

      const modalCloseOverlayHandler = (evt) => {
        if (evt.target.classList.contains('overlay')) {
          evt.target.remove();
          feedbackModalButton.removeEventListener('click', modalCloseOverlayHandler);
        }
      };

      feedbackModalButton.addEventListener('click', modalCloseButtonHandler);
      overlay.addEventListener('click', modalCloseOverlayHandler);

      feedbackModalTheme.textContent = formData['user-subject'];
      feedbackModalDescription.textContent = formData['user-message'];

      if (feedbackModalTheme.textContent === feedbackFormSubject.dataset.defaultValue) {
        feedbackModalTheme.previousElementSibling.innerHTML = '';
      }

      if (feedbackModalDescription.textContent === feedbackFormDescription.dataset.defaultValue) {
        feedbackModalDescription.previousElementSibling.innerHTML = '';
      }

      return feedbackModal;
    }

    const collectFormData = (form) => {
      const formData = {};

      for (let element of form.elements) {
        if (element.value === '') {
          if (element.dataset.defaultValue) {
            formData[element.id] = element.dataset.defaultValue;
          }
        } else {
          formData[element.id] = element.value;
        }
      }

      return formData;
    }
  })();
})();
