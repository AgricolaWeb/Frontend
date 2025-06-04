// src/functions/CardChoice.jsx
import React from "react";

export default function CardChoice({
    show = false,
    cards = [],
    playerId = null,
    onSendCard, // function({ playerId, cardId }) => void
    onClose, // function() => void
}) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">카드를 선택하세요</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {cards.map((card) => (
                        <button
                            key={card.id}
                            onClick={() => {
                                onSendCard({ playerId, cardId: card.id });
                            }}
                            className="flex flex-col items-center border rounded-lg p-2 hover:shadow-lg transition"
                        >
                            <img
                                src={`/image/card/${card.id}.png`}
                                alt={card.name}
                                className="w-24 h-32 object-contain mb-2"
                            />
                            <div className="text-center">
                                <div className="font-medium">{card.name}</div>
                                <p className="text-xs text-gray-600">
                                    {card.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
