interface BlockHTagProps {
  children?: React.ReactNode; // 修正拼写
  id?: string;
  [key: string]: any; // 如果需要其他类型，使用 any 或更合适的类型
}

export const BlockH2Tag = ({ children, id, ...rest }: BlockHTagProps) => {
  return (
    <h2 {...rest} className="text-primary/90">
      {children}
      <a href={`#${id}`} className="header-anchor">
        #
      </a>
    </h2>
  );
};

export const BlockH3Tag = ({ children, id, ...rest }: BlockHTagProps) => {
  return (
    <h3 {...rest} className="text-primary/80">
      {children}
      <a href={`#${id}`} className="header-anchor">
        #
      </a>
    </h3>
  );
};

export const BlockH4Tag = ({ children, id, ...rest }: BlockHTagProps) => {
  return (
    <h4 {...rest} className="text-primary/70">
      {children}
      <a href={`#${id}`} className="header-anchor">
        #
      </a>
    </h4>
  );
};

export const BlockH5Tag = ({ children, id, ...rest }: BlockHTagProps) => {
  return (
    <h5 {...rest} className="text-primary/60">
      {children}
      <a href={`#${id}`} className="header-anchor">
        #
      </a>
    </h5>
  );
};

export const BlockH6Tag = ({ children, id, ...rest }: BlockHTagProps) => {
  return (
    <h6 {...rest} className="text-primary/50">
      {children}
      <a href={`#${id}`} className="header-anchor">
        #
      </a>
    </h6>
  );
};
