import { useState, useEffect } from "react";

export default function usePlacementManager(currentRound, performAction, performRound) {
    const [actionPlacements, setActionPlacements] = useState([]);
    const [roundPlacements, setRoundPlacements] = useState([]);

    useEffect(() => {
        setActionPlacements([]);
        setRoundPlacements([]);
    }, [currentRound]);

    const handleActionSelect = (slotId, availableCards, playerId) => {
        if (!availableCards.includes(slotId)) return;
        setActionPlacements((ps) => [...ps, { playerId, slotId }]); //로컬에 기록
        performAction({ playerId, actionId: slotId }); //백엔드로 정보 전송
    };

    const handleRoundSelect = (slotId, openedCards, availableCards, playerId) => {
        const openedCard = openedCards[slotId - 1];
        if (!openedCard) return;
        if (!availableCards.includes(slotId)) return;
        setRoundPlacements((rs) => [...rs, { playerId, slotId }]); //로컬에 기록
        performRound({ playerId, roundSlot: slotId + 14 }); //백엔드로 정보 전송시 라운드카드는 15번부터임
    };

    return {
        actionPlacements,
        roundPlacements,
        handleActionSelect,
        handleRoundSelect,
    };
}
