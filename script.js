"use strict";


/* =========================================================
   HEADER NAVIGATION
   ========================================================= */

class MyHeader extends HTMLElement
{
  connectedCallback()
  {
    this.innerHTML = `
      <header id="header">
        <nav
          class="navbar navbar-expand-lg py-0 mx-0 my-0"
          aria-label="Primary navigation"
        >

          <a
            href="./"
            class="navbar-brand"
            aria-current="page"
          >
            <h1 class="text-start" aria-hidden="true">
              Dyati
            </h1>
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#toggleMobileMenu"
            aria-controls="toggleMobileMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse"
            id="toggleMobileMenu"
          >
            <ul
              class="navbar-nav ms-auto"
              role="menubar"
            >

              <li class="ms-3 mb-3" role="none">
                <a
                  class="text-black hover-underline"
                  href="./"
                  role="menuitem"
                >
                  Home
                </a>
              </li>

              <li class="ms-3 mb-3" role="none">
                <a
                  class="text-black hover-underline"
                  href="art.html"
                  role="menuitem"
                >
                  Art
                </a>
              </li>

              <li class="ms-3 mb-3" role="none">
                <a
                  class="text-black hover-underline"
                  href="photography.html"
                  role="menuitem"
                >
                  Photography
                </a>
              </li>

              <li class="ms-3 mb-3" role="none">
                <a
                  class="text-black hover-underline"
                  href="literature.html"
                  role="menuitem"
                >
                  Literature
                </a>
              </li>

            </ul>
          </div>
        </nav>

        <hr class="mt-0 mb-2">
      </header>
    `;
  }
}

if (!customElements.get("my-header"))
{
  customElements.define("my-header", MyHeader);
}


/* =========================================================
   FOOTER NAVIGATION
   ========================================================= */

class FooterNav extends HTMLElement
{
  connectedCallback()
  {
    this.innerHTML = `
      <footer
        class="container-lg text-center mb-3"
        aria-label="Footer navigation"
      >

        <hr class="container-lg">

        <nav aria-label="Footer site links">
          <ul
            class="list-inline mb-2"
            role="menubar"
          >

            <li class="list-inline-item" role="none">
              <a
                class="text-black hover-underline"
                href="./"
                role="menuitem"
              >
                Home
              </a>
            </li>

            <li class="list-inline-item" role="none">
              <a
                class="text-black hover-underline"
                href="art.html"
                role="menuitem"
              >
                Art
              </a>
            </li>

            <li class="list-inline-item" role="none">
              <a
                class="text-black hover-underline"
                href="photography.html"
                role="menuitem"
              >
                Photography
              </a>
            </li>

            <li class="list-inline-item" role="none">
              <a
                class="text-black hover-underline"
                href="literature.html"
                role="menuitem"
              >
                Literature
              </a>
            </li>

          </ul>
        </nav>

      </footer>
    `;
  }
}

if (!customElements.get("footer-nav"))
{
  customElements.define("footer-nav", FooterNav);
}


/* =========================================================
   BOOTSTRAP JAVASCRIPT
   ========================================================= */

class SiteAssets extends HTMLElement
{
  connectedCallback()
  {
    this.loadBootstrapJS();
  }

  loadBootstrapJS()
  {
    // Bootstrap may already exist.
    if (window.bootstrap)
    {
      document.dispatchEvent(
        new Event("bootstrap:loaded")
      );

      return;
    }

    // Prevent duplicate Bootstrap scripts.
    if (
      document.getElementById(
        "bootstrap-js-cdn"
      )
    )
    {
      return;
    }

    const script = document.createElement("script");

    script.id = "bootstrap-js-cdn";

    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js";

    script.integrity =
      "sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q";

    script.crossOrigin = "anonymous";

    script.onload = () =>
    {
      document.dispatchEvent(
        new Event("bootstrap:loaded")
      );
    };

    script.onerror = () =>
    {
      console.warn(
        "Bootstrap JavaScript failed to load."
      );
    };

    document.head.appendChild(script);
  }
}

if (!customElements.get("site-assets"))
{
  customElements.define(
    "site-assets",
    SiteAssets
  );
}


/* =========================================================
   HOME TITLE ROTATION
   ========================================================= */

function initializeHomeTitleRotation()
{
  const titleElement =
    document.getElementById(
      "home-title-cycle"
    );

  if (!titleElement)
  {
    return;
  }

  const titles = [
    "Artist",
    "Author",
    "Teacher",
    "Philosopher",
    "Research Scholar",
    "Indie Game Developer"
  ];

  const fadeDuration = 250;
  const displayDuration = 1250;

  let titleIndex = 0;

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  titleElement.style.transition =
    `opacity ${fadeDuration}ms ease`;

  function showTitle()
  {
    titleElement.textContent =
      titles[titleIndex];

    titleElement.style.opacity = "1";
  }

  function showNextTitle()
  {
    if (reducedMotion.matches)
    {
      showTitle();

      titleIndex =
        (titleIndex + 1) %
        titles.length;

      window.setTimeout(
        showNextTitle,
        3000
      );

      return;
    }

    showTitle();

    window.setTimeout(() =>
    {
      titleElement.style.opacity = "0";
    }, displayDuration);

    window.setTimeout(() =>
    {
      titleIndex =
        (titleIndex + 1) %
        titles.length;

      showNextTitle();
    }, displayDuration + fadeDuration);
  }

  showNextTitle();
}


/* =========================================================
   SITE INITIALIZATION
   ========================================================= */

function initializeSite()
{
  initializeHomeTitleRotation();
}


/* =========================================================
   START
   ========================================================= */

if (document.readyState === "loading")
{
  document.addEventListener(
    "DOMContentLoaded",
    initializeSite,
    { once: true }
  );
} else
{
  initializeSite();
}
