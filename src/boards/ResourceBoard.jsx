import React from "react";

const staticResourceDefaults = {
    adult: 2,
    minority: 0,
    fence: 15,
    barn: 4,
};

const RESOURCE_KEYS = [
    "wood",
    "clay",
    "stone",
    "food",
    "grain",
    "sheep",
    "adult",
    "minority",
    "fence",
    "barn",
];

export default function ResourceBoard({ playerId, resources = {} }) {
    const merged = RESOURCE_KEYS.map((key) => {
        let count;
        if (["wood", "clay", "stone", "food", "grain", "sheep"].includes(key)) {
            count = resources[key] ?? 0;
        } else {
            count = staticResourceDefaults[key] ?? 0;
        }
        return { key, count };
    });

    const rows = [];
    for (let i = 0; i < merged.length; i += 2) {
        rows.push(merged.slice(i, i + 2));
    }

    return (
        <div>
            {rows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex gap-5 pl-3 p-2 ml-2 mr-2 bg-gray-200"
                >
                    {row.map((res) => {
                        let imgSrc = "";
                        // 동적 자원(wood, clay, stone, food, grain, sheep)
                        if (
                            [
                                "wood",
                                "clay",
                                "stone",
                                "food",
                                "grain",
                                "sheep",
                            ].includes(res.key)
                        ) {
                            imgSrc = `/image/${res.key}.png`;
                        } else if (["adult", "minority"].includes(res.key)) {
                            imgSrc = `/image/player/player_${playerId}.png`;
                        } else if (res.key === "fence") {
                            imgSrc = `/image/player/fence_${playerId}.png`;
                        } else if (res.key === "barn") {
                            imgSrc = `/image/player/barn_${playerId}.png`;
                        }

                        return (
                            <div key={res.key} className="flex items-center gap-2">
                                <img src={imgSrc} alt={res.key} className="w-7 h-7" />
                                <span>{res.count}</span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
