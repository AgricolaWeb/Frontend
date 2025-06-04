// src/boards/CardBoard.jsx
import React from "react";
import CardSection from "../functions/CardSection";

export default function CardBoard({
    minorImprovementCards = [],
    occupationCards = [],
    majorImprovementCards = [], // 필요 시 추가 가능하므로 props로 받아두되, 기본적으로는 사용하지 않아도 됩니다.
    activeCards = [],
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

            {/* 주요설비 카드는 props.majorImprovementCards 배열에 값이 있을 때만 보여줍니다.
          기본적으로 턴마다 주어지지 않으면 이 섹션은 렌더링되지 않습니다. */}
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
