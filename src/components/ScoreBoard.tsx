import "./css/ScoreBoard.css";

type ScoreboardProps = {
  score: number;
};

function Scoreboard({ score }: ScoreboardProps) {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
    </div>
  );
}

export default Scoreboard;
