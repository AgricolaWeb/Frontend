import { useEffect, useState } from "react";

export default function EndGame({ scoreList, totalPlayers, onEndGame }) {
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (scoreList.length === totalPlayers) {
      setGameEnded(true);
    }
  }, [scoreList, totalPlayers]);

  if (!gameEnded) return null;

  const sortedScores = [...scoreList].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-6">게임이 종료되었습니다!</h2>
        <p className="text-xl mb-4">점수표</p>
        <ul className="text-lg mb-6">
          {sortedScores.map((entry, index) => (
            <li key={entry.playerId} className="mb-2">
              {index + 1}위 <strong>Player{entry.playerId}</strong>:{" "}
              {entry.score}점
            </li>
          ))}
        </ul>
        <button
          onClick={onEndGame}
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700"
        >
          종료
        </button>
      </div>
    </div>
  );
}
