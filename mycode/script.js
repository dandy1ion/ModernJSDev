/////////////////////////////////////////////////
//All modules executed in strict mode by default
//Module=reusable piece of code that encapsulates implementation details
//usually a standalone file, but it doesn't have to be
//export=public API(consumed by import(dependency))
//code base is larger, advantage to use modules
//Compose software: modules are small building blocks that we put together
//to build complex applications
//Isolate components: modules can be developed in isolation without thinking
//about the entire codevase
//Abstract code: Implement low-level code in modules and import these
//abstractions into other modules
//Organized code: modules naturally lead to a more organized codebase
//Reuse code: modules allow us to easily reuse the same code
//even across multiple projects (self contained&reusable)
//Native JavaScript (ES6) Modules:
//modules stored in files, exactly one module per file
//////////////////////////////////////////////////
////EXPORTING AND IMPORTING IN ES6 MODULES
//IMPORTING
//string with location (./current folder)
//in html script must specify type = "module"
//import { addToCart, totalPrice as price, tq } from './shoppingCart';
//auto gets rid of .js
//addToCart('bread', 5);
//console.log(price, tq);
//variables scoped to the module they are in
//can't do this:
//console.log(shippingCost);

console.log('Importing module.');
//have to use a local server to work

//import all the exports of a module at the same time
///import * as ShoppingCart from './shoppingCart.js'; //must have the .js
//creates object containing everything that is exported from the module we specify
///ShoppingCart.addToCart('bread', 5);
//like an object created from a class (has properties and methods)
///console.log(ShoppingCart.totalPrice);
//a module exports a public API (everything else stays private inside the module)

//import default export:
//name it whatever you want
//import add from './shoppingCart.js'; //must have the .js
//usually don't import from same module twice (thus others commented out)
//add('pizza', 2);

//can also do a mix of named and default exports (usually not used)
//import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
//add('pizza', 2);
//console.log(price);

//imports are a live connection to exports (NOT just a copy)
//- point to same point in memory
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); //now empty array has the items added

/*
//////////////////////////////////////////
//TOP-LEVEL AWAIT
//normally would write async function(){...};
//can now use the await keyword outside of async functions in modules
//ONLY WORKS IN MODULES
///console.log('Start fetching');
///const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
///const data = await res.json();
///console.log(data); //array of 100 posts
//blocks execution of the entire module now
///console.log('Something');
//takes up more time
//use with caution

//real world use:
const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  console.log(data);
  //return new object {} with properties title: & text: from last post title & body
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); //Promise returned not the object(async function returns a promise)

//Not very clean
//lastPost.then(last => console.log(last)); //get the object

//use top level await:
const lastPost2 = await getLastPost();
console.log(lastPost2); //get the object

//if one module imports a module which has a top-level await,
//then the importing module will wait for the imported module
//to finish the blocking code


/////////////////////////////////////////////////////
//THE MODULE PATTERN
//just like in regular modules, the main goal of the module pattern
//is to encapsulate functionality, to have private data, and to expose a public API
//best way to achieve all of that is by simply using a function
//functions give private data by default and return values(which can become public API)
//usually use an IIFE
//purpose is to create a new scope and return data just once
//assign result of running the IIFE to a variable (store the return data)
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost}.)`
    ); //closures
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier.`);
  };

  //return an object contain the things you want to make public
  return {
    addToCart, //closures
    cart,
    totalPrice,
    totalQuantity,
  };
})();
//closures: allow a function to have access to all the variables
//that were present at its birthplace
ShoppingCart2.addToCart('apple', 4); //cart still accessable
ShoppingCart2.addToCart('pizza', 2);
//can not access anything in module in console (scoped to the module it's in)
//must use a console.log();
console.log(ShoppingCart2);
//still can not access private properties
//console.log(ShoppingCart2.shippingCost);

//Problem: if wanted one module per file,
//then we would have to create different scripts
//& link all of them in the HTML file
//careful with the order in which we declate them in HTML file
//& would have all of the variables living in the global scope
//we couldn't bundle them together using a module bundler
*/

///////////////////////////////////////////////////////////
//COMMONJS MODULES //wont work except in Node.js
//rely on some external implementations
//examples: AMD Modules & CommonJS Modules
//used in Node.js
//one file is one module

//Export
//export.addToCart = function (product, quantity) {
//    cart.push({ product, quantity });
//    console.log(
//      `${quantity} ${product} added to cart (shipping cost is ${shippingCost}.)`
//    ); //closures
//};
//Import
//const { addToCart } = require('./shoppingCart.js');

//ES6 Modules will someday replace all of this

