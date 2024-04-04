import { Step } from "@/app/lib/definitions"

export const getHoffmanMethoSteps = (waterAmount: number): Array<Step> => {
    return [
        { message: `Add ${waterAmount} g of water in 10 seconds`, duration: 10 }, // 10
        { message: "Swirl the drip for 5 seconds", duration: 5 }, // 15
        { message: "Wait for 30 seconds", duration: 30 }, // 45
        { message: `Add ${waterAmount} g of water in 15 seconds`, duration: 15 }, // 1:00
        { message: "Wait for 10 seconds", duration: 10 }, // 1:10
        { message: `Add ${waterAmount} g of water in 10 seconds`, duration: 10 }, // 1:20
        { message: "Wait for 10 seconds", duration: 10 }, // 1:30
        { message: `Add ${waterAmount} g of water in 10 seconds`, duration: 10 }, // 1:40
        { message: "Wait for 10 seconds", duration: 10 }, // 1:50
        { message: `Add ${waterAmount} g of water in 10 seconds`, duration: 10 }, // 2:00
        { message: "Gentle swirl the drip for 5 seconds", duration: 5 }, // 2:05
        { message: "Wait for the water to flow (Ideally, the water should drain to +- 3:30 minutes)", duration: -1 }, // The last step without deadline
    ]
}
