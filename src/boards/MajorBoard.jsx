import React, { useState, useEffect } from "react";

export default function MajorBoard({ majorImprovementCards = [] }) {
    // 로컬 상태로 주요설비 카드 데이터 저장
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        if (Array.isArray(majorImprovementCards) && majorImprovementCards.length > 0) {
            setCardData(majorImprovementCards);
        }
    }, [majorImprovementCards]);

    return (
        <div className="relative w-full h-full">
            <img
                src="/image/majorboard.png"
                alt="Major Board"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-4">
                {cardData.map((card) => (
                    <div key={card.id}>
                        <img
                            src={`/image/Card/${card.id}.png`}
                            alt={card.name}
                            className="object-contain w-full h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
