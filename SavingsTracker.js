
let savings = 7500;
let goal = 10000;
let weeklySavings = 500;

let remaining = goal - savings;
let progress = (savings / goal) * 100;
let weeks = Math.ceil(remaining / weeklySavings);

console.log("================================");
console.log("       💰 SAVINGS TRACKER");
console.log("================================");
console.log("Current Savings: ₱" + savings);
console.log("Target Goal: ₱" + goal);
console.log("--------------------------------");
console.log("Remaining: ₱" + remaining);
console.log("Progress: " + progress + "%");
console.log("Weeks Needed: " + weeks);
console.log("--------------------------------");

if (savings >= goal) {
    console.log("Congratulations! Goal achieved!");
} else {
    console.log("Keep saving! You're getting closer!");
}

console.log("================================");
