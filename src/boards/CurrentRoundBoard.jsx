import { useState } from "react";

export default function CurrentRoundBoard({ currentRound }) {
    if (currentRound == null) return null;
    return (
        <div className="p-2 mb-4 bg-white rounded shadow">
            현재 라운드: <span className="font-bold">{currentRound}</span>
        </div>
    );
}
