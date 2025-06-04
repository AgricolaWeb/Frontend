import React from "react";

export default function CardSection({ title, cards = [], emptyMessage }) {
    return (
        <div>
            {cards.length === 0 ? (
                <div className="text-gray-500 italic">{emptyMessage}</div>
            ) : (
                <div className="flex gap-3">
                    {cards.map((card) => (
                        <div key={card.id}>
                            <img
                                src={`/image/card/${card.id}.png`}
                                alt={card.name}
                                className="w-full h-28 object-contain mb-2"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
