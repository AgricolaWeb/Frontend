import "./App.css";
import ResourceBoard from "./boards/ResourceBoard";
import PersonalBoard from "./boards/PersonalBoard";
import CurrentRoundBoard from "./boards/CurrentRoundBoard";
import MajorBoard from "./boards/MajorBoard";
import useSocket from "./functions/Socket";
import { useState, useEffect } from "react";
import RoundBoard from "./boards/RoundBoard";
import ActionBoard from "./boards/ActionBoard";
import ProfileBoard from "./boards/ProfileBoard";
import usePlacementManager from "./functions/PlacementManager";
import CardBoard from "./boards/CardBoard";
import ChoiceManage from "./functions/ChoiceManage";
import CardChoice from "./functions/CardChoice";
import ActiveBoard from "./boards/ActiveBoard";
import Message from "./functions/Message";
import EndGame from "./functions/EndGame";
import BuildFence from "./functions/BuildFence";
function App() {
  const [started, setStarted] = useState(false);
  const [currentRound, setCurrentRound] = useState(null);
  const [openedCards, setOpenedCards] = useState([]);
  const [accumulatedResources, setAccumulatedResources] = useState([]);
  const [turnOrder, setTurnOrder] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const [currentResources, setCurrentResources] = useState({});
  const [availableCards, setAvailableCards] = useState([]);
  const [majorImprovementCards, setMajorImprovementCards] = useState([]);
  const [minorCards, setMinorCards] = useState([]);
  const [occupationCards, setOccupationCards] = useState([]);
  const [majorCards, setMajorCards] = useState([]);
  const [activeCards, setActiveCards] = useState([]);
  const [validPositions, setValidPositions] = useState([]);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [choiceType, setChoiceType] = useState(null);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [choicePlayerId, setChoicePlayerId] = useState(null);
  const [showCardChoice, setShowCardChoice] = useState(false);
  const [cardOptions, setCardOptions] = useState([]);
  const [messageQueue, setMessageQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [myBoardData, setMyBoardData] = useState({});
  const [actionType, setActionType] = useState(null);
  const [scoreList, setScoreList] = useState([]);

  const handleGameState = (payload) => {
    console.log("게임 진행..", payload);

    if (typeof payload.message === "string") {
      setMessageQueue((prev) => [...prev, payload.message]);
    }
    if (payload.turnOrder) {
      setTurnOrder(payload.turnOrder);
    }
    if (typeof payload.message === "string") {
      setMessageQueue((prev) => [...prev, payload.message]); //메세지 큐
    }
    if (payload.currentRound != null) {
      setCurrentRound(payload.currentRound);
    }
    if (
      typeof payload.score === "number" &&
      typeof payload.playerId === "string"
    ) {
      setScoreList((prev) => {
        const exists = prev.some((s) => s.playerId === payload.playerId);
        if (exists) return prev;
        return [...prev, { playerId: payload.playerId, score: payload.score }];
      });
    } //점수를 받아와서 리스트에 저장
    if (payload.type === "cards" && Array.isArray(payload.data)) {
      //카드 선택지가 발생한경우
      setCardOptions(payload.data);
      setShowCardChoice(true);
      setChoicePlayerId(payload.playerId);
      return;
    }

    if (Array.isArray(payload.accumulatedResources)) {
      setAccumulatedResources(payload.accumulatedResources);
    }
    if (Array.isArray(payload.openedCards)) {
      setOpenedCards(payload.openedCards);
    }
    if (payload.playerId) {
      setCurrentPlayerId(payload.playerId);
    }
    if (Array.isArray(payload.availableCards)) {
      setAvailableCards(payload.availableCards.map((c) => c.id));
    }
    if (Array.isArray(payload.majorImprovementCards)) {
      setMajorImprovementCards(payload.majorImprovementCards);
    }
    if (payload.resources) {
      setCurrentResources(payload.resources);
    }
    if (Array.isArray(payload.occupationCards)) {
      setOccupationCards(payload.occupationCards);
    }
    if (Array.isArray(payload.majorCards)) {
      setMajorCards(payload.majorCards);
    }
    if (Array.isArray(payload.minorImprovementCards)) {
      setMinorCards(payload.minorImprovementCards);
    }
    if (Array.isArray(payload.activeCards)) {
      setActiveCards(payload.activeCards);
    }
  };

  const handlePlayerResources = (payload) => {
    console.log("플레이어의 자원 정보", payload);
  };

  const handleValidPositions = (payload) => {
    console.log("단일 좌표 처리 요청..", payload);
    if (Array.isArray(payload.validPositions)) {
      setValidPositions(payload.validPositions);
    }
  };
  const handleSendFencePosition = ({ playerId, positions }) => {
    console.log("울타리 전송 →", { playerId, positions });
    sendFencePosition({ playerId, positions });
  };

  const handleChoiceRequest = (payload) => {
    console.log("선택지가 발생하였습니다→", payload);
    if (!payload.choiceType || !payload.options || !payload.playerId) {
      return;
    }
    setChoiceType(payload.choiceType);

    setChoiceOptions(Object.entries(payload.options));
    setChoicePlayerId(payload.playerId);
    setShowChoiceModal(true);
  };
  const handleSendChoice = (choicePayload) => {
    sendChoice(choicePayload);
  };
  const handleCloseModal = () => {
    setShowChoiceModal(false);
    setChoiceType(null);
    setChoiceOptions([]);
    setChoicePlayerId(null);
  };

  const handleMajorCards = (payload) => {
    console.log("📩 /topic/majorImprovementCards →", payload);
  };

  const handleActiveCards = (payload) => {
    console.log("활성화 된 카드", payload);
    if (payload.actionType === "buildFence") {
      console.log("🔥 액션 타입 설정됨 → buildFence");
      setActionType("buildFence");
    }
  };

  const handleExchangeableCards = (payload) => {
    console.log("📩 /topic/exchangeableCards →", payload);
  };

  const handlePlayerBoard = (payload) => {
    setMyBoardData(payload.playerBoard);
    console.log("📩 개인보드다아아너아런아ㅣ", payload);
  };
  const handleSendPosition = ({ playerId, x, y }) => {
    console.log("선택한 단일 좌표->", { playerId, x, y });
    sendPosition({ playerId, x, y });
    setValidPositions([]); // 클릭후 validPositions 초기화
  };
  const resetActionType = () => {
    setActionType(null);
  };

  const {
    connectSocket,
    performAction,
    performRound,
    sendPosition,
    sendFencePosition,
    sendChoice,
    sendCard,
  } = useSocket(
    handleGameState,
    handlePlayerResources,
    handleValidPositions,
    handleChoiceRequest,
    handleMajorCards,
    handleActiveCards,
    handleExchangeableCards,
    handlePlayerBoard
  );

  const handleStart = () => {
    connectSocket();
    setStarted(true);
  };

  const handleSendCard = ({ playerId, cardId }) => {
    console.log("카드 선택 이후 전송되는 카드", { playerId, cardId });
    sendCard({ playerId, cardId });
    setShowCardChoice(false);
    setCardOptions([]);
  };

  const handleCloseCardChoice = () => {
    setShowCardChoice(false);
    setCardOptions([]);
  };
  const {
    actionPlacements,
    roundPlacements,
    handleActionSelect,
    handleRoundSelect,
  } = usePlacementManager(currentRound, performAction, performRound); //라운드가 변경되지 않으면 행동보드, 라운드 보드내 가족 구성원 이동 기록

  useEffect(() => {
    if (currentMessage === null && messageQueue.length > 0) {
      // currentMessage는 현재 보여지는 메세지
      setCurrentMessage(messageQueue[0]);
      setMessageQueue((prev) => prev.slice(1));
    }
  }, [messageQueue, currentMessage]);

  // 팝업 닫고 useEffet로 다음큐 진행..
  const handleAcknowledge = () => {
    setCurrentMessage(null);
  };
  const handleEndGame = () => {
    console.log("게임을 종료합니다.");
  };
  return (
    <div className="relative w-screen h-screen  min-w-[1150px] min-h-[730px] p-4">
      <img
        src="/image/background.png"
        alt="배경"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <EndGame
        currentRound={currentRound}
        scoreList={scoreList}
        totalPlayers={4}
        onEndGame={handleEndGame}
      />
      <Message message={currentMessage} onAcknowledge={handleAcknowledge} />

      <CardChoice
        show={showCardChoice}
        cards={cardOptions}
        playerId={choicePlayerId}
        onSendCard={handleSendCard}
        onClose={handleCloseCardChoice}
      />
      <ChoiceManage
        show={showChoiceModal}
        choiceType={choiceType}
        options={choiceOptions}
        playerId={choicePlayerId}
        onSendChoice={handleSendChoice}
        onClose={handleCloseModal}
      />

      {!started && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-startButtonBack text-startButtonFont text-2xl tracking-wider rounded-lg shadow-lg font-cinzel font-extrabold"
          >
            AGRICOLA START!
          </button>
        </div>
      )}

      <div className={started ? "relative z-10" : "filter blur-md"}>
        <div className="grid grid-cols-[1.5fr_3fr_3fr_3fr] grid-rows-[1fr_1fr_4fr] gap-3 h-full">
          <div className="col-start-1 row-start-1 row-span-3 p-2">
            <CurrentRoundBoard currentRound={currentRound} />
          </div>
          <div className="col-start-2 row-start-1 row-span-3">
            <ActionBoard
              accumulatedResources={accumulatedResources}
              onSelectAction={(id) =>
                handleActionSelect(id, availableCards, currentPlayerId)
              }
              placedSlots={actionPlacements}
            />
          </div>
          <div className="col-start-3 col-span-2 row-start-1 row-span-3">
            <RoundBoard
              openedCards={openedCards}
              onSelectRound={(id) =>
                handleRoundSelect(
                  id,
                  openedCards,
                  availableCards,
                  currentPlayerId
                )
              }
              placedRounds={roundPlacements}
            />
          </div>
          <div className="col-start-3 col-span-3 row-start-3 p-2">
            <ActiveBoard activeCards={activeCards} />
          </div>
          <div className="col-start-1 row-start-2 row-span-2 pt-4">
            <ProfileBoard
              turnOrder={turnOrder}
              currentPlayerId={currentPlayerId}
            />
          </div>
          <div className="col-start-1 row-start-4 row-span-2 pt-2">
            <ResourceBoard
              playerId={currentPlayerId}
              resources={currentResources}
            />
          </div>
          <div className="col-start-2 row-start-4 row-span-2 pt-2">
            {actionType === "buildFence" ? (
              <BuildFence
                playerId={currentPlayerId}
                playerBoard={myBoardData}
                sendFencePosition={handleSendFencePosition}
                onFinish={resetActionType}
              />
            ) : (
              <PersonalBoard
                validPositions={validPositions}
                playerId={currentPlayerId}
                actionType={actionType}
                sendPosition={handleSendPosition}
                sendFencePosition={handleSendFencePosition}
                playerBoard={myBoardData}
              />
            )}
          </div>
          <div className="col-start-3 row-start-4 row-span-2 pt-2">
            <CardBoard
              minorImprovementCards={minorCards}
              occupationCards={occupationCards}
              majorImprovementCards={majorCards}
            />
          </div>
          <div className="col-start-4 row-start-4 row-span-2 pt-2">
            <MajorBoard majorImprovementCards={majorImprovementCards} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
