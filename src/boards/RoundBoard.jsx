import React from "react";

const ROUND_CARD_NAMES = [
    "주요 설비",
    "양 시장",
    "곡식 활용",
    "울타리",
    "기본 가족 늘리기",
];

export default function RoundBoard({
    openedCards = [],
    onSelectRound,
    placedRounds = [],
}) {
    return (
        <div className="flex gap-2 p-2">
            {ROUND_CARD_NAMES.map((_, idx) => {
                const slotId = idx + 1;
                const openedCard = openedCards[idx];
                const playersHere = placedRounds
                    .filter((p) => p.slotId === slotId)
                    .map((p) => p.playerId);

                return (
                    <button
                        key={`round-${slotId}`}
                        onClick={() => onSelectRound(slotId)}
                        className="relative w-full h-40 border rounded-lg bg-white"
                    >
                        {openedCard ? (
                            <img
                                src={`/image/round/${openedCard.id}.png`}
                                alt={openedCard.name}
                                className="object-contain w-full h-full"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-2xl font-bold text-gray-700">
                                {slotId}
                            </div>
                        )}

                        {playersHere.map((pid) => (
                            <img
                                key={`round-icon-${slotId}-${pid}`}
                                src={`/image/player/player_${pid}.png`}
                                alt={`player ${pid}`}
                                className="absolute w-6 h-6"
                                style={{
                                    bottom: 4,
                                    right: 4 + 8 * playersHere.indexOf(pid),
                                }}
                            />
                        ))}
                    </button>
                );
            })}
        </div>
    );
}
