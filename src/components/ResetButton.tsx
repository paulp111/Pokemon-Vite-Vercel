import "./css/ResetButton.css";

type ResetButtonProps = {
  resetGame: () => void;
};

function ResetButton({ resetGame }: ResetButtonProps) {
  return (
    <button className="reset-button" onClick={resetGame}>
      Reset
    </button>
  );
}

export default ResetButton;
