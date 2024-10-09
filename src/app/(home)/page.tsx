export default function Home() {
  return (
    <div className="w-full">
      <main className="h-[1500px] px-7 py-10 overflow-x-hidden mx-auto max-w-5xl">
        <div className="w-full h-full">
          <div className="border text-center leading-[70px] size-20 rounded-full bg-background text-foreground">background</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-card text-card-foreground">card</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-popover text-popover-foreground">popover</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-primary text-primary-foreground">primary</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-secondary text-secondary-foreground">secondary</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-muted text-muted-foreground">muted</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-accent text-accent-foreground">accent</div>
          <div className="border text-center leading-[70px] size-20 rounded-full bg-destructive text-destructive-foreground">destructive</div>
        </div>
      </main>
    </div>
  );
}
