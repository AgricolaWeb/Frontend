import { useState } from "react";

export default function PersonalBoard({
    validPositions = [],
    playerId = null,
    sendPosition,
}) {
    const width = 5;
    const height = 3;
    const isValid = (row, col) =>
        validPositions.some((pos) => pos.x === col && pos.y === row); //클릭 가능한지 여부
    const [board, setBoard] = useState(
        Array.from({ length: height }, (_, col) =>
            Array.from({ length: width }, (_, row) => {
                if (row === 0 && (col === 1 || col === 2)) {
                    return {
                        type: "house",
                        material: "soil",
                        crop: null,
                        fences: {
                            top: false,
                            right: false,
                            bottom: false,
                            left: false,
                        },
                    };
                }
                return {
                    type: "empty", // "house", "field", or "empty"
                    material: null, // for house: "wood", "soil", "rock"
                    crop: null, // for field: crop name
                    fences: { top: false, right: false, bottom: false, left: false },
                };
            })
        )
    );
    return (
        <div className="bg-green-700">
            {board.map((colArr, col) => (
                <div key={col} className="flex p-3 gap-x-2">
                    {colArr.map((cell, row) => {
                        const valid = isValid(row, col);

                        const handleClick = () => {
                            if (valid && playerId != null) {
                                sendPosition({ playerId, x: col, y: row });
                            }
                        };

                        return (
                            <div
                                key={`${row}-${col}`}
                                onClick={handleClick}
                                className={`relative w-20 h-20 border
                  ${
                      valid
                          ? "cursor-pointer bg-white hover:bg-gray-100"
                          : "cursor-default bg-green-500"
                  }`}
                            >
                                {cell.type === "house" && (
                                    <div className="text-xs text-center text-brown-700">
                                        {cell.material} 집
                                    </div>
                                )}
                                {cell.type === "field" && (
                                    <div className="text-xs text-center text-green-700">
                                        {cell.crop || "밭"}
                                    </div>
                                )}

                                {cell.fences.top && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-yellow-200" />
                                )}
                                {cell.fences.right && (
                                    <div className="absolute top-0 right-0 w-1 h-full bg-yellow-200" />
                                )}
                                {cell.fences.bottom && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-200" />
                                )}
                                {cell.fences.left && (
                                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-200" />
                                )}
                                {valid && (
                                    <div className="absolute inset-0 border-2 border-yello-400 pointer-events-none" />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
