import { useEffect, useRef, useState } from "react";

function TextReveal({ text, className = "", delay = 0, splitBy = "word" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const parts = splitBy === "word" ? text.split(" ") : text.split("");

  return (
    <span ref={ref} className={className}>
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.2em", marginBottom: "-0.2em" }}
        >
          <span
            className="inline-block transition-all ease-out"
            style={{
              transitionDuration: "0.7s",
              transitionDelay: `${delay + i * 0.05}s`,
              transform: visible ? "translateY(0%)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
            }}
          >
            {part}
            {splitBy === "word" ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export default TextReveal;