
const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

let current = "";
let previous = "";
let operator = null;


function updateDisplay(v) {
    display.textContent = v;
}


function addHistory(op, result) {
    const li = document.createElement("li");
    li.textContent = `${op} = ${result}`;
    li.onclick = () => {
        current = String(result);
        updateDisplay(current);
    };
    historyList.prepend(li);
}


function calculate() {
    if (!operator || current === "" || previous === "") return;

    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result;

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/": result = b === 0 ? "Erro" : a / b; break;
    }

    addHistory(`${previous} ${operator} ${current}`, result);
    updateDisplay(result);

    current = String(result);
    previous = "";
    operator = null;
}


function inputNumber(n) {
    if (n === "." && current.includes(".")) return;
    current += n;
    updateDisplay(current);
}


function inputOperator(op) {
    if (current === "") return;
    if (previous !== "") calculate();
    previous = current;
    operator = op;
    current = "";
}


document.getElementById("clear").onclick = () => {
    current = "";
    previous = "";
    operator = null;
    updateDisplay("0");
};


document.getElementById("equals").onclick = () => calculate();


document.querySelectorAll("button[data-value]").forEach(btn => {
    btn.onclick = () => {
        const v = btn.dataset.value;
        if (!isNaN(v) || v === ".") inputNumber(v);
        else inputOperator(v);
    };
});


updateDisplay("0");
