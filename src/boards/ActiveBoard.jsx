import CardSection from "../functions/CardSection";
export default function ActiveBoard({ activeCards = [] }) {
    return (
        <dvi>
            {Array.isArray(activeCards) && activeCards.length > 0 && (
                <CardSection
                    title="활성 카드"
                    cards={activeCards}
                    folder="card"
                    emptyMessage="활성 카드가 없습니다."
                />
            )}
        </dvi>
    );
}
