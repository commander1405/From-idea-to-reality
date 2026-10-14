
(() => {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const currentSlide = document.getElementById("currentSlide");
  const progressFill = document.getElementById("progressFill");
  const progressBar = document.getElementById("progressBar");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  if (
    !slides.length ||
    !prevBtn ||
    !nextBtn ||
    !currentSlide ||
    !progressFill ||
    !progressBar ||
    !fullscreenBtn
  ) {
    console.error("Presentation controls could not be initialized.");
    return;
  }

  let index = Math.max(
    0,
    slides.findIndex(slide => slide.classList.contains("active"))
  );

  let touchStartX = 0;
  let touchStartY = 0;

  const pad = number => String(number).padStart(2, "0");

  function updateControls() {
    const total = slides.length;
    const progress = ((index + 1) / total) * 100;

    currentSlide.textContent = pad(index + 1);
    progressFill.style.width = `${progress}%`;

    progressBar.setAttribute("aria-valuenow", String(index + 1));
    progressBar.setAttribute("aria-valuemax", String(total));

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;

    prevBtn.setAttribute("aria-label", "Previous slide");
    nextBtn.setAttribute(
      "aria-label",
      index === total - 1 ? "Last slide" : "Next slide"
    );
  }

  function showSlide(target) {
    if (target < 0 || target >= slides.length || target === index) {
      return;
    }

    slides[index].classList.remove("active");
    index = target;
    slides[index].classList.add("active");

    updateControls();
  }

  prevBtn.addEventListener("click", () => {
    showSlide(index - 1);
  });

  nextBtn.addEventListener("click", () => {
    showSlide(index + 1);
  });

  fullscreenBtn.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen is unavailable in this browser.", error);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenBtn.setAttribute(
      "aria-label",
      document.fullscreenElement
        ? "Exit fullscreen"
        : "Enter fullscreen"
    );
  });

  document.addEventListener("keydown", event => {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target.closest("input, textarea, select, button, a")
    ) {
      return;
    }

    if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key)) {
      event.preventDefault();
      showSlide(index + 1);
    } else if (
      ["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)
    ) {
      event.preventDefault();
      showSlide(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  document.addEventListener(
    "touchstart",
    event => {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    event => {
      if (event.target.closest("a, button")) {
        return;
      }

      const deltaX = event.changedTouches[0].screenX - touchStartX;
      const deltaY = event.changedTouches[0].screenY - touchStartY;

      if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      if (deltaX < 0) {
        showSlide(index + 1);
      } else {
        showSlide(index - 1);
      }
    },
    { passive: true }
  );

  updateControls();
})();
