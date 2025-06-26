const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    // get form values
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id:Date.now(),
        description,
        amount
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.requestFullscreen();
}

function updateTransactionList() {
    transactionListEl.innerHTML = "";

    // most recent first
    const sortedTransactions = [...transactions].reverse()

    //add each transaction to teh list
    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction)
        transactionListEl.appendChild(transactionEl)
    })
}

function createTransactionElement(transaction) {
    const li = document.createElement("li")
    li.classList.add("transaction")
    li.classList.add(transaction.amount > 0 ? "income" : "expense")

    location.innerHTML = `
    <span>${transaction.description}</span>
    <span>${transaction.amount}</span>
    `
}