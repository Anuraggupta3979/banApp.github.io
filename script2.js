"use strict";
const account1 = {
  owner: "ANURAG GUPTA",
  movements: [200, 400, 500, -300, -284, 30000, 778, 567],
  intrestRate: 1.2,
  pin: 3979,
};
const account2 = {
  owner: "GAGAN GUPTA",
  movements: [2000, 443, 500, -300, -284, 3000],
  intrestRate: 1.1,
  pin: 2604,
};
const account3 = {
  owner: "PIYUSH GUPTA",
  movements: [200, 400, 5532, -300, -284, 3000],
  intrestRate: 1.4,
  pin: 1998,
};
const account4 = {
  owner: "Anusha GUPTA",
  movements: [200, 400, 5532, -300, -284, 3000],
  intrestRate: 1.6,
  pin: 2221,
};

const accounts = [account1, account2, account3, account4];
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displaypage = function (movements) {
  containerMovements.innerHTML = "";

  movements.forEach(function (n, i) {
    const type = n > 0 ? "deposit" : "withdrawal";
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        
        <div class="movements__value">${n} ₹</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, i) => acc + i);
  //  console.log(balance)
  labelBalance.textContent = `${balance} ₹`;
};

const displayWelcome = function (acc) {
  labelWelcome.textContent = `Welcome Again ! , ${acc.owner.split(" ")[0]} `;
};

const displaySummary = function (acc) {
  const sumin = acc.movements.filter((n) => n > 0).reduce((acc, i) => acc + i);
  labelSumIn.textContent = `${sumin} ₹`;

  const sumout = acc.movements.filter((n) => n < 0).reduce((acc, i) => acc + i);
  labelSumOut.textContent = `${sumout} ₹`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.intrestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} ₹`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  displayWelcome(acc);
  // Display movements
  displaypage(acc.movements);

  // Display balance
  displayBalance(acc);

  // Display summary
  displaySummary(acc);
};

let currentaccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentaccount = accounts.find(
    (acc) =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
  );
  console.log(currentaccount);
  if (currentaccount) {
    updateUI(currentaccount);
  }
});
