export default function Bug({ zapBug, idFragment, top, left }) {
  return (
    <div
      //   className="bug-container"
      className="bug-container hidden"
      id={`bug-${idFragment}`}
      onClick={zapBug}
      style={{ top: top, left: left, animationDuration: "4s" }}
    ></div>
  );
}
