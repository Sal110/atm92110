#! /usr/bin/env node

import inquirer from "inquirer";

let myBalance: number = 10000; // Dollar
let myPin: number = 1234;

async function main() {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter your pin",
            type: "number",
        },
    ]);

    if (pinAnswer.pin === myPin) {
        console.log("Access Granted");
        let operationAns = await inquirer.prompt([
            {
                name: "operation",
                message: "Select operation",
                type: "list",
                choices: ["Deposit", "Withdraw", "Balance", "Fast Cash", "Exit"], // Added "Fast Cash" option
            },
        ]);
        console.log("Selected operation: ", operationAns.operation);

        if (operationAns.operation === "Withdraw") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter amount to withdraw",
                    type: "number",
                },
            ]);
            processWithdrawal(amountAns.amount as number); // Ensure 'amount' is treated as a number
        }
        else if (operationAns.operation === "Deposit") {
            let depositAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter amount to deposit",
                    type: "number",
                },
            ]);
            processDeposit(depositAns.amount as number); // Ensure 'amount' is treated as a number
        }
        else if (operationAns.operation === "Balance") {
            console.log(`Your current balance is $${myBalance}`);
        }
        else if (operationAns.operation === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Select Fast Cash amount",
                    type: "list",
                    choices: [3000, 5000, 8000, 10000],
                },
            ]);
            processWithdrawal(fastCashAns.amount as number); // Ensure 'amount' is treated as a number
        }
        else if (operationAns.operation === "Exit") {
            console.log("Exiting ATM. Goodbye!");
        }
    }
    else {
        console.log("Incorrect PIN. Access Denied.");
    }
}

function processWithdrawal(amount: number) {
    if (amount > myBalance) {
        console.log("Insufficient funds!");
    }
    else {
        myBalance -= amount;
        console.log(`Withdrawn $${amount}. Remaining balance: $${myBalance}`);
    }
}

function processDeposit(amount: number) {
    myBalance += amount;
    console.log(`Deposited $${amount}. Current balance: $${myBalance}`);
}

main(); // Call the main function to start the ATM application
