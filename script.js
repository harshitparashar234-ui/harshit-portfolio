(function () {
  const body = document.body;
  const nav = document.getElementById("site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const year = document.getElementById("year");
  const profilePhoto = document.querySelector(".profile-photo");
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  const sections = document.querySelectorAll("main section[id]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (profilePhoto) {
    profilePhoto.addEventListener("error", function handleMissingPhoto() {
      profilePhoto.src = "images/profile-placeholder.svg";
      profilePhoto.alt = "Profile photo placeholder for Harshit Parashar. Save your photo as images/profile.jpg.";
      profilePhoto.removeEventListener("error", handleMissingPhoto);
    });
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem("theme", nextTheme);
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      body.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "🌙";
      if (themeToggle) themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  function setActiveLink() {
    const scrollPos = window.scrollY + 90;
    let current = "home";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
})();
