import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-accent/60 to-primary/60 h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