////////////////////////////////////////////////////////////
//A BRIEF INTRODUCTION TO THE COMMAND LINE (terminal/command prompt)
//moving around in the file system
//creating files and folders
//copying files
//can't live without the command line :)

//first thing to know:
//you are always in a folder:
//right now in project folder:
//C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master\17-Modern-JS-Modules-Tooling\mycode>

//from this location in the file system we can move up and down using commands
//ls (MACios) dir (Windows) = shows directory of current folder
//cd (Change Directory) = move directions
//.. = go up
//result =
//C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master\17-Modern-JS-Modules-Tooling>

//.. = go up (again)
//result = C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master>
//dir = directory

//move to a desired folder (don't need to type full name just hit tab key)
//cd 13-Advanced-DOM-Bankist
//result =
//C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master\13-Advanced-DOM-Bankist>

//dir
//see files & folders
//cd mycode
//dir
//see files & folders
//cd img (check out folder with images)
//dir (see all the image files)
//C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master\13-Advanced-DOM-Bankist\mycode\img>

//move up two levels
//cd ../..
//C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master\13-Advanced-DOM-Bankist>

//clear console
//clear
//???'clear' is not recognized as an internal or external command,
//??? operable program or batch file.

//go back to current project folder
//cd ..
//dir
//cd 17 (tab to auto complete)
//C:\Users\14357\Downloads\complete-javascript-course-master\
//complete-javascript-course-master\17-Modern-JS-Modules-Tooling>

//create a folder
//mkdir (Make a directory)
//mkdir TEST
//dir (see new folder)
//move to new folder
//cd TEST

//create files (empty for now)
//touch (on MACios) echo > (Windows)
//echo > index.html
//echo > script.js
//call live server
//live-server (opens new browser window)
//ctrl c (to close)

//use arrow key (up and down) as many times as want to see past commands

//create multiple files at once????
//doesn't work with echo...
//echo > jonas.js
//echo > bankist.js
//echo > mapty.js
//dir (see new files)

//delete files
//rm (MACios) del (Windows)
//can do multiple files at once
//del script.js jonas.js
//dir (see last files)

//move a file to the parent folder
//the file to be moved and the location to move it to
//move mapty.js ../
//go up a folder
//cd ..
//dir
//see mapty.js here now

//delete a folder
//rmdir (remove directory) --only works for empty directories
//rmdir TEST

//on MACios:
//remove folder with items in it
//rm (remove) -(fleck) R(Recursive) name of directory
//rm -R TEST

/////////////////////////////////////////////////////////
//INTRODUCTION TO NPM
//NODE PACKAGE MANAGER
//both software on computer and a package repository
//manage dependencies better
//npm -v in terminal (see version/know working)

//include cloneDeep.js
//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//with bundler:
import cloneDeep from 'lodash-es/cloneDeep.js';
//or this: import cloneDeep from 'lodash-es';

//hard to copy a nested object
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
//Lodash function
const stateDeepClone = cloneDeep(state);
console.log(stateClone);
state.user.loggedIn = false;
console.log(stateClone); //loggedIn: false

console.log(stateDeepClone); //loggedIn: true

//////////////////////////////////////////////////////
//BUNDLING WITH PARCEL AND NPM SCRIPTS
//now every time we save our file it will reload in the parcel server
//(just like live server)
//terminal: npx parcel index.html

//HOT MODULE REPLACEMENT
//only parcel understands this = not in final code
if (module.hot) {
  module.hot.accept();
}
//change module triggers a rebuild but that new modified module
//will, like magic, get injected into the browser
//without triggering a whole page reload

//////////////////////////////////////////////////////
//CONFIGURING BABEL AND POLYFILLING

//automatically transpiled with BABEL:
//auto makes syntax changes
class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonass');

//nullish-coalescing-operator
console.log('Jonas' ?? null);

//new features need to be pollyfilled:
//ES6 find method
console.log(cart.find(el => el.quantity >= 2));

//ES6 promises
Promise.resolve('TEST').then(x => console.log(x));

//import library for pollyfill
//manually add first in terminal: npm i core-js
import 'core-js/stable';
//reduce bundle size:
//import 'core-js/stable/array/find';
//import 'core-js/stable/promise';
//pollyfill recreates the function (ex find) and makes it available to this bundle
//search Array.prototype.find in bundled .js file
//where all the array methods are put
//Promise pollyfilled another way

//install regenerator-runtime
//terminal: npm i regenerator-runtime
//for POLYFILLING ASYNC FUNCTIONS
import 'regenerator-runtime/runtime';
//***usually put all imports at top of file***
