// import { useState } from "preact/hooks";
import Router from "preact-router";

export function Main() {
  return (
    <Router>
      <App path="/test" />
    </Router>
  );
}

export function App(_props: any) {
  // const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello World</h1>
      {/* <h2 id="test-value">{count}</h2>

      <div>
        <button id="test-inc" onClick={() => setCount((count) => count + 1)}>
          Inc
        </button>
      </div> */}
    </>
  );
}
