const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("history-list");

let current = "";
let operator = "";
let previous = "";

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-value");

        if (value) {
            current += value;
            updateDisplay(current);
        }
    });
});


document.getElementById("clear").addEventListener("click", () => {
    current = "";
    previous = "";
    operator = "";
    updateDisplay("0");
});


document.querySelectorAll(".op").forEach(opBtn => {
    opBtn.addEventListener("click", () => {
        if (current === "") return;
        previous = current;
        operator = opBtn.getAttribute("data-value");
        current = "";
    });
});


document.getElementById("equals").addEventListener("click", () => {
    if (previous === "" || current === "" || operator === "") return;

    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result = 0;

    switch(operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
            result = b !== 0 ? a / b : "Erro";
            break;
    }

    updateDisplay(result);
    addToHistory(`${previous} ${operator} ${current} = ${result}`);

    current = result.toString();
    previous = "";
    operator = "";
});


function updateDisplay(value) {
    display.textContent = value;
}

function addToHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
}
