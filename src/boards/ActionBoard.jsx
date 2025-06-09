import React from "react";

const ACTION_SLOTS = [
  { id: 1, name: "덤불" },
  { id: 2, name: "수풀" },
  { id: 3, name: "자원 시장" },
  { id: 4, name: "점토 채굴장" },
  { id: 5, name: "교습" },
  { id: 6, name: "유랑 극단" },
  { id: 7, name: "농장 확장" },
  { id: 8, name: "회합 장소" },
  { id: 9, name: "곡식 종자" },
  { id: 10, name: "밭 일구기" },
  { id: 11, name: "날품팔이" },
  { id: 12, name: "숲" },
  { id: 13, name: "흙 채굴장" },
  { id: 14, name: "낚시" },
];

export default function ActionBoard({
  accumulatedResources = [],
  onSelectAction,
  placedSlots = [],
}) {
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {ACTION_SLOTS.map(({ id, name }) => {
        const resourceInfo = accumulatedResources.find((r) => r.id === id);
        const playersHere = placedSlots
          .filter((p) => p.slotId === id)
          .map((p) => p.playerId);

        return (
          <button
            key={`action-${id}`}
            onClick={() => onSelectAction(id)}
            className="relative p-3 border-2 rounded-lg text-left backdrop-blur-sm"
          >
            <div className="font-bold text-green-900">{name}</div>

            {resourceInfo && (
              <div className="mt-1 text-sm">
                {Object.entries(resourceInfo.accumulatedResources).map(
                  ([key, amt]) => (
                    <div key={key} className="flex items-center space-x-1">
                      <img
                        src={`/image/${key}.png`}
                        alt={key}
                        className="w-7 h-7"
                      />
                      <span className="text-sm font-bold  text-green-900">
                        +{amt}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

            {playersHere.map((pid) => (
              <img
                key={`action-icon-${id}-${pid}`}
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
