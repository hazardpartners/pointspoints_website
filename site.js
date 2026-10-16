"use strict";
document.documentElement.classList.add("js");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
if (menuButton && navigation) {
  function closeMenu() {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
  }
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close" : "Menu";
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
}

const configuration = window.POINTS_POINTS || {};
let appUrl = null;
try {
  const parsed = new URL(configuration.appStoreUrl);
  if (parsed.protocol === "https:" && parsed.hostname === "apps.apple.com") appUrl = parsed.href;
} catch { /* The prelaunch site deliberately has no fabricated store link. */ }
if (appUrl) {
  document.querySelectorAll("[data-app-link]").forEach(link => {
    link.href = appUrl;
    link.setAttribute("aria-label", "Download Points Points! on the App Store");
  });
  document.querySelectorAll("[data-download]").forEach(element => { element.hidden = false; });
  document.querySelectorAll("[data-prelaunch]").forEach(element => { element.hidden = true; });
}
