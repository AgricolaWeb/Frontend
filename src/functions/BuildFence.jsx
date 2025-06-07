import { useEffect, useState } from "react";

export default function BuildFence({
  playerId,
  playerBoard,
  sendFencePosition,
  onFinish,
}) {
  const width = 5;
  const height = 3;

  const [fenceSelections, setFenceSelections] = useState([]);
  const [validFencePositions, setValidFencePositions] = useState([]);

  //설치 가능한 타일인지 확인(비어있거나 외양간이 있는곳은 가능)
  const isEmptyTile = (cellData) => {
    if (!cellData) return true;
    return cellData.tileType === "Empty" || cellData.tileType === "Barn";
  };
  //처음 울타리 설치인지 확인
  const hasAnyFence = () => {
    return Object.values(playerBoard).some((tile) => {
      return (
        Array.isArray(tile.fences) && tile.fences.some((val) => val === true)
      );
    });
  };
  // 4곳중 울타리가 1개만 설치된 곳을 인접 영역으로 간주(수정 필요)
  const hasOnlyOneFence = (tile) => {
    if (!tile || !Array.isArray(tile.fences)) return false;
    return tile.fences.filter(Boolean).length === 1;
  };

  useEffect(() => {
    const nextValid = [];

    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        const tile = playerBoard[`tile_${x}_${y}`];
        if (!isEmptyTile(tile)) continue;

        if (!hasAnyFence()) {
          nextValid.push({ x, y });
        } else {
          if (hasOnlyOneFence(tile)) {
            nextValid.push({ x, y });
          }
        }
      }
    }

    setValidFencePositions(nextValid);
  }, [playerBoard]);

  const isValid = (x, y) =>
    validFencePositions.some((pos) => pos.x === x && pos.y === y);

  const isSelected = (x, y) =>
    fenceSelections.some((pos) => pos.x === x && pos.y === y);

  const handleClick = (x, y) => {
    if (!isValid(x, y)) return;
    const already = isSelected(x, y);
    if (already) {
      setFenceSelections((prev) =>
        prev.filter((p) => !(p.x === x && p.y === y))
      );
    } else {
      setFenceSelections((prev) => [...prev, { x, y }]);
    }
  };
  const handleFenceConfirm = () => {
    sendFencePosition({ playerId, positions: fenceSelections });
    setFenceSelections([]);
    onFinish();
  };

  return (
    <div className="relative">
      {fenceSelections.length > 0 && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-10">
          <button
            className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-lg font-semibold rounded-xl shadow-lg border-2 border-orange-700 transition-all duration-200"
            onClick={handleFenceConfirm}
          >
            울타리 설치 확정 ({fenceSelections.length})
          </button>
        </div>
      )}
      <div className="bg-green-800">
        {Array.from({ length: height }, (_, x) => (
          <div key={x} className="flex p-1 gap-x-1">
            {Array.from({ length: width }, (_, y) => {
              const tile = playerBoard[`tile_${x}_${y}`];
              const selected = isSelected(x, y);
              const valid = isValid(x, y);

              return (
                <div
                  key={`${x}-${y}`}
                  onClick={() => handleClick(x, y)}
                  className={`relative w-20 h-20 border ${
                    valid
                      ? "cursor-pointer bg-white hover:bg-gray-100"
                      : "cursor-default bg-green-500"
                  }`}
                >
                  {tile && tile.tileType && (
                    <div className="absolute inset-0 text-xs text-white p-1">
                      {tile.tileType}
                    </div>
                  )}
                  {selected && (
                    <div className="absolute inset-0 border-4 border-yellow-400 pointer-events-none" />
                  )}
                  {valid && !selected && (
                    <div className="absolute inset-0 border-2 border-blue-400 pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
