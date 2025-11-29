import {
  highlightFirstVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  highlightFourthVideo,
} from "./utils";

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Enter A17 Pro.",
      "Game‑changing chip.",
      "Groundbreaking performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 15, // Duration in seconds
  },
  {
    id: 2,
    textLists: ["Titanium.", "So strong. So light. So Pro."],
    video: highlightSecondVideo,
    videoDuration: 13,
  },
  {
    id: 3,
    textLists: [
      "iPhone 15 Pro Max.",
      "Longest optical zoom",
      "in iPhone ever.",
    ],
    video: highlightThirdVideo,
    videoDuration: 12,
  },
  {
    id: 4,
    textLists: ["All-new Action button.", "What will yours do?"],
    video: highlightFourthVideo,
    videoDuration: 13,
  },
];