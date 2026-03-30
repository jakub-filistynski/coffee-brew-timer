import { BrewingStep } from "@/app/lib/definitions";

export const getHoffmanMethoSteps = (
  readyCoffeeMilliliters: number,
): Array<BrewingStep> => {
  // 1 ml ≈ 1 g, so we can use the same numeric value for water grams here.
  const totalWater = Math.round(readyCoffeeMilliliters);
  // There are 5 pour steps in this recipe; split the total water evenly.
  const poursCount = 5;
  const waterPerPour = Math.round(totalWater / poursCount);

  return [
    { message: `Add ${waterPerPour} g of water in 10 seconds`, deadline: 10 }, // 10
    { message: "Swirl the drip for 5 seconds", deadline: 15 }, // 15
    { message: "Wait for 30 seconds", deadline: 45 }, // 45
    { message: `Add ${waterPerPour} g of water in 15 seconds`, deadline: 60 }, // 1:00
    { message: "Wait for 10 seconds", deadline: 70 }, // 1:10
    { message: `Add ${waterPerPour} g of water in 10 seconds`, deadline: 80 }, // 1:20
    { message: "Wait for 10 seconds", deadline: 90 }, // 1:30
    { message: `Add ${waterPerPour} g of water in 10 seconds`, deadline: 100 }, // 1:40
    { message: "Wait for 10 seconds", deadline: 110 }, // 1:50
    { message: `Add ${waterPerPour} g of water in 10 seconds`, deadline: 120 }, // 2:00
    { message: "Gentle swirl the drip for 5 seconds", deadline: 125 }, // 2:05
    {
      message:
        "Wait for the water to flow (Ideally, the water should drain to +- 3:30 minutes)",
      deadline: 210,
    }, // The last step without deadline
  ];
};
