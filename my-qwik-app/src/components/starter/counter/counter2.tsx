import { component$, sync$, $, useSignal } from "@builder.io/qwik";
import styles from "./counter.module.css";
import Gauge from "../gauge";

export default component$(() => {
  const count = useSignal(0);

  // update DOM
  const countHandler$ = sync$((evt: Event, target: HTMLButtonElement) => {
    // @ts-ignore
    const span = (target.span ||= document.getElementById("test-value"));
    // @ts-ignore
    const circle = (target.circle ||= document.getElementById("qwik-circle"));

    const value = Number(span.textContent);
    const newValue = value + Number(target.dataset.value);
    if (newValue < 0 || newValue > 100) {
      return;
    }
    circle.style.strokeDasharray = `${newValue * 3.51}, 351.858`;
    span.textContent = newValue.toString();
  });
  // update signal
  const updateSignal$ = $((evt: Event, target: HTMLButtonElement) => {
    count.value = Number((target as any).span.textContent);
  });

  return (
    <div class={styles["counter-wrapper"]}>
      <button
        data-value="-1"
        class="button-dark button-small"
        onClick$={[countHandler$, updateSignal$]}
      >
        -
      </button>
      <Gauge value={count.value} />
      <button
        id="test-inc"
        data-value="1"
        class="button-dark button-small"
        onClick$={[countHandler$, updateSignal$]}
      >
        +
      </button>
    </div>
  );
});
