import { describe, expect, it } from "vitest";

export function sum(a: number, b: number): number {
    return a + b;
}

describe("sum function", () => {
    it("should add two numbers correctly", () => {
        expect(sum(2, 3)).toBe(5);
    });

    it("should return a number", () => {
        expect(typeof sum(2, 3)).toBe("number");
    });
});
