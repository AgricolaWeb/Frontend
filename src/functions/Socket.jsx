// src/Socket.jsx
import { useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function useSocket(
    onGameState,
    onPlayerResources,
    onValidPositions,
    onChoiceRequest,
    onMajorCards,
    onActiveCards,
    onExchangeableCards,
    onPlayerBoard
) {
    const stompClient = useRef(null);
    const gameID = "1234"; // 예시 room ID

    const connectSocket = () => {
        if (stompClient.current) return; // 이미 연결되어 있으면 무시

        const socket = new SockJS("http://localhost:8090/gs-guide-websocket");
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect({}, (frame) => {
            console.log("Connected:", frame);

            // 전체 게임 상태 구독
            stompClient.current.subscribe("/topic/game", (msg) => {
                const payload = JSON.parse(msg.body);
                onGameState(payload);

                // playerId가 넘어오면 동적 토픽 구독
                const pid = payload.playerId;
                if (pid) {
                    stompClient.current.subscribe(`/topic/cards/${pid}`, (m) =>
                        onGameState({
                            type: "cards",
                            data: JSON.parse(m.body),
                            playerId: pid,
                        })
                    );
                    stompClient.current.subscribe(`/topic/activeCards/${pid}`, (m) =>
                        onActiveCards(JSON.parse(m.body))
                    );
                    stompClient.current.subscribe(`/topic/playerBoard`, (m) =>
                        onPlayerBoard(JSON.parse(m.body))
                    );
                }
            });

            // 공용 토픽들
            stompClient.current.subscribe("/topic/playerResources", (msg) =>
                onPlayerResources(JSON.parse(msg.body))
            );
            stompClient.current.subscribe("/topic/validPositions", (msg) => {
                const payload = JSON.parse(msg.body);
                onValidPositions(payload);
            });
            stompClient.current.subscribe("/topic/choiceRequest", (msg) =>
                onChoiceRequest(JSON.parse(msg.body))
            );
            stompClient.current.subscribe("/topic/majorImprovementCards", (msg) =>
                onMajorCards(JSON.parse(msg.body))
            );
            stompClient.current.subscribe("/topic/activeCards", (msg) =>
                onActiveCards(JSON.parse(msg.body))
            );
            stompClient.current.subscribe("/topic/exchangeableCards", (msg) =>
                onExchangeableCards(JSON.parse(msg.body))
            );
            stompClient.current.subscribe("/topic/playerBoard", (msg) => {
                const { playerId, playerBoard } = JSON.parse(msg.body);
                onPlayerBoard({ playerId, playerBoard });
            });
            stompClient.current.subscribe("/topic/turnOrderInfo", (msg) =>
                onActiveCards(JSON.parse(msg.body))
            );
            //연결 완료 시점에서 시작 메시지 전송
            const payload = {
                roomNumber: gameID,
                players: [
                    { id: "1", name: "Player 1" },
                    { id: "2", name: "Player 2" },
                    { id: "3", name: "Player 3" },
                    { id: "4", name: "Player 4" },
                ],
            };
            stompClient.current.send("/app/startGame", {}, JSON.stringify(payload));
            console.log("startGame 메시지 전송:", payload);
        });
    };
    const performAction = ({ playerId, actionId }) => {
        stompClient.current.send(
            "/app/receivePlayerTurn",
            {},
            JSON.stringify({ playerId, cardId: actionId })
        );
    };

    const performRound = ({ playerId, roundSlot }) => {
        stompClient.current.send(
            "/app/receivePlayerTurn",
            {},
            JSON.stringify({ playerId, cardId: roundSlot })
        );
    };
    const sendPosition = ({ playerId, x, y }) => {
        stompClient.current.send(
            "/app/receiveSelectedPosition",
            {},
            JSON.stringify({ playerId, x, y })
        );
    };
    const sendChoice = ({ playerId, choiceType, choice }) => {
        stompClient.current.send(
            "/app/playerChoice",
            {},
            JSON.stringify({ playerId, choiceType, choice })
        );
    };
    const sendCard = ({ playerId, cardId }) => {
        stompClient.current.send(
            "/app/selectedCard",
            {},
            JSON.stringify({ playerId, cardId })
        );
    };
    return {
        connectSocket,
        performAction,
        performRound,
        sendPosition,
        sendChoice,
        sendCard,
    };
}
