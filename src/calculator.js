import { useState } from "react";

let number = 0;
let clear = 0;
let equals = false;
let Ans = false;

const Calculator = () => {
    let [display, setDisplay] = useState("0");
    let [currentV, setCurrentV] = useState(0)
    let [answer, setAnswer] = useState("");

    let newDisplay = display.slice();
    let lengthe = newDisplay.length;
    let last = newDisplay[lengthe - 1];
    let beLast = newDisplay[lengthe - 2];
    let signs = newDisplay.match(/[0-9][+-/x]/gi);
    let splitted = newDisplay.match(/[+-/x]+[0-9.]+|[0-9.]+|[+-/x ]/gi);

    let finalV = 0;
    const handleSigns = (oper) => {
        if (oper === "-") {
            if (equals) {
                setDisplay(answer + oper);
                number = 0;
                clear = 0;
                equals = false;
            } else if ((beLast === "x" || beLast === "/" || beLast === "." || beLast === "-") && last === "-") {
                let minimize = newDisplay.split("").slice(0, lengthe - 1);
                setDisplay(minimize.concat(oper).join(""));
                number++;
                clear = 0;
            } else if (last === "+") {
                let minimize = newDisplay.split("").slice(0, lengthe - 1);
                setDisplay(minimize.concat(oper).join(""));
                number++;
                clear = 0;
            } else {
                setDisplay(display + oper);
                number = 0;
                clear = 0;
            };
            Ans = false;
        } else {
            if (equals) {
                setDisplay(answer + oper);
                number = 0;
                clear = 0;
                equals = false;
            } else if (last === "-" && (beLast === "x" || beLast === "/" || beLast === "." || beLast === "-")) {
                let minimize = newDisplay.split("").slice(0, lengthe - 2);
                setDisplay(minimize.concat(oper).join(""));
                number++;
                clear = 0;
            } else if (last === "+" || last === "-" || last === "x" || last === "/" || last === ".") {
                let minimize = newDisplay.split("").slice(0, lengthe - 1);
                setDisplay(minimize.concat(oper).join(""));
                number++;
                clear = 0;
            } else {
                setDisplay(display + oper);
                number = 0;
                clear = 0;
            };
            Ans = false;
        };
    };
    const handleOperations = (first, second, operation) => {
        if (operation === "+") {
            finalV = ((first) + (second))
        } else if (operation === "-") {
            finalV = (first * 1) - (second * 1)
        } else if (operation === "/") {
            finalV = (first * 1) / (second * 1)
        } else if (operation === "x") {
            finalV = (first * 1) * (second * 1)
        }
    };
    const handleDisplay = (e) => {
        let clicked = e.target.value;
        switch (clicked) {
            case "clr":
                setDisplay("0");
                number = 0;
                clear = 0;
                setAnswer("");
                break;
            case ".":
                if (equals) {
                    setDisplay("0" + clicked);
                    clear++;
                    number++;
                    equals = false;
                } else if (clear === 0 && (last === "+" || last === "-" || last === "x" || last === "/")) {
                    setDisplay(display + "0" + clicked);
                    clear++;
                    number++;
                } else if (clear === 0) {
                    setDisplay(display + clicked);
                    clear++;
                    number++;
                }
                break;
            case "+":
                handleSigns(clicked);
                break;
            case "-":
                handleSigns(clicked);
                break;
            case "x":
                handleSigns(clicked);
                break;
            case "/":
                handleSigns(clicked);
                break;
            case "0":
                if (number === 0 && last === "0") {
                    setDisplay(display);
                } else if (number === 0 && last !== "0") {
                    setDisplay(display + clicked);
                } else if (number !== 0) {
                    number++;
                    setDisplay(display + clicked);
                };
                break;
            case "equals":
                if (signs === null|| (signs.length===1 && signs[0][1]===".")) {
                    setAnswer(splitted);
                    setCurrentV(splitted);
                } else {
                    let array = [];
                    signs.map((item) => {
                        if (item ==="+"|| item==="-" ||item ==="x" || item==="/") {
                            array.push(item);
                        } else if ((item[1] !== "." && item !==undefined)) {
                            array.push(item[1]);
                        };
                        return array
                    }); signs = array;
                    splitted = splitted.map((item, index) => {
                        if (index === 0) {
                            return item
                        } else if ((item[0] === "x" || item[0] === "/" || item[0] === "+" || item[0] === "-") && item[1] === "-") {
                            return item.slice(1);
                        } else if (item[0] === "x" || item[0] === "/" || item[0] === "+" || item[0] === "-") {
                            return item.slice(1);
                        } else {
                            return item
                        };
                    });
                    for (let i = 0; i < signs.length; i++) {
                        if (i === 0) {
                            finalV = splitted[i];
                            handleOperations(finalV * 1, splitted[i + 1] * 1, signs[i]);
                        } else {
                            handleOperations(finalV * 1, splitted[i + 1] * 1, signs[i]);
                        };
                    };
                    setAnswer(finalV);
                    setCurrentV(finalV);
                };
                equals = true;
                Ans = false;
                number = 0;
                break;
            case "Ans":
                if (equals) {
                    setDisplay(""+currentV);
                    number++;
                    clear++;
                    Ans = true;
                    equals = false;
                } else if (!Ans && display !== "0") {
                    setDisplay(display+answer);
                    Ans = true;
                }
                break;
            default:
                if ((number === 0 && display === "0") || equals) {
                    setDisplay(clicked);
                } else if (number === 0 & (beLast === "+" || beLast === "-" || beLast === "x" || beLast === "/")) {
                    let minimize = newDisplay.split("").slice(0, lengthe - 1);
                    setDisplay(minimize.concat(clicked).join(""));
                } else {
                    setDisplay(display + clicked);
                };
                number++;
                equals=false;
        }
    }
    return (
        <div className="calculator">
            <div id="display"><p>{display}</p><p className="answ">{answer}</p></div>
            <div id="operations">
                <div className="row">
                    <button onClick={handleDisplay} id="clear" value={"clr"}>AC</button>
                    <button onClick={handleDisplay} value="+" id="add">+</button>
                    <button onClick={handleDisplay} value="-" id="subtract">-</button>
                </div>
                <div className="row">
                    <button onClick={handleDisplay} id="one" value={"1"}>1</button>
                    <button onClick={handleDisplay} id="two" value={"2"}>2</button>
                    <button onClick={handleDisplay} id="three" value={"3"}>3</button>
                    <button onClick={handleDisplay} value="x" id="multiply">x</button>
                </div>
                <div className="row">
                    <button onClick={handleDisplay} id="four" value={"4"}>4</button>
                    <button onClick={handleDisplay} id="five" value={"5"}>5</button>
                    <button onClick={handleDisplay} id="six" value={"6"}>6</button>
                    <button onClick={handleDisplay} id="divide" value="/">/</button>
                </div>
                <div className="biggerRow">
                    <div className="bigRow">
                        <div className="row">
                            <button onClick={handleDisplay} id="seven" value={"7"}>7</button>
                            <button onClick={handleDisplay} id="eight" value={"8"}>8</button>
                            <button onClick={handleDisplay} id="nine" value={"9"}>9</button>
                        </div>
                        <div className="row">
                            <button onClick={handleDisplay} id="zero" value={"0"}>0</button>
                            <button onClick={handleDisplay} id="decimal" value={"."}>.</button>
                            <button onClick={handleDisplay} value={"Ans"} id="answer">Ans</button>
                        </div>
                    </div>
                    <button onClick={handleDisplay} value={"equals"} id="equals">=</button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;