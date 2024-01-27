function createQuikTimer(btnElmRef, outputElmRef) {
  let startTime = 0;
  let timerRunning = false;
  const div = document.createElement("div");
  const p = document.createElement("p");
  const pTimer = document.createElement("p");

  updateInterval = setInterval(() => {
    if (timerRunning) {
      pTimer.innerText = `${Date.now() - startTime} ms`;
    }
    if (outputElmRef.innerText === "71") {
      timerRunning = false;
    }
  }, 10);

  p.innerText = "Quik Timer";
  pTimer.innerText = "0 ms";
  div.appendChild(p);
  div.appendChild(pTimer);
  div.style.fontSize = "50px";
  div.style.textAlign = "center";
  div.style.color = "red";
  div.style.fontFamily = "monospace";
  div.style.fontWeight = "bold";
  div.style.fontStyle = "italic";
  div.style.textShadow = "0 0 10px black";
  div.style.userSelect = "none";
  div.style.cursor = "pointer";
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.right = "20px";
  div.style.padding = "20px";
  div.style.backgroundColor = "rgba(0,0,0,0.9)";
  div.style.borderRadius = "20px";

  document.body.appendChild(div);

  btnElmRef.addEventListener("click", () => {
    startTime = Date.now();
    timerRunning = true;
  });
}

const valueElm = document.getElementById("quik-test-value");
const buttonElm = document.getElementById("quik-test-button");
createQuikTimer(buttonElm, valueElm);
