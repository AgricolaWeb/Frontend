import { useState } from "react";

export default function CurrentRoundBoard({ currentRound }) {
  if (currentRound == null) return null;
  return (
    <div className="p-2 mb-4 bg-white rounded shadow font-medium text-green-700">
      현재 라운드:{" "}
      <span className="font-bold text-green-700">{currentRound}</span>
    </div>
  );
}
