document.addEventListener("DOMContentLoaded", () => {
  setupDropdowns();
  setupCacheButton();
  showLastCacheClearMessage();
  registerAppServiceWorker();
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

function setupCacheButton() {
  const button = document.getElementById("clear-cache-button");
  if (button) {
    button.addEventListener("click", clearAppCache);
  }
}

function showLastCacheClearMessage() {
  const message = document.getElementById("update-message");
  const lastClear = localStorage.getItem("lastVolunteerDropdownCacheClear");

  if (message && lastClear) {
    message.textContent = "App cache last cleared: " + lastClear;
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
    localStorage.setItem("lastVolunteerDropdownCacheClear", now);

    if (message) {
      message.textContent = "App cache cleared. Last checked: " + now;
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  } catch (error) {
    console.error("App cache clear failed:", error);

    if (message) {
      message.textContent = "App cache clear attempted, but there may have been an error.";
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
}

function registerAppServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("App service worker registration failed:", error);
    });
  }
}
