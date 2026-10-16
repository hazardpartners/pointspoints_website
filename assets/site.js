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
    link.setAttribute("aria-label", "Download Points Points on the App Store");
  });
  document.querySelectorAll("[data-download]").forEach(element => { element.hidden = false; });
  document.querySelectorAll("[data-prelaunch]").forEach(element => { element.hidden = true; });
}
const demoAmount = document.getElementById("demo-amount");
const demoValuation = document.getElementById("demo-valuation");
if (demoAmount && demoValuation) {
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  function updateDemo() {
    const amount = demoAmount.valueAsNumber;
    const invalid = !Number.isFinite(amount) || amount < 0 || amount > 100000;
    demoAmount.setAttribute("aria-invalid", String(invalid));
    document.getElementById("demo-error").hidden = !invalid;
    document.getElementById("demo-output").hidden = invalid;
    if (invalid) return;
    const pointValue = Number(demoValuation.value);
    const pointsReward = amount * 3 * pointValue / 100;
    const cashReward = amount * .02;
    const pointWins = pointsReward >= cashReward;
    document.getElementById("demo-winner-name").textContent = pointWins ? "Example points card" : "Example cash back card";
    document.getElementById("demo-winner-rate").textContent = pointWins ? `3× points · ${pointValue}¢ per point` : "2% cash back";
    document.getElementById("demo-winner-value").textContent = money.format(Math.max(pointsReward, cashReward));
    document.getElementById("demo-other-name").textContent = pointWins ? "Cash back card · 2%" : `Points card · 3× at ${pointValue}¢`;
    document.getElementById("demo-other-value").textContent = money.format(Math.min(pointsReward, cashReward));
    document.getElementById("demo-winner-label").textContent = pointsReward === cashReward ? "Same estimated value" : "Higher estimated reward";
    document.getElementById("demo-difference").textContent = pointsReward === cashReward ? "These examples have equal estimated rewards." : `${money.format(Math.abs(pointsReward - cashReward))} more in estimated rewards for this purchase.`;
  }
  demoAmount.addEventListener("input", updateDemo);
  demoValuation.addEventListener("change", updateDemo);
  updateDemo();
}
