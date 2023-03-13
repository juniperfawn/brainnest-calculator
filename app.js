class Calculator {
    constructor() {
      this.operation = null;
      this.displayed_value = 0;
      this.internal_value = 0;
    }
  
    update_visual(value) {
      this.displayed_value = value;
    }
  
    new_operation(operator) {
      this.operation = operator;
      this.internal_value = this.displayed_value;
    }
  
    execute() {
        //check if null first 
      let result = this.operation();
      return result;
    }
  
    substract() {
      return this.internal_value - this.displayed_value;
    }
  }
  
  let calc = new Calculator();
  calc.update_visual(2);
  // calc.new_operation(new SubtractCalcCmd(calc.displayed_value))
  calc.new_operation(calc.subtract);
  calc.update_visual(4);
  let result = calc.execute()
  console.log(result);