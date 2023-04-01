import React from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";

export const Example = () => {
  return (
    <div className="example-wrapper">
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
    </div>
  );
};

const Section = () => {
  React.useLayoutEffect(() => {
    gsap.registerPlugin(SplitText);

    const split = new SplitText(exRef.current, {
      type: "words",
    });
  }, []);

  const exRef = React.useRef(null);
  return (
    <div ref={exRef}>
      Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Quas, molestiae odit expedita amet alias id
      inventore aliquid numquam laudantium! Provident
      temporibus corporis voluptatum sint aliquid quaerat
      nihil modi tempora facere.
    </div>
  );
};
