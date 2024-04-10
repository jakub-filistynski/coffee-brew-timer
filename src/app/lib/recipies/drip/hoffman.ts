import { Step } from "@/app/lib/definitions";

export const getHoffmanBetterOneCupMethodSteps = (totalWaterAmount: number): Array<Step> => {
  let stepWaterAmount: number = Math.round(totalWaterAmount / 5)
  return [
    // pre-infusion 0:00-0:45
    { deadline: 10, message: `Add ${stepWaterAmount} g of water in 10 seconds` },
    { deadline: 15, message: "Swirl the drip for 5 seconds" },
    { deadline: 45, message: "Wait for 30 seconds" },
    // 1st batch 0:45-1:10
    { deadline: 55, message: `Add ${stepWaterAmount} g of water in 10 seconds` },
    { deadline: 70, message: "Wait for 15 seconds" },
    // 2nd batch 1:10-1:30
    { deadline: 80, message: `Add ${stepWaterAmount} g of water in 10 seconds` },
    { deadline: 90, message: "Wait for 10 seconds" },
    // 3nd batch 1:30-1:50
    { deadline: 100, message: `Add ${stepWaterAmount} g of water in 10 seconds` },
    { deadline: 110, message: "Wait for 10 seconds" },
    // final batch 1:50-end
    { deadline: 120, message: `Add ${stepWaterAmount} g of water in 10 seconds` },
    { deadline: 125, message: "Gentle swirl the drip for 5 seconds" },
    {
      deadline: 300,
      message:
        "Wait for the water to flow (Ideally, the water should drain to +- 3:00 minutes)",
    }, // The last step without deadline
  ];
};
