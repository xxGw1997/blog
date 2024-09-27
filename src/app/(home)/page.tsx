export default function Home() {
  return (
    <div className="w-full">
      <main className="h-[1500px] px-7 py-10 overflow-x-hidden mx-auto max-w-5xl">
        <div className="w-full h-full">
          <div className="size-20 rounded-full bg-background">background</div>
          <div className="size-20 rounded-full bg-foreground">foreground</div>
          <div className="size-20 rounded-full bg-primary">primary</div>
          <div className="size-20 rounded-full bg-primary-foreground">primary-foreground</div>
          <div className="size-20 rounded-full bg-secondary">secondary</div>
          <div className="size-20 rounded-full bg-secondary-foreground">secondary-foreground</div>
          <div className="size-20 rounded-full bg-muted">muted</div>
          <div className="size-20 rounded-full bg-muted-foreground">muted-foreground</div>
          <div className="size-20 rounded-full bg-accent">accent</div>
          <div className="size-20 rounded-full bg-accent-foreground">accent-foreground</div>
        </div>
      </main>
    </div>
  );
}
