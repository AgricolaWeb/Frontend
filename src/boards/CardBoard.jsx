import React from "react";
import CardSection from "../functions/CardSection";

export default function CardBoard({
  minorImprovementCards = [],
  occupationCards = [],
  majorImprovementCards = [],
}) {
  return (
    <div className="">
      <CardSection
        title="보조설비 카드"
        cards={minorImprovementCards}
        emptyMessage="보조설비 카드가 없습니다."
      />

      <CardSection
        title="직업 카드"
        cards={occupationCards}
        emptyMessage="직업 카드가 없습니다."
      />

      {/* 주요설비 카드는 props.majorImprovementCards 배열에 값이 있을 때만*/}
      {Array.isArray(majorImprovementCards) &&
        majorImprovementCards.length > 0 && (
          <CardSection
            title="주요설비 카드"
            cards={majorImprovementCards}
            folder="majorCard"
            emptyMessage="주요설비 카드가 없습니다."
          />
        )}
    </div>
  );
}
