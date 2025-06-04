// src/components/ChoiceManage.jsx
import React from "react";

export default function ChoiceManage({
    show,
    choiceType,
    options = [],
    playerId,
    onSendChoice,
    onClose,
}) {
    if (!show) return null;

    // 버튼 클릭 시 호출되는 내부 함수
    const handleClick = (key) => {
        let payload;

        if (choiceType === "AndOr") {
            const idx = options.findIndex(([k]) => k === key);
            payload = {
                playerId,
                choiceType,
                choice: idx, // 0, 1 또는 2
            };
        } else if (choiceType === "Then") {
            // “Then” 타입: 첫 번째 버튼 클릭 → choice=true, 두 번째 버튼 클릭 → choice=false
            const isFirst = options[0][0] === key;
            payload = {
                playerId,
                choiceType,
                choice: isFirst, // true 또는 false
            };
        } else if (choiceType === "Or") {
            // “Or” 타입: 첫 번째 버튼 클릭 → choice=true, 두 번째 버튼 클릭 → choice=false
            const isFirst = options[0][0] === key;
            payload = {
                playerId,
                choiceType,
                choice: isFirst, // true 또는 false
            };
        } else {
            // 그 외 타입은 처리하지 않음
            return;
        }

        onSendChoice(payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-6 w-[300px]">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    선택해 주세요
                </h2>
                <div className="flex flex-col space-y-2">
                    {options.map(([key, label]) => (
                        <button
                            key={key}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => handleClick(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
