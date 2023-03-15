const MAX_NUM_DISPLAY_CHARS = 8;

class Calculator {
    constructor() {
        this.operation = null;
        this.displayed_value = "0"; //big value displayed
        this.history = []; //small display of what has last been calculated 
        this.command_pressed = false;
        this.pending = false;
    }

    all_clear() {
        this.operation = null;
        this.displayed_value = "0";
        this.history = [];
        this.command_pressed = false;
        this.pending = false;
    }

    delete() {
        this.displayed_value = this.displayed_value.slice(0, -1);
    }

    update_visual(value) {
        let converted_value;
        switch (typeof value) {
            case "number" || "float":
                converted_value = value.toString();
                break;
            case "string":
                converted_value = value;
                break;
            default:
                break;
        }

        if (this.displayed_value == "0") {
            this.displayed_value = converted_value;
        } else if (this.displayed_value == "illegal") {
            this.displayed_value = converted_value;
        } else {
            if (this.command_pressed == true) {
                this.displayed_value = converted_value;
                this.command_pressed = false;
            } else {
                if(this.displayed_value.contains(".") && converted_value == "."){
                    return;
                }
                this.displayed_value += converted_value;
            }
        }
        this.displayed_value = this.displayed_value.slice(0, MAX_NUM_DISPLAY_CHARS);
        this.pending = true;
    }

    new_operation(operator) {
        if(this.pending == true){
            this.execute();
        }
        this.operation = operator;
        this.command_pressed = true;
        //this.execute();
    }

    display_history() {
        let history_string = "";
        for (let i = 0; i < this.history.length; i++) {
            if (i == 0) {
                history_string += this.history[i].a;
                history_string += " ";
            }
            history_string += this.history[i].symbol;
            history_string += " ";
            history_string += this.history[i].b;
            history_string += " ";
        }
        return history_string;
    }

    execute() {
        if (this.operation == null) {
            return;
        }
        this.command_pressed = true;
        let result = this.operation.calculate(this.displayed_value);
         if(result == "illegal"){
                this.all_clear();
              return result;
          }
        result = result.toString();
        this.history.push(this.operation);
        this.displayed_value = result.slice(0, MAX_NUM_DISPLAY_CHARS);
        this.pending = false;
        return result;
    }
}

class BaseCmd {
    constructor(value) {
        value = this.convert_value(value);
        this.a = value;
        this.b = 0; // used for the historical reference later
    }

    //convert the value to a float type if possible 
    convert_value(value) {
        switch (typeof value) {
            case "number":
                return value;
            case "string":
                return parseFloat(value);
            default:
                break;
        }
    }
}

class SubtractCmd extends BaseCmd {
    constructor(value) {
        super(value);
        this.symbol = "-";
    }

    //calculate takes in a number or float type returns same type
    calculate(value) {
        value = this.convert_value(value);
        this.b = value;
        return this.a - value;
    }
}

class AddCmd extends BaseCmd {
    constructor(value) {
        super(value);
        this.symbol = "+";
    }

    calculate(value) {
        value = this.convert_value(value);
        this.b = value;
        return this.a + value;
    }
}

class MultiplyCmd extends BaseCmd {
    constructor(value) {
        super(value);
        this.symbol = "*";
    }

    calculate(value) {
        value = this.convert_value(value);
        this.b = value;
        return this.a * value;
    }
}

class DivideCmd extends BaseCmd {
    constructor(value) {
        super(value);
        this.symbol = "/";
    }

    calculate(value) {
        value = this.convert_value(value);
        this.b = value;
        if (value == 0) {
            return "illegal";
        }
        return this.a / value;
    }
}

class RemainderCmd extends BaseCmd {
    constructor(value) {
        super(value);
        this.symbol = "%";
    }

    calculate(value) {
        value = this.convert_value(value);
        this.b = value;
        return this.a % value;
    }
}

let calc = new Calculator();
calc.update_visual(2);
calc.new_operation(new SubtractCmd(calc.displayed_value));
//calc.new_operation(calc.subtract);
calc.update_visual(4);
let result = calc.execute() //-2
calc.new_operation(new AddCmd(calc.displayed_value)); // -2 +
// but what happens if we hit the buttons a bunch of times?
calc.new_operation(new AddCmd(calc.displayed_value));
calc.new_operation(new AddCmd(calc.displayed_value));
calc.new_operation(new SubtractCmd(calc.displayed_value));
calc.new_operation(new DivideCmd(calc.displayed_value)); 
    // No issue!  Because we're handling the history only when we "execute()""
    // However calculators usually execute the previously entered value if you press an operation again.  Perhaps this is something you can add later as a "stretch goal" if you have time.

calc.update_visual(8);
calc.new_operation(new MultiplyCmd(calc.displayed_value));
calc.update_visual(3.4);
calc.new_operation(new SubtractCmd(calc.displayed_value));
calc.update_visual(2);
calc.execute();



console.log(calc.displayed_value);
console.log(calc.display_history());
  //console.log(calc.history);

  //order of operations function?? --> a + b = total --> (next operation (-)) --> total (next operation (-)) --> total
  //limits of operations for history
  //2 + 4
  //6 + 8.3
  //limits of decimals
  //divided by zero doesn't work 