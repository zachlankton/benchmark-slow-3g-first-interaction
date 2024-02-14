import { configRezact } from "@rezact/rezact/config";
import { routes } from "./src/routes";

// export default configRezact({ routes });
export default configRezact({});
// import { rezact } from "@rezact/rezact/vite-plugin";
// import { rezactBuild } from "@rezact/rezact/vite-build-plugin";
// import { routes } from "./src/routes";

// export default {
//   resolve: { alias: { src: "/src", rezact: "@rezact/rezact" } },
//   build: {
//     target: "esnext",
//     modulePreload: { polyfill: false },
//     rollupOptions: {
//       input: {
//         main: "/home/zach/benchmark-slow-3g-first-interaction/rezact/index.html",
//       },
//       output: {
//         entryFileNames: `assets/[name].js`,
//         chunkFileNames: `assets/[name].js`,
//         assetFileNames: `assets/[name].[ext]`,
//       },
//     },
//   },
//   esbuild: { jsxFactory: "xCreateElement", jsxFragment: "xFragment" },
//   plugins: [rezact(), rezactBuild({ routes })],
// };
