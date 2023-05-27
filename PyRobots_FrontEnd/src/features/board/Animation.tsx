import { useEffect, useRef, useState } from "react";

export type ControlProps = {
  restart: React.MouseEventHandler<HTMLButtonElement>;
  pause: React.MouseEventHandler<HTMLButtonElement>;
};

/** Show `renderFrame(i - i % skipFrames)` in the `i`th frame.
 * Showing a new frame every `frameInterval` mili-seconds. */
export function Animate(
  amountFrames: number,
  frameInterval: number,
  skipFrames: number,
  renderFrame: (frame: number, control: ControlProps) => JSX.Element
): JSX.Element {
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = getInterval();
    return () => clearInterval(intervalRef.current);
  });

  const getInterval = () => {
    const progressInterval: NodeJS.Timer = setInterval(() => {
      if (frame < amountFrames && !paused) {
        setFrame(
          frame + skipFrames > amountFrames ? amountFrames : frame + skipFrames
        );
      }
    }, frameInterval * skipFrames);
    return progressInterval;
  };

  const animation = () => {
    if (frame < amountFrames && !paused) {
      setFrame(
        frame + skipFrames > amountFrames ? amountFrames : frame + skipFrames
      );
    }
  };

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(animation, 20);
    return () => clearInterval(interval);
  });

  function restart(): void {
    clearInterval(intervalRef.current);
    setFrame(0);
    intervalRef.current = getInterval();
  }

  function pause(): void {
    clearInterval(intervalRef.current);
    setPaused(!paused);
  }

  return <div>{renderFrame(frame, { restart: restart, pause: pause })}</div>;
}
