import "./css/HighScoreDisplay.css";

type HighScoreDisplayProps = {
  highScore: number;
  highScoreName: string;
};

function HighScoreDisplay({ highScore, highScoreName }: HighScoreDisplayProps) {
  return (
    <div className="highscore-display">
      {highScore > 0 && (
        <div>
          Highscore: {highScore} by {highScoreName}
        </div>
      )}
    </div>
  );
}

export default HighScoreDisplay;
