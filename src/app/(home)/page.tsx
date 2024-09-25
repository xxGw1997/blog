import { Toolbar } from "./toolbar";

export default function Home() {
  return (
    <div className="h-full">
      <Toolbar />
      <main className="h-[1500px] px-7 py-10 overflow-x-hidden">
        <div>content</div>
      </main>
    </div>
  );
}
