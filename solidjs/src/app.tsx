// @refresh reload
import { createSignal } from "solid-js";

import "./app.css";

export default function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main>
      <h1>Hello world!</h1>

      <button
        id="test-inc"
        class="increment"
        onClick={() => setCount(count() + 1)}
      >
        Clicks: <span id="test-value">{count()}</span>
      </button>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
