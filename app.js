document.addEventListener("DOMContentLoaded", () => {
  setupDropdowns();
  showLastCacheClearMessage();
});

function setupDropdowns() {
  const buttons = document.querySelectorAll(".dropdown-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;

      if (content) {
        content.classList.toggle("open");
      }
    });
  });
}

function showLastCacheClearMessage() {
  const message = document.getElementById("update-message");
  const lastClear = localStorage.getItem("lastCacheClear");

  if (message && lastClear) {
    message.textContent = "Cache last cleared: " + lastClear;
  }
}

async function clearAppCache() {
  const message = document.getElementById("update-message");

  if (message) {
    message.textContent = "Clearing app cache...";
  }

  try {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.update()));
    }

    const now = new Date().toLocaleString();
    localStorage.setItem("lastCacheClear", now);

    if (message) {
      message.textContent = "Cache cleared. Last checked: " + now;
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);

  } catch (error) {
    console.error("Cache clear failed:", error);

    if (message) {
      message.textContent = "Cache clear attempted, but there may have been an error.";
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
}