class Calculator {
    constructor() {
        this.operation = null;
        this.displayed_value = 0; //big value displayed
        this.internal_value = 0;
        this.history = []; //small display of what has last been calculated 
    }

    update_visual(value) {
        this.displayed_value = value;
        this.history.push(this.displayed_value);
    }

    new_operation(operator) {
        this.operation = operator;
        this.internal_value = this.displayed_value;
    }

    display_history() {
        let history_string;
        for (let i = 0; i < this.history.len(); i++) {
            history_string += this.history[i];
            history_string += " ";
        }
    }

    execute() {
        //check if null first 
        let result = this.operation();
        return result;
    }

    subtract() {
        this.history.push("-");
        return this.internal_value - this.displayed_value;
    }

    add() {
        return this.internal_value + this.displayed_value;
    }

    multiply() {
        return this.internal_value * this.displayed_value;
    }

    divide() {
        return this.internal_value / this.displayed_value;
    }
}

let calc = new Calculator();
calc.update_visual(2);
// calc.new_operation(new SubtractCalcCmd(calc.displayed_value))
calc.new_operation(calc.subtract);
calc.update_visual(4);
let result = calc.execute()
console.log(result);
console.log(calc.history);