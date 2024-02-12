import "./css/NameInput.css";

type NameInputProps = {
  playerName: string;
  setPlayerName: (name: string) => void;
};

function NameInput({ playerName, setPlayerName }: NameInputProps) {
  return (
    <input
      className="name-input"
      value={playerName}
      onChange={(e) => setPlayerName(e.target.value)}
      placeholder="Enter your name"
    />
  );
}

export default NameInput;
