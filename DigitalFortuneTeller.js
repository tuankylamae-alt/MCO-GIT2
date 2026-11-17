
const fortunes = [
    "Great opportunities are coming your way!",
    "Your hard work will soon pay off.",
    "Today is your day to shine!",
    "A new adventure is waiting for you.",
    "Believe in yourself. You are capable of more!"
];

let random = Math.floor(Math.random() * fortunes.length);

console.log("================================");
console.log("       🔮 FORTUNE TELLER 🔮");
console.log("================================");
console.log("Your Fortune:");
console.log(fortunes[random]);
console.log("================================");
