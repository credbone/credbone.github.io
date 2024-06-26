import React, { useState, useEffect, useRef, cloneElement, ReactElement, ReactNode } from "react";

interface Props {
  children: (isSticky: boolean) => ReactElement;
  className?: string;
}

const StuckReporter: React.FC<Props> = ({ children, className }) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(entry.intersectionRatio < 1);
      },
      {
        root: null,
        threshold: [1],
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const childElement = children(isSticky);

  return cloneElement(childElement, {
    ref,
    className: `${childElement.props.className ?? ""} sticky ${isSticky ? className ?? "stuck" : ""}`.trim(),

  });
};

export default StuckReporter;
