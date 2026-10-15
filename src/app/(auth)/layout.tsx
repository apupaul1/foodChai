import React from "react";

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return <div className="max-w-6xl mx-auto">{children}</div>;
};

export default AuthLayout;
