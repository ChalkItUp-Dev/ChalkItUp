import { describe, expect, it } from "vitest";

// Einfache Summe-Funktion
export function sum(a: number, b: number): number {
    return a + b;
}

// Unit-Test für die Summe-Funktion
describe("sum function", () => {
    it("should add two numbers correctly", () => {
        expect(sum(2, 3)).toBe(5);
    });

    it("should return a number", () => {
        expect(typeof sum(2, 3)).toBe("number");
    });
});
