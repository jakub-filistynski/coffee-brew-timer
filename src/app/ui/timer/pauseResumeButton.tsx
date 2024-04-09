type Props = {
  onClick: () => void;
  isTimerPaused: boolean;
};

export function PauseResumeButton({ onClick, isTimerPaused }: Props) {
  return (
    <>
      <button
        className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
        onClick={onClick}
      >
        {isTimerPaused ? "Resume" : "Pause"}
      </button>
    </>
  );
}
