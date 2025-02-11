import React from "react";

export default function CustomTabPanel({
  children,
  index,
  value,
}: Readonly<{
  children: React.ReactNode;
  index: number;
  value: number;
}>) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
}
