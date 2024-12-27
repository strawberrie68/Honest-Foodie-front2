import { calculateAverageRating, sentenceCase } from "../utils/formatHelper";

describe("formatHelper utilities", () => {
  describe("calculateAverageRating", () => {
    test("returns 0 for empty reviews array", () => {
      expect(calculateAverageRating([])).toBe(0);
    });

    test("returns 0 for null reviews", () => {
      expect(calculateAverageRating(null)).toBe(0);
    });

    test("calculates average rating correctly", () => {
      const reviews = [{ rating: 5 }, { rating: 4 }, { rating: 3 }];
      expect(calculateAverageRating(reviews)).toBe(4);
    });

    test("handles decimal averages", () => {
      const reviews = [{ rating: 5 }, { rating: 3 }];
      expect(calculateAverageRating(reviews)).toBe(4);
    });
  });

  describe("sentenceCase", () => {
    test("capitalizes first letter of each word", () => {
      expect(sentenceCase("hello world")).toBe("Hello World");
    });

    test("converts uppercase words to sentence case", () => {
      expect(sentenceCase("HELLO WORLD")).toBe("Hello World");
    });

    test("handles mixed case input", () => {
      expect(sentenceCase("hELLo wORld")).toBe("Hello World");
    });

    test("handles single word", () => {
      expect(sentenceCase("hello")).toBe("Hello");
    });
  });
});
