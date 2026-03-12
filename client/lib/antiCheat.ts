/**
 * Anti-cheat utilities for Case File Decoder
 * Answers are encoded to prevent easy source code inspection
 * Uses UTF-8 safe base64 encoding for Vietnamese characters
 */

/**
 * UTF-8 safe base64 encoding
 */
const encodeToBase64 = (str: string): string => {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str);
  }
};

/**
 * UTF-8 safe base64 decoding
 */
const decodeFromBase64 = (str: string): string => {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return atob(str);
  }
};

export const PUZZLE_ANSWERS = {
  puzzle1: encodeToBase64("KN-NT-CC-VT"),
  puzzle2: encodeToBase64("2|3|8"),
  puzzle3: encodeToBase64("kim chỉ nam"),
  puzzle4: encodeToBase64("TTCP3"),
};

/**
 * Validate puzzle answer by comparing with encoded value
 */
export const validateAnswer = (
  puzzleId: keyof typeof PUZZLE_ANSWERS,
  userInput: string
): boolean => {
  const encodedInput = encodeToBase64(userInput.trim());
  return encodedInput === PUZZLE_ANSWERS[puzzleId];
};

/**
 * Get unencoded answer (for game logic only, not exposed in UI)
 */
export const getAnswer = (puzzleId: keyof typeof PUZZLE_ANSWERS): string => {
  return decodeFromBase64(PUZZLE_ANSWERS[puzzleId]);
};

/**
 * Evidence tracking interface
 */
export interface EvidenceItem {
  id: string;
  label: string;
  value: string;
  unlockedAt?: number;
  isCorrect: boolean;
}

/**
 * Format evidence for display
 */
export const formatEvidenceValue = (value: string): string => {
  return value
    .split("|")
    .map((v) => v.trim())
    .join(" → ");
};
