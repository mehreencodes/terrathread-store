import { useEffect, useState } from "react";

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => setPos({ x: e.clientX, y: e.clientY });

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    // Auto-detect hoverable elements
    const hoverables = document.querySelectorAll("a, button, .cursor-hover");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-transform duration-100 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: "8px",
          height: "8px",
          background: "#A8553D",
          transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
        }}
      />
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border transition-all duration-200 ease-out hidden md:block"
        style={{
          left: pos.x,
          top: pos.y,
          width: isHovering ? "50px" : "32px",
          height: isHovering ? "50px" : "32px",
          borderColor: "#A8553D",
          background: isHovering ? "rgba(168,85,61,0.1)" : "transparent",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}

export default CustomCursor;