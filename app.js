// UI Components
const keys = document.getElementsByClassName('keyboard__key');
const resultDisp = document.querySelector('.display__result');
const historyDisp = document.querySelector('.display__operation');


// ***************  Light / Dark mode toggle ****************************
function toggleSchemeMode() {
    const toggleBtn = document.getElementById('toggle__button');
    const rootEl = document.documentElement;

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('toggle__button--dark');
        rootEl.classList.toggle('darkModeRoot');
    })
}

toggleSchemeMode();

// ************************************************************************


// **************** Operations Logic **************************************
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
        let converted_value = value + '';

        if (this.displayed_value == "0") {
            this.displayed_value = converted_value;
        } else if (this.displayed_value == "illegal") {
            this.displayed_value = converted_value;
        } else {
            if (this.command_pressed == true) {
                this.displayed_value = converted_value;
                this.command_pressed = false;
            } else {
                if (this.displayed_value.includes(".") && converted_value == ".") {
                    return;
                }
                this.displayed_value += converted_value;
            }
        }
        this.displayed_value = this.displayed_value.slice(0, MAX_NUM_DISPLAY_CHARS);
        this.pending = true;

        // updateUI();
    }

    new_operation(operator) {
        if (this.pending == true) {
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
        // if (result == "illegal") {
        //     this.all_clear();
        //     return result;
        // }
        result = result.toString();
        this.history.push(this.operation);
        this.displayed_value = result.slice(0, MAX_NUM_DISPLAY_CHARS);
        this.pending = false;
        
        updateUI();
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
        return value + '';
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


// ************************ Dom Manip ***************************
let calc = new Calculator();

function updateUI() {
    // Update UI
    resultDisp.textContent = calc.displayed_value;
    historyDisp.textContent = calc.display_history();
}

function action(symbol) {
    switch (symbol) {
        case '+':
            calc.new_operation(new AddCmd(calc.displayed_value));
            break;
        case '-':
            calc.new_operation(new SubtractCmd(calc.displayed_value));
            break;
        case 'x':
            calc.new_operation(new MultiplyCmd(calc.displayed_value));
            break;
        case '/':
            calc.new_operation(new DivideCmd(calc.displayed_value));
            break;
        case '%':
            calc.new_operation(new RemainderCmd(calc.displayed_value));
        case 'AC':
            calc.all_clear();
            break;
        case 'Del':
            calc.delete();
            break;
        case '=':
            calc.execute();
            break;
        default:
            calc.update_visual(symbol);
            break;
    }
}

for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', (e) => {
        action(keys[i].firstElementChild.textContent);
        updateUI();

        console.log(calc.displayed_value);
        console.log(calc.display_history());
    })
}