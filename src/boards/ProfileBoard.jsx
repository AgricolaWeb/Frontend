import React from "react";

export default function ProfileBoard({ turnOrder = [], currentPlayerId }) {
    return (
        <div className="flex flex-col gap-2 p-2">
            {turnOrder.map((playerName, idx) => {
                const thisPlayerId = playerName.split(" ")[1];
                const isFirstPlayer = idx === 0;
                const isCurrentPlayer = currentPlayerId === thisPlayerId;

                return (
                    <div
                        key={idx}
                        className={`flex items-center justify-between p-3 border rounded-lg ${
                            isCurrentPlayer ? "bg-yellow-100" : "bg-white"
                        }`}
                    >
                        {" "}
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{playerName}</span>

                            {isFirstPlayer && (
                                <img
                                    src="/image/playerFirst.png"
                                    alt="First"
                                    className="w-5 h-5"
                                />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
