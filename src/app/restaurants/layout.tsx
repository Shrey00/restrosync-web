import React from "react";

const layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <div>{children}</div>;
};

export default layout;