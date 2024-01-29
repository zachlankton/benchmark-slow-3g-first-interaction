import Counter from "./Counter2";
import { readFileSync } from "fs";

const immediateInteractivityScript = readFileSync(
  "public/immediateInteractivity.js",
  "utf-8"
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="features" className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mdx mx-auto max-w-2xl text-white">
              <Counter />
              <script
                dangerouslySetInnerHTML={{
                  __html: immediateInteractivityScript,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
