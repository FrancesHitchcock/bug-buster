export default function Bug({ zapBug, idFragment, top, left, bugDuration }) {
  return (
    <div
      data-bug={`bug-${idFragment}`}
      className="bug-container hidden"
      id={`bug-${idFragment}`}
      onClick={zapBug}
      style={{ top: top, left: left, animationDuration: `${bugDuration}s` }}
    ></div>
  );
}
