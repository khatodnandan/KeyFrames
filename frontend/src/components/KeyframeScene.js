import "../styles/KeyframeScene.css";

const MARKERS = [8, 27, 50, 71, 92];

export default function KeyframeScene() {
  return (
    <div className="kf-scene" aria-hidden="true">
      <div className="kf-scene-glow kf-scene-glow--a" />
      <div className="kf-scene-glow kf-scene-glow--b" />

      <div className="kf-scene-frames">
        <span className="kf-scene-frame kf-scene-frame--1" />
        <span className="kf-scene-frame kf-scene-frame--2" />
        <span className="kf-scene-frame kf-scene-frame--3" />
      </div>

      <div className="kf-scene-track">
        <div className="kf-scene-track-line" />
        <div className="kf-scene-track-progress" />
        {MARKERS.map((pos, i) => (
          <span
            key={pos}
            className="kf-scene-marker"
            style={{ left: `${pos}%`, animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </div>

      <div className="kf-scene-grain" />
    </div>
  );
}
