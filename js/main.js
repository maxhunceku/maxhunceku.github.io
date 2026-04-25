(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navBackdrop = document.querySelector(".nav-backdrop");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var feedback = document.getElementById("form-feedback");
  var footerForm = document.getElementById("footer-contact-form");
  var footerFeedback = document.getElementById("footer-form-feedback");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setNavOpen(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (navBackdrop) {
      navBackdrop.hidden = !open;
      navBackdrop.classList.toggle("is-visible", open);
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!open);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", function () {
        setNavOpen(false);
      });
    }

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  var heroReveal = document.querySelector(".hero-content.reveal");

  if (heroReveal) {
    requestAnimationFrame(function () {
      heroReveal.classList.add("is-visible");
    });
  }

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealEls.forEach(function (el) {
      if (el === heroReveal) return;
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  function bindContactForm(formElement, feedbackElement) {
    if (!formElement || !feedbackElement) return;

    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
      feedbackElement.textContent = "";
      feedbackElement.classList.remove("is-success", "is-error");

      var nom = formElement.nom && formElement.nom.value.trim();
      var email = formElement.email && formElement.email.value.trim();
      var message = formElement.message && formElement.message.value.trim();

      if (!nom || !email || !message) {
        feedbackElement.textContent = "Veuillez remplir tous les champs.";
        feedbackElement.classList.add("is-error");
        return;
      }

      var subject = encodeURIComponent("Contact site GBR GROUP BV — " + nom);
      var body = encodeURIComponent(
        "Nom: " + nom + "\nEmail: " + email + "\n\nMessage:\n" + message
      );
      var mailto =
        "mailto:info@gbrgroupbv.com?subject=" + subject + "&body=" + body;

      window.location.href = mailto;

      feedbackElement.textContent =
        "Merci ! Votre client de messagerie devrait s’ouvrir. Si ce n’est pas le cas, écrivez-nous à info@gbrgroupbv.com.";
      feedbackElement.classList.add("is-success");
      formElement.reset();
    });
  }

  bindContactForm(form, feedback);
  bindContactForm(footerForm, footerFeedback);
})();
