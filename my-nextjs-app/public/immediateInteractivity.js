function counter(ev) {
  const valEl = document.getElementById("test-value");
  const valNum = Number(valEl.textContent);
  if (ev.target.id === "test-inc") {
    valEl.textContent = valNum + 1;
  } else if (ev.target.id === "test-dec") {
    valEl.textContent = valNum - 1;
  }
}
document.getElementById("test-inc")?.addEventListener("click", counter);
document.getElementById("test-dec")?.addEventListener("click", counter);
