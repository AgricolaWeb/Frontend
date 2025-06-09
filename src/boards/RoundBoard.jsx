import { React, useState } from "react";

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
  const [enlargedCard, setEnlargedCard] = useState(null);
  const handleClose = () => setEnlargedCard(null);

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
            onContextMenu={
              openedCard
                ? (e) => {
                    e.preventDefault();
                    setEnlargedCard(openedCard);
                  }
                : undefined
            }
          >
            {openedCard ? (
              <img
                src={`/image/round/${openedCard.id}.png`}
                alt={openedCard.name}
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl font-bold text-green-700">
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
      {enlargedCard && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={handleClose} // 바깥 클릭 시 닫기
        >
          {/* 카드 클릭해도 안 닫히게 */}
          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={`/image/round/${enlargedCard.id}.png`}
              alt={enlargedCard.name}
              className="w-[340px] h-[480px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
