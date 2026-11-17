
let customer = "Alex";
let coffee = 120;
let sandwich = 85;
let quantity = 2;

let subtotal = (coffee + sandwich) * quantity;
let discount = subtotal * 0.10;
let total = subtotal - discount;

console.log("================================");
console.log("        ☕ COFFEE CORNER");
console.log("================================");
console.log("Customer:", customer);
console.log("Coffee: ₱", coffee);
console.log("Sandwich: ₱", sandwich);
console.log("Quantity:", quantity);
console.log("--------------------------------");
console.log("Subtotal: ₱" + subtotal.toFixed(2));
console.log("Discount: ₱" + discount.toFixed(2));
console.log("--------------------------------");
console.log("TOTAL: ₱" + total.toFixed(2));
console.log("Thank you for ordering!");
console.log("================================");