import bugImage from "../images/bug.png";

export default function Bug({
  zapBug,
  idFragment,
  top,
  left,
  angle,
  bugDuration,
}) {
  return (
    <div
      // data-bug={`bug`}
      className="bug-container hidden"
      id={`bug-${idFragment}`}
      onClick={zapBug}
      style={{
        top: top,
        left: left,
        transform: `rotate(${angle}deg)`,
        animationDuration: `${bugDuration}s`,
      }}
    >
      {/* <img className="bug-image" src={bugImage} alt="bug" /> */}
      <img data-bug={`bug`} className="bug-image" src={bugImage} alt="bug" />
    </div>
  );
}
