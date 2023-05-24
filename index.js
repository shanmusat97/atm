var username,
    correct_pass = (/^[0-9]{4}$/),
    passTry = 3,
    currentBalance = 35000;
    
// Input a username
function atmMachineUsername() {
    username = prompt("Enter your name");
    if (username !== "" && username !== null) {
        atmMachinePassword();
    }else if(username===null){
        return;
    } else {
        atmMachineUsername();
    }
}
// Input a valid password
function atmMachinePassword() {
    var pswEntry = parseInt(prompt("Dear " + username + ", enter your 4 digit PIN"));
    checkPassword(pswEntry);
}
// Verify Password meets requirements
function checkPassword(userInput) {
    if (correct_pass.test(userInput)){
        selectAccountType();
    } else {
        while (!(correct_pass.test(userInput))) {
            if (passTry === 1) {
                alert("Incorrect PIN.");
                alert("Maximum tries exceeded! Your account has been locked. Contact your bank for support."); 
                exit();
                break;
            } else {
                passTry -= 1;
                alert("Incorrect PIN. Please try again.");
                alert("You have " + passTry + " chance/s to try");
                atmMachinePassword();
            }
        }
    }
}
// Select Which account type to use
function selectAccountType() {
    var accountType = parseInt(prompt(`Which type of account do you have? 
     1. Savings 
     2. Current 
     3. Credit`));
    if (accountType !== "" && accountType !== null && !isNaN(accountType)) {
        selectFunction();
    } else {
        alert("Please make a valid selection");
        selectAccountType();
    }
}
// Select what the user wishes to do
function selectFunction() {
    var atmFunctions = parseInt(prompt(`Hello ${username}, what can we do for you today? 
    1. Balance Inquiry
    2. Cash Withdrawal 
    3. Cash Deposit 
    4. Exit`));
    if (atmFunctions !== "" && atmFunctions !== null && !isNaN(atmFunctions)) {
        switch (atmFunctions) {
            case 1:
                inquiry();
                break;
            case 2:
                withdrawal();
                break;
            case 3:
                deposit();
                break;
            case 4:
                exit();
                break;
            default:
                alert("Please make a valid selection");
                selectFunction();
        }
    } else {
        alert("Please make a valid selection");
        selectFunction();
    }
}
// Inquiry
function inquiry() {
    alert(`Your current balance is Rs. ${currentBalance}`);
    toContinue();
}
// Deposit
function deposit() {
    var depositAmount = parseInt(prompt("How much do you want to deposit?"));
    if (depositAmount !== "" && depositAmount !== null && !isNaN(depositAmount)) {
        currentBalance += depositAmount;
        alert("You have successfully deposited Rs." + depositAmount + "\n" + "You now have Rs." + currentBalance);
        toContinue();
    } else {
        alert("Error: please enter a number!");
        deposit();
    }
}
// Withdrawal
function withdrawal() {
    var withdrawalAmount = parseInt(prompt("How much do you want to withdraw? \n" + "The minimum amount you can withdraw is Rs.1000"));
    if (withdrawalAmount !== "" && withdrawalAmount !== null && !isNaN(withdrawalAmount)) {
        if (withdrawalAmount >= 1000) {
            if (withdrawalAmount <= currentBalance) {
                currentBalance -= withdrawalAmount;
                alert("Transaction successful!");
                alert("Your remaining balance is Rs." + currentBalance);
                toContinue();
            } else {
                alert("You do not have sufficient Balance!");
                withdrawal();
            }
        } else {
            alert("You must withdraw at least Rs.1000");
            withdrawal();
        }
    } else {
        alert("Error: please enter a number!");
        withdrawal();
    }
}   
// Does the user wish to continue using the ATM
function toContinue(){
    var yesOrNo = parseInt(prompt("Do you want to perform another transaction? \n 1. Yes \n 2. No"));
    if (yesOrNo !== "" && yesOrNo !== null) {
        if (yesOrNo === 2){
            exit();
        }
        else {
            selectAccountType(); 
        }
    } else {
        alert("Please make a valid selection");
        toContinue();
    }
}
// Exit the ATM
function exit() {
    alert("Thank you for using ATM machine");
        // To simulate a real ATM, get ready for next user
        // atmMachineUsername();
}