"use client";

import { useState } from "react";

const CopyIcon = () => (
  <svg
    fill={"none"}
    height={"20"}
    stroke={"currentColor"}
    strokeWidth={"2"}
    viewBox={"0 0 24 24"}
    width={"20"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <rect height={"13"} rx={"2"} ry={"2"} width={"13"} x={"9"} y={"9"} />
    <path d={"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"} />
  </svg>
);

const CheckIcon = () => (
  <svg
    fill={"none"}
    height={"20"}
    stroke={"currentColor"}
    strokeWidth={"2"}
    viewBox={"0 0 24 24"}
    width={"20"}
    xmlns={"http://www.w3.org/2000/svg"}
  >
    <polyline points={"20 6 9 17 4 12"} />
  </svg>
);

export default function Code({ code }: { code: string }) {
  const [icon, setIcon] = useState(CopyIcon);

  const copy = async () => {
    await navigator?.clipboard?.writeText(code);
    setIcon(CheckIcon);
    setTimeout(() => setIcon(CopyIcon), 2000);
  };

  return (
    <pre className={"relative p-8 my-8 rounded-md bg-foreground/5"}>
      <button
        className={"absolute p-2 rounded-md top-4 right-4 bg-foreground/5 hover:bg-foreground/10"}
        onClick={copy}
      >
        {icon}
      </button>
      <code>{code}</code>
    </pre>
  );
}
