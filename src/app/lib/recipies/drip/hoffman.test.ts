import { describe, expect, it } from "vitest";
import { getHoffmanMethoSteps } from "@/app/lib/recipies/drip/hoffman";

describe("getHoffmanMethoSteps", () => {
  it("returns all expected recipe steps with fixed deadlines", () => {
    const steps = getHoffmanMethoSteps(250);

    expect(steps).toHaveLength(12);
    expect(steps.map((step) => step.deadline)).toEqual([
      10, 15, 45, 60, 70, 80, 90, 100, 110, 120, 125, 210,
    ]);
  });

  it("uses per-pour water amount derived from total milliliters", () => {
    const steps = getHoffmanMethoSteps(250);

    expect(steps[0].message).toContain("Add 50 g of water");
    expect(steps[3].message).toContain("Add 50 g of water");
    expect(steps[9].message).toContain("Add 50 g of water");
  });

  it("rounds total water and per-pour values", () => {
    const steps = getHoffmanMethoSteps(253.4);

    // totalWater -> 253, waterPerPour -> round(253 / 5) = 51
    expect(steps[0].message).toContain("Add 51 g of water");
  });
});
