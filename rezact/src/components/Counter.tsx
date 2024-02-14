export default function Counter() {
  let $counter = 0;

  return (
    <div>
      <h2 id="test-value">{$counter}</h2>

      <div>
        <button onClick={() => $counter--}>Dec</button>
        <button id="test-inc" onClick={() => $counter++}>
          Inc
        </button>
      </div>
    </div>
  );
}
