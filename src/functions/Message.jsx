import React, { useEffect, useState } from "react";

export default function Message({ message, onAcknowledge }) {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  const ALLOWED_MESSAGES = [
    "농장 단계가 시작되었습니다.",
    "농장 단계가 종료되었습니다.",
    "가족 먹여살리기 단계가 시작되었습니다.",
    "가족 먹여살리기 단계가 종료되었습니다.",
    "라운드가 종료되었습니다. 가족 구성원이 집으로 돌아갑니다.",
  ];

  useEffect(() => {
    if (!message) return;

    // 허용된 메시지가 아니면 무시하고, 다음 메세지로 넘김
    if (!ALLOWED_MESSAGES.includes(message)) {
      if (typeof onAcknowledge === "function") onAcknowledge();
      return;
    }
    if (message === "농장 단계가 시작되었습니다.") {
      setText(
        "농장 단계가 시작되었습니다.\n" +
          "밭에 수확 가능한 곡식이 있는 경우, 각 밭마다 심어진 곡식 1개를 자원으로 추가합니다."
      );
    } else if (message === "가족 먹여살리기 단계가 시작되었습니다.") {
      setText(
        "가족 먹여살리기 단계가 시작되었습니다.\n" +
          "수확 때 태어난 신생아는 음식 1개, 그 외는 음식 2개씩을 차감합니다.\n" +
          "만일 음식이 부족한 경우 자동으로 구걸 카드를 추가합니다."
      );
    } else {
      setText(message);
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (typeof onAcknowledge === "function") onAcknowledge();
    }, 600);

    return () => clearTimeout(timer);
  }, [message, onAcknowledge]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-lg text-center w-[300px] whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
}
