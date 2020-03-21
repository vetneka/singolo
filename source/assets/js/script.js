'use strict';

(function () {
  // Util module debounce
  (function () {
    let DEBOUNCE_INTERVAL = 500;

    window.debounce = function (callback) {
      let lastTimeout = null;

      return () => {
        let parameters = arguments;

        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }

        lastTimeout = window.setTimeout(() => {
          callback.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    };
  })();

  const getRandomNumber = (min, max) => {
    let result = min + Math.random() * (max - min + 1);
    return Math.floor(result);
  };

  const removeActiveState = (node, className, action) => {
    let nodeItems = node.querySelectorAll(`.${className}`);
    nodeItems.forEach(item => {
      item.classList.remove(`${className}--active`);

      if (action) {
        action(item);
      }
    });
  };

  const setActiveState = (node, className, action) => {
    node.classList.add(className);

    if (action) {
      action();
    }
  };

  // Main nav module
  (function () {
    const mainNav = document.querySelector('.main-nav');
    const mainNavLinks = mainNav.querySelectorAll('.main-nav__link');

    const mainSections = document.querySelectorAll('.main > section');

    window.addEventListener('load', () => {
      window.addEventListener('scroll', onWindowScroll);
      mainNav.addEventListener('click', mainNavClickHandler);
    });

    const mainNavClickHandler = (evt) => {
      if (evt.target.classList.contains('main-nav__link')) {
        removeActiveState(mainNav, 'main-nav__link');
        setActiveState(evt.target, 'main-nav__link--active');
      }
    };

    const onWindowScroll = window.debounce(() => {
      let currentScrollPosition = window.scrollY;

      mainSections.forEach(section => {
        if ((section.offsetTop) <= currentScrollPosition && 
            (section.offsetTop + section.offsetHeight) > currentScrollPosition) {
              history.replaceState("data", "title", location.origin + location.pathname + "#" + section.id);

              mainNavLinks.forEach(link => {
                link.classList.remove('main-nav__link--active');

                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                  link.classList.add('main-nav__link--active');
                }
              })
            }
        });
    });
  })();

  // Slider module
  (function () {
    const promoSlider = document.querySelector('.promo-slider');
    const promoSliderButtons = promoSlider.querySelector('.promo-slider__buttons');
    const promoSliderSlides = promoSlider.querySelectorAll('.promo-slider__slide');

    let currentSlide = 0;
    let isEnabled = true;

    const changeCurrentSlide = (n) => {
      currentSlide = (n + promoSliderSlides.length) % promoSliderSlides.length;
      changeSliderBackground(currentSlide);
    }

    const hideSlide = (direction) => {
      isEnabled = false;
      promoSliderSlides[currentSlide].classList.add(direction);
      promoSliderSlides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('promo-slider__slide--active', direction);
      });
    }

    const showSlide = (direction) => {
      promoSliderSlides[currentSlide].classList.add('next', direction);
      promoSliderSlides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('promo-slider__slide--active');
        isEnabled = true;
      });
    };

    const nextSlide = (n) => {
      hideSlide('to-left');
      changeCurrentSlide(n + 1);
      showSlide('from-right');
    };

    const previousSlide = (n) => {
      hideSlide('to-right');
      changeCurrentSlide(n - 1);
      showSlide('from-left');
    };

    const promoSliderButtonsHandler = (evt) => {
      if (evt.target.classList.contains('promo-slider__button--left') && isEnabled) {
        previousSlide(currentSlide);
      }
      
      if (evt.target.classList.contains('promo-slider__button--right') && isEnabled) {
        nextSlide(currentSlide);
      }
    };

    const changeSliderBackground = (currentSlide) => {
      promoSlider.className = 'promo-slider';
      promoSlider.classList.add(`promo-slider--bg-${currentSlide}`);
    };

    window.addEventListener('load', () => {
      promoSliderButtons.addEventListener('click', promoSliderButtonsHandler);
    });
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

    const portfolioWorksList = document.querySelector('.portfolio__works');
    const portfolioWorks = portfolioWorksList.querySelectorAll('.portfolio__work');
    const portfolioWorksLinks = portfolioWorksList.querySelectorAll('.portfolio__work-link');
    let portfolioWorksArray = Array.from(portfolioWorks);

    window.addEventListener('load', () => {
      tagsList.addEventListener('click', tagsClickHandler);
      portfolioWorksList.addEventListener('click', portfolioWorksClickHandler);
    });

    const tagsClickHandler = (evt) => {
      let currentButton = evt.target;

      if (currentButton.classList.contains('tags__button')) {
        removeActiveState(tagsList, 'tags__button', (button) => button.removeAttribute('disabled'));
        setActiveState(currentButton, 'tags__button--active', () => currentButton.setAttribute('disabled', ''));

        renderPortfolioWorks();
      }
    };

    const slidePortfolioWorks = () => {
      const SLICE_SIZE = 4;

      portfolioWorksArray =
        portfolioWorksArray
          .slice(portfolioWorksArray.length - SLICE_SIZE)
          .concat(portfolioWorksArray.slice(0, portfolioWorksArray.length - SLICE_SIZE));

      return portfolioWorksArray;
    };

    const renderPortfolioWorks = window.debounce(function () {
      portfolioWorksList.innerHTML = '';

      const portfolioFragment = document.createDocumentFragment();
      const portfolioWorks = slidePortfolioWorks();

      portfolioWorks.forEach((work) => {
        setAnimationDelay(work);
        portfolioFragment.appendChild(work);
      })

      portfolioWorksList.appendChild(portfolioFragment);
    });

    const setAnimationDelay = (work) => {
      work.style.animationDelay = `${getRandomNumber(1, 5) / 10}s`;
    };

    const portfolioWorksClickHandler = (evt) => {
      if (evt.target.classList.contains('portfolio__work-link')) {
        evt.preventDefault();
        toggleActiveState(evt);
      }
    };

    const toggleActiveState = (evt) => {
      portfolioWorksLinks.forEach(work => {
        if (!evt.target.classList.contains('portfolio__work-link--active')) {
          work.classList.remove('portfolio__work-link--active');
        }
      });
      evt.target.classList.toggle('portfolio__work-link--active');
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
      feedbackForm.reset();
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
