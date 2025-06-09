import React, { useState, useEffect } from "react";

export default function MajorBoard({ majorImprovementCards = [] }) {
  // 로컬 상태로 주요설비 카드 데이터 저장
  const [cardData, setCardData] = useState([]);
  const [enlargedCard, setEnlargedCard] = useState(null);
  const handleClose = () => setEnlargedCard(null);

  useEffect(() => {
    if (
      Array.isArray(majorImprovementCards) &&
      majorImprovementCards.length > 0
    ) {
      setCardData(majorImprovementCards);
    }
  }, [majorImprovementCards]);

  return (
    <div className="relative w-full h-full mt-2">
      <img
        src="/image/majorboard.png"
        alt="Major Board"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-3">
        {cardData.map((card) => (
          <div key={card.id}>
            <img
              src={`/image/Card/${card.id}.png`}
              alt={card.name}
              className="object-contain w-full h-full cursor-pointer"
              onContextMenu={(e) => {
                e.preventDefault();
                setEnlargedCard(card);
              }}
            />
          </div>
        ))}
      </div>
      {enlargedCard && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={handleClose} // 바깥 클릭 시 닫기
        >
          {/* 카드 클릭해도 안 닫히게 */}
          <div onClick={(e) => e.stopPropagation()}>
            <img
              src={`/image/card/${enlargedCard.id}.png`}
              alt={enlargedCard.name}
              className="w-[340px] h-[480px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
