type Props = {
  onClick: () => void;
  isTimerPaused: boolean;
};

export function PauseResumeButton({ onClick, isTimerPaused }: Props) {
  return (
    <>
      <button onClick={onClick}>{isTimerPaused ? "Resume" : "Pause"}</button>
    </>
  );
}
