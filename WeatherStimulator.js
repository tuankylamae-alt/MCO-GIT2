
let city = "Manila";
let temperature = 34;

console.log("================================");
console.log("       🌤️ WEATHER REPORT");
console.log("================================");
console.log("City:", city);
console.log("Temperature:", temperature + "°C");
console.log("--------------------------------");

if (temperature >= 35) {
    console.log("Weather: EXTREMELY HOT");
    console.log("Advice: Stay indoors and hydrate!");
} else if (temperature >= 30) {
    console.log("Weather: HOT");
    console.log("Advice: Wear light clothing.");
} else if (temperature >= 20) {
    console.log("Weather: PLEASANT");
    console.log("Advice: Enjoy your day outside!");
} else {
    console.log("Weather: COLD");
    console.log("Advice: Wear something warm!");
}

console.log("================================");
