////////////////////////////////////////////////////
////EXPORTING AND IMPORTING IN ES6 MODULES
//EXPORTING
console.log('Exporting module.');

//Blocking code:
//console.log('Start fetching users.');
//await fetch(`https://jsonplaceholder.typicode.com/users`);
//console.log('Finish fetching users.');

//variables scoped to this module
const shippingCost = 10;
export const cart = []; //imports are a live connection to exports
//two types of exports:
//Named & Default
//Named is simplest:
//(just put export in front of anything we might want to export)
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
//exports need to happen in top level code
//can not be inside another block

//export multiple things with Named Exports
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

//Default exports:
//usually only use when want to export one thing per module
//export the value (not the variable)
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
