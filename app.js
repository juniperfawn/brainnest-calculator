class Calculator {
    constructor() {
        this.operation = null;
        this.displayed_value = 0; //big value displayed
        this.internal_value = 0;
        this.history = []; //small display of what has last been calculated 
    }

    update_visual(value) {
        this.displayed_value = value;
    }

    new_operation(operator) {
        // TODO! check for null!
        this.operation = operator;
        this.internal_value = this.displayed_value;
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
        //TODO! check for null
        let result = this.operation.calculate(this.displayed_value);
        this.history.push(this.operation);
        this.displayed_value = result;
        return result;
    }
}

class SubtractCmd {
    constructor(value) {
      this.symbol = "-";
      this.a = value;
      this.b = 0; // used for the historical reference later
    }
  
    calculate(value) {
        this.b = value;
      return this.a - value;    
    }
  }
  
  class AddCmd {
    constructor(value) {
      this.symbol = "+";
      this.a = value;
      this.b = 0;
    }
  
    calculate(value) {
      this.b = value;
      return this.a + value;    
    }
  }
  
  class MultiplyCmd {
    constructor(value) {
      this.symbol = "*";
      this.a = value;
      this.b = 0;
    }
  
    calculate(value) {
      this.b = value;
      return this.a * value;    
    }
  }

  class DivideCmd {
    constructor(value) {
      this.symbol = "/";
      this.a = value;
      this.b = 0;
    }
  
    calculate(value) {
      this.b = value;
      return this.a / value;    
    }
  }
  
  let calc = new Calculator();
  calc.update_visual(2); 
  calc.new_operation(new SubtractCmd(calc.displayed_value));
  //calc.new_operation(calc.subtract);
  calc.update_visual(4);
  let result = calc.execute()
  calc.new_operation(new AddCmd(calc.displayed_value));
  // but what happens if we hit the buttons a bunch of times?
  calc.new_operation(new AddCmd(calc.displayed_value));
  calc.new_operation(new AddCmd(calc.displayed_value));
  calc.new_operation(new SubtractCmd(calc.displayed_value));
  calc.new_operation(new AddCmd(calc.displayed_value));
  // No issue!  Because we're handling the history only when we "execute()""
  // However calculators usually execute the previously entered value if you press an operation again.  Perhaps this is something you can add later as a "stretch goal" if you have time.
  
  calc.update_visual(10);
  calc.execute()
  
  
  console.log(calc.displayed_value);
  console.log(calc.display_history());
  //console.log(calc.history);