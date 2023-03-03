'strict mode';

//FIXING BAD CODE: PART1
/*
//changed all var to const
const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

//was "limits" = not very descriptive
const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

//refactor code for "limit":
const getLimit = user => spendingLimits?.[user] ?? 0;

/*
//use to be "add" = not very descriptive
const addExpense = function (value, description, user = 'jonas') {
  //if (!user) user = 'jonas'; //use native language of default parameter
  user = user.toLowerCase();
  //this var changed to let (because the value changes)
  //let lim;
  //if (spendingLimits[user]) {
  //  lim = spendingLimits[user];
  //} else {
  //  lim = 0;
  //}
  //use turnery operator instead:
  //const limit = spendingLimits[user] ? spendingLimits[user] : 0;
  //optional chaining also good option:
  //const limit = spendingLimits?.[user] ?? 0;
  //use refactor code:
  const limit = getLimit(user);

  if (value <= limit) {
    //with enhanced object literal syntax don't need to repeat same name
    //was: (description: description, user: user)
    //now:
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);
*/
/*
const addExpense = function (value, description, user = 'jonas') {
  user = user.toLowerCase();
  //use refactored code here:
  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
//don't leave console.logs in final code
//console.log(budget);
*/
/*
//was "check" = not very descriptive
const checkExpenses = function () {
  //change "el" for element to "entry"
  for (const entry of budget) {
    //var now let (value changes)
    //let lim;
    //if (spendingLimits[entry.user]) {
    //  lim = spendingLimits[entry.user];
    //} else {
    //  lim = 0;
    //}
    //use optional chaining instead: (or turnery operator if you like)
    //const limit = spendingLimits?.[entry.user] ?? 0;

    //was "-lim" then "limit"
    //use refactored code here:
    //then get rid of curly brackets/block
    if (entry.value < -getLimit(entry.user)) {
      entry.flag = 'limit';
    }
  }
};
checkExpenses();
*/
/*
const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
};
checkExpenses();

console.log(budget);
*/
/*
//bigExpenses to logBigExpenses (more descriptive)
//limit to bigLimit (not the same limit as spending)
const logBigExpenses = function (bigLimit) {
  //var now let (value changes)
  let output = '';
  //el to entry
  for (const entry of budget) {
    if (entry.value <= -bigLimit) {
    //change to template literal
    //output += entry.description.slice(-2) + ' / '; // Emojis are 2 characters
    output += `${entry.description.slice(-2)} / `;
    }
  }
  output = output.slice(0, -2); // Removes last '/ '
  console.log(output);
};
*/
/*
const logBigExpenses = function (bigLimit) {
  let output = '';
  //get rid of if statement (use turnery operator instead)
  //more declaritive:
  for (const entry of budget)
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';

  output = output.slice(0, -2); // Removes last '/ '
  console.log(output);
};

console.log(budget);
logBigExpenses(500);
*/

///////////////////////////////////////////////////////////////
//FIXING BAD CODE: PART2
/*
//arrays are objects
//NOW IMMUTABLE (can no longer put any new properties into it)
//only freezes first level (not a deep freeze)
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
//budget[0].value = 10000;//can change this
//budget[9] = 'jonas'; //can't add a new property

//NOW IMMUTABLE (can no longer put any new properties into it)
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
//spendingLimits.jay = 200;//can't add
//console.log(spendingLimits);//doesn't change

//uses spendingLimits from the outer scope :(
//const getLimit = user => spendingLimits?.[user] ?? 0;
//instead:
const getLimit = (limits, user) => limits?.[user] ?? 0;
//does all of it's work without looking up in the scope chain

//SIDE EFFECT:
//impure function/tries to mutate outside object
//creating error with freeze on budget array:
//const addExpense = function (value, description, user = 'jonas') {
//  user = user.toLowerCase();
//  if (value <= getLimit(user)) {
//    budget.push({ value: -value, description, user });
//  }
//};
//addExpense(10, 'Pizza 🍕');
//addExpense(100, 'Going to movies 🍿', 'Matilda');
//addExpense(200, 'Stuff', 'Jay');
//FIX:
//create a copy and return the copy of the state/data
//PURE FUNCTION:
const addExpense = function (
  state, //budget object
  limits, //spending limits
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();
  ////if (value <= getLimit(cleanUser)) {
  //budget.push({ value: -value, description, user: cleanUser });
  //create a new object based on the state we recieve
  //spread the state, add new object:
  ////return [...state, { value: -value, description, user: cleanUser }];
  ////}
  //use turnery operator to clean up and return original state if code does not run
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
//now have to store return in a variable:
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
//pass in result of previous operation to keep data:
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');
//console.log(newBudget1);
//console.log(newBudget2);
//console.log(newBudget3);
//real world use: composing with technique of currying to create chain of operations here

//DATA TRANFORMATIONS
//for loop
//const checkExpenses = function () {
//  for (const entry of budget)
//    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
//};
//checkExpenses();
//console.log(newBudget3)//violate the principle of immutability
//change to:
const checkExpenses = function (state, limits) {
  //map creates a brand new object/array
  return state.map(entry => {
    //copy the entire entry object & add the flag property to that:
    //else return the original entry
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
  //for (const entry of newBudget3)
  //if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
};
//could also use an arrow function:
//const checkExpenses = (state, limits) =>
//  state.map(entry =>
//    entry.value < -getLimit(limits, entry.user)
//      ? { ...entry, flag: 'limit' }
//      : entry
//  );
//store result in a variable
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

//const logBigExpenses = function (bigLimit) {
//  let output = '';
//  for (const entry of budget)
//    output +=
//      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
//  // Emojis are 2 characters
//
//  output = output.slice(0, -2); // Removes last '/ '
//  console.log(output);
//};

//IMPURE
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  //.reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '')

  console.log(bigExpenses); //creates side effect(every program needs some or no point)
};

logBigExpenses(finalBudget, 500);
*/

/////////////////////////////////////////////////////////////////
//ALL CLEAN:

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
