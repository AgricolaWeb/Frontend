import React from "react";

export default function PersonalBoard({
  validPositions = [],
  playerId = null,
  sendPosition,
  playerBoard = {}, //백엔드에서 받은 개인 보드 정보
}) {
  const width = 5;
  const height = 3;

  const isValid = (row, col) =>
    validPositions.some((pos) => pos.x === col && pos.y === row);

  // 키 형식: "tile_x_y"
  const getCellData = (col, row) => {
    const key = `tile_${col}_${row}`;
    return playerBoard[key] || null;
  };
  const roomImage = {
    WOOD: "/image/wood_room.png",
    STONE: "/image/stone_room.png",
    SOIL: "/image/soil_room.png",
  };
  const renderCellContent = (cellData) => {
    if (!cellData) return null;

    // 집인경우
    if (cellData.tileType === "Room" && cellData.roomType) {
      return (
        <img
          src={roomImage[cellData.roomType]}
          alt={`${cellData.roomType} room`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      );
    }

    // 외양간인경우
    if (cellData.tileType === "Barn") {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={`/image/player/barn_${playerId}.png`}
            alt="Barn"
            className="w-12 h-12"
          />
        </div>
      );
    }

    // ③ 밭 일때+작물이 심어져있을때
    if (cellData.tileType === "FieldTile" || cellData.tileType === "Field") {
      return (
        <>
          <img
            src="/image/plow.png"
            alt="Plow"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {cellData.cropType && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <img
                src={`/image/${cellData.cropType}.png`}
                alt={cellData.cropType}
                className="w-8 h-8"
              />
              {typeof cellData.crops === "number" && cellData.crops > 0 && (
                <span className="text-white font-bold text-s mt-1  px-1">
                  {cellData.crops}
                </span>
              )}
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="bg-white bg-opacity-60 rounded-lg m-2 w-[450px] h-[320px] flex flex-col justify-center items-center">
      {Array.from({ length: height }, (_, col) => (
        <div key={col} className="flex p-1 gap-x-1">
          {Array.from({ length: width }, (_, row) => {
            const valid = isValid(row, col);
            const cellData = getCellData(col, row);

            let fences = {
              top: false,
              right: false,
              bottom: false,
              left: false,
            };
            if (cellData && Array.isArray(cellData.fences)) {
              const [top, bottom, left, right] = cellData.fences;
              fences = { top, right, bottom, left };
            }

            const handleClick = () => {
              if (valid && playerId != null) {
                sendPosition({ playerId, x: col, y: row });
              }
            };

            return (
              <div
                key={`${row}-${col}`}
                onClick={handleClick}
                className={`relative w-20 h-20 mr-0.5 ml-0.5 mt-2 mb-2 ${
                  valid
                    ? "cursor-pointer bg-white hover:bg-gray-100"
                    : "cursor-default bg-personalCell "
                }`}
              >
                {/* 타일(방/밭/외양간) 렌더 */}
                {renderCellContent(cellData)}

                {/* 가족 구성원 어른 or 아이  */}
                {cellData &&
                  (cellData.familyMember === "Adult" ||
                    cellData.familyMember === "Child") && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <img
                        src={`/image/player/player_${playerId}.png`}
                        alt={
                          cellData.familyMember === "Adult" ? "Adult" : "Child"
                        }
                        className={
                          cellData.familyMember === "Child"
                            ? "w-8 h-8"
                            : "w-12 h-12"
                        }
                      />
                    </div>
                  )}

                {/* 울타리 표시 */}
                {fences.top && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-200" />
                )}
                {fences.right && (
                  <div className="absolute top-0 right-0 w-1 h-full bg-yellow-200" />
                )}
                {fences.bottom && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-200" />
                )}
                {fences.left && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-200" />
                )}

                {/* 선택 가능한 좌표 보여주기 */}
                {valid && (
                  <div className="absolute inset-0 border-2 border-blue-400 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
