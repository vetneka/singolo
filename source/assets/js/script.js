"use strict";

(function() {
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

