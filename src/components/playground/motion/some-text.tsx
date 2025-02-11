export interface SomeTextProps extends React.HTMLAttributes<HTMLElement> {}

export const SomeText = ({ className }: SomeTextProps) => {
  return (
    <section className={className}>
      {Array.from({ length: 7 }).map((_, idx) => (
        <p className="py-3" key={idx}>
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
          some text some text some text some text some text some text some text
        </p>
      ))}
    </section>
  );
};
