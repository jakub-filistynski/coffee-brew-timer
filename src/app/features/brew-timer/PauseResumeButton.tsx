import styles from "@/app/features/brew-timer/PauseResumeButton.module.css";

type Props = {
  onClick: () => void;
  isTimerPaused: boolean;
};

export function PauseResumeButton({ onClick, isTimerPaused }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {isTimerPaused ? "Resume" : "Pause"}
    </button>
  );
}
