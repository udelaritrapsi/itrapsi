document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const footer = document.querySelector("footer");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const dropdownButtons = document.querySelectorAll(".dropdown-button");
  const videoFrames = document.querySelectorAll(".video-card iframe[data-src]");

  if (videoFrames.length) {
    if (window.location.protocol === "file:") {
      videoFrames.forEach((frame) => {
        const videoId = new URL(frame.dataset.src).pathname.split("/").pop();
        const preview = document.createElement("a");
        preview.className = "video-local-preview";
        preview.href = `https://www.youtube.com/shorts/${videoId}`;
        preview.target = "_blank";
        preview.rel = "noopener noreferrer";
        preview.setAttribute("aria-label", `${frame.title}. Reproducir en YouTube`);
        preview.style.backgroundImage = `linear-gradient(rgba(25, 19, 29, 0.12), rgba(25, 19, 29, 0.5)), url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`;
        preview.innerHTML = '<span class="video-play-button" aria-hidden="true">▶</span><span>Reproducir video</span>';
        frame.replaceWith(preview);
      });
    } else {
      videoFrames.forEach((frame) => {
        frame.src = frame.dataset.src;
      });
    }
  }

  if (hero) {
    const logo = document.createElement("img");
    logo.className = "hero-logo";
    logo.src = "assets/itrapsi-logo-transparent.png";
    logo.alt = "Logo de ITRAPSI";
    hero.append(logo);
  }

  if (footer) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const designCredit = currentPage === "index.html"
      ? '<p class="footer-credit">Diseño: Camila Rivas y Leonel Pinazzo</p>'
      : "";

    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-copy">
          <strong>ITRAPSI</strong>
          <p>Investigación Transdiagnóstica en Psicopatología</p>
          <p>Facultad de Psicología, Universidad de la República</p>
          ${designCredit}
        </div>
        <div class="footer-logos" aria-label="Instituciones vinculadas">
          <img src="assets/facultad-psicologia.jpg" alt="Facultad de Psicología" />
          <img src="assets/udelar.png" alt="Universidad de la República" />
          <a class="footer-logo-link" href="https://investigacion.udelar.edu.uy/" target="_blank" rel="noopener noreferrer" aria-label="Sitio del Prorrectorado de Investigación">
            <img class="footer-logo-wide" src="assets/prorrectorado-investigacion.png" alt="Prorrectorado de Investigación de la Universidad de la República" />
          </a>
          <img src="assets/pedeciba.jpg" alt="PEDECIBA" />
          <img src="assets/anii.png" alt="ANII" />
        </div>
        <div class="footer-social">
          <a href="https://www.instagram.com/itrapsi.udelar/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://x.com/EstudiosPsicoUy" target="_blank" rel="noopener noreferrer">X</a>
          <a href="mailto:itrapsi@psico.edu.uy">itrapsi@psico.edu.uy</a>
        </div>
      </div>`;
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", menu.classList.contains("abierto"));
    });
  }

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const menuItem = event.currentTarget.closest(".menu-item");

      if (window.innerWidth <= 780) {
        event.preventDefault();
        menuItem.classList.toggle("abierto");
        button.setAttribute("aria-expanded", menuItem.classList.contains("abierto"));
      }
    });
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('.submenu a[href]').forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("activo");
    }
  });
});
