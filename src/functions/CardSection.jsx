import { useState, React } from "react";
export default function CardSection({ cards = [], emptyMessage }) {
  const [enlargedCard, setEnlargedCard] = useState(null);
  const handleClose = () => setEnlargedCard(null);
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
                className="w-full h-28 object-contain mt-2 ml-2 cursor-pointer transition-transform hover:scale-110"
                onContextMenu={(e) => {
                  e.preventDefault(); // 마우스 우클릭시 작용
                  setEnlargedCard(card); // 카드 확대
                }}
              />
            </div>
          ))}
        </div>
      )}
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
