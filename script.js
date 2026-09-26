//------------ADD GOAT COUNTER------------
class GoatCounter extends HTMLElement
{
  connectedCallback()
  {
    // Problem: Setting innerHTML with a <script> tag does not execute the script.
    // Solution: We must create the script element programmatically and append it.

    // 1. Check if the script has already been added to prevent duplicates
    if (document.head.querySelector('script[data-goatcounter]'))
    {
      // console.log("GoatCounter script already initialized.");
      return;
    }

    // 2. Create the script element
    const script = document.createElement('script');

    // 3. Set the required attributes
    // This attribute tells GoatCounter where to send the data.
    script.setAttribute('data-goatcounter', 'https://epicsteme.goatcounter.com/count');

    // The async attribute is required for non-blocking loading
    script.setAttribute('async', '');

    // Set the source URL
    script.src = '//gc.zgo.at/count.js';

    // 4. Append the script to the <head> of the document, 
    // which is the standard place for global tracking scripts.
    document.head.appendChild(script);

    // Optional: Hide the element itself as it doesn't need to be visible
    this.style.display = 'none';
  }
}

//------------IMPLEMENT GOAT COUNTER------------
customElements.define("goat-counter", GoatCounter);

//------------ADD HEADER NAVIGATION------------
class MyHeader extends HTMLElement
{
  connectedCallback()
  {
    this.innerHTML = `
    <header id="header">
        
        <nav class="navbar navbar-expand-lg py-0 mx-0 my-0" aria-label="Primary navigation">
            
            <a href="./" class="navbar-brand" aria-current="page">
                
                <h1 class="text-start" aria-hidden="true">
                    Dyati
                </h1>
                
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" aria-controls="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="toggleMobileMenu">
                <ul class="navbar-nav ms-auto" role="menubar">
                    <li class="ms-3 mb-3" role="none">
                        <a class="text-black hover-underline" href="./" role="menuitem"> Home </a>
                    </li>
                    <li class="ms-3 mb-3" role="none">
                    <a class="text-black hover-underline" href="art.html" role="menuitem"> Art </a>
                    </li>
                    <li class="ms-3 mb-3" role="none">
                    <a class="text-black hover-underline" href="photography.html" role="menuitem"> Photography </a>
                    </li>
                    <li class="ms-3 mb-3" role="none">
                        <a class="text-black hover-underline" href="literature.html" role="menuitem"> Literature </a>
                    </li>
                </ul>
            </div>
        </nav>
        <hr class="mt-0 mb-2">
    </header> `;
  }
}

//------------IMPLEMENT FUNCTION HEADER------------
customElements.define("my-header", MyHeader);

//

//------------ADD FOOTER NAVIGATION------------
class FooterNav extends HTMLElement
{
  connectedCallback()
  {
    this.innerHTML = `
<footer class="container-lg text-center mb-3" aria-label="Footer navigation">
    <hr class="container-lg">
    <nav aria-label="Footer site links">
        <ul class="list-inline mb-2" role="menubar">
            <li class="list-inline-item hover-underline" role="link"><a class="text-black" href="./" role="menuitem">Home</a></li>
            <li class="list-inline-item hover-underline" role="link"><a class="text-black" href="art.html" role="menuitem">Art</a></li>
            <li class="list-inline-item hover-underline" role="link"><a class="text-black" href="photography.html" role="menuitem">Photography</a></li>
            <li class="list-inline-item hover-underline" role="link"><a class="text-black" href="literature.html" role="menuitem">Literature</a></li>
        </ul>
        
    </nav>
</footer>
        `;
  }
}

//------------IMPLEMENT FUNCTION FOOTER------------
customElements.define("footer-nav", FooterNav);

//------------LOAD BOOTSTRAP CSS AND JS FROM A CDN------------
class SiteAssets extends HTMLElement
{
  connectedCallback()
  {
    // Add Bootstrap CSS CDN
    if (!document.getElementById("bootstrap-css-cdn"))
    {
      const link = document.createElement("link");
      link.id = "bootstrap-css-cdn";
      link.rel = "stylesheet";
      link.href =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css";
      link.integrity =
        "sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    // Add BOOTSTRAP JS CDN
    if (!document.getElementById("bootstrap-js-cdn"))
    {
      const script = document.createElement("script");
      script.id = "bootstrap-js-cdn";
      script.src =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js";
      script.integrity =
        "sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q";
      script.crossOrigin = "anonymous";
      script.onload = () =>
      {
        // Dispatch a custom event when Bootstrap JS is loaded
        document.dispatchEvent(new Event("bootstrap:loaded"));
      };
      document.head.appendChild(script);
    } else
    {
      // If already loaded, dispatch immediately
      document.dispatchEvent(new Event("bootstrap:loaded"));
    }
  }
}

// ------------IMPLEMENT FUNCTION TO LOAD BOOTSTRAP ASSETS------------
customElements.define("site-assets", SiteAssets);

// ------------WAIT TO SHOW INDEX PAGE CONTENTS------------
// this seems to be tied to "fade-content" and "fade-content.visible" in custom.css
window.addEventListener("load", () =>
{
  // Fade in homeintro after 0.25 seconds (250 ms)
  setTimeout(() =>
  {
    document.getElementById("homebody").classList.add("visible");
  }, 250);

  /* Fade in herokicker after 1.0 seconds (1000 ms)
  setTimeout(() => {
    document.getElementById("herokicker").classList.add("visible");
  }, 2000);*/
});


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


  function showNextTitle()
  {
    titleElement.textContent =
      titles[titleIndex];


    if (reducedMotion.matches)
    {
      titleIndex =
        (titleIndex + 1) %
        titles.length;

      window.setTimeout(
        showNextTitle,
        3000
      );

      return;
    }


    titleElement.style.opacity =
      "1";


    window.setTimeout(
      () =>
      {
        titleElement.style.opacity =
          "0";
      },
      displayDuration
    );


    window.setTimeout(
      () =>
      {
        titleIndex =
          (titleIndex + 1) %
          titles.length;

        showNextTitle();
      },
      displayDuration +
      fadeDuration
    );
  }


  showNextTitle();
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeSite()
{
  initializeHomeTitleRotation();
}


/* =========================================================
   START SITE
   ========================================================= */

if (
  document.readyState ===
  "loading"
)
{
  document.addEventListener(
    "DOMContentLoaded",
    initializeSite,
    {
      once: true
    }
  );
} else
{
  initializeSite();
}