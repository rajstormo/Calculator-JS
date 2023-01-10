
let historyScreen = document.querySelector(".history");
let resultScreen = document.querySelector(".result");
let equalBtn = document.querySelector(".equal-btn");
let clearAllBtn = document.querySelector(".clear-all");
let clearLastInput = document.querySelector(".clear-last-input");
let allOperations = document.querySelectorAll(".operation");
let allNumbers = document.querySelectorAll(".number");

let haveDot = false;
let result = null;
let lastOperation = "";
let resultScreenVar = "";
let equalBtnClicked = false;

allNumbers.forEach(number => {
    number.addEventListener("click",function(e){
        
        // if result is there, and when pressing another key clear the result screen for new input
        if(equalBtnClicked){
            resultScreenVar = "";
            resultScreen.innerText = resultScreenVar;
        }
        equalBtnClicked = false;
        
        //if dot doesn't exist
        if(e.target.innerText === "." && !haveDot){
            haveDot = true;
        }
        else if(e.target.innerText === "." && haveDot) return;
        
        resultScreenVar += e.target.innerText;
        resultScreen.innerText = resultScreenVar;
    })
})

allOperations.forEach(operation => {
    operation.addEventListener("click",function(event){
        if(resultScreenVar=== "") return;
        haveDot = false;    
        
        if(resultScreenVar && historyScreen.innerText && result){
            calculateResult();
        } else{
            result = parseFloat(resultScreenVar);
        }
        lastOperation = event.target.innerText;
        
        historyScreen.innerText += resultScreenVar + event.target.innerText;
        resultScreenVar = "";
        resultScreen.innerText = resultScreenVar;
    })
})

function calculateResult(){
    if(lastOperation === "+"){
        result = result + parseFloat(resultScreenVar);
    }
    else if(lastOperation === "-"){
        result = result - parseFloat(resultScreenVar);
    }
    else if(lastOperation === "x"){
        result = result * parseFloat(resultScreenVar);
    }
    else if(lastOperation === "/"){
        result = result / parseFloat(resultScreenVar);
    }
    else if(lastOperation ==="%"){
        result = result % parseFloat(resultScreenVar);
    }
}

equalBtn.addEventListener("click",function(){
    equalBtnClicked = true;
    if(!resultScreenVar || !historyScreen.innerText) return;
    haveDot = false;
    
    calculateResult();
    historyScreen.innerText = " "
    resultScreenVar = result.toString();
    resultScreen.innerText = resultScreenVar;
    
})

clearAllBtn.addEventListener("click",function(){
    equalBtnClicked = false;
    historyScreen.innerText = "";
    resultScreenVar = "";
    resultScreen.innerText = resultScreenVar;
})

clearLastInput.addEventListener("click",function(){
    const lastIndex = resultScreenVar.length;
    let temp = resultScreen.innerText.substr(0,lastIndex-1);
    resultScreenVar = temp;
    resultScreen.innerText = resultScreenVar;
})

