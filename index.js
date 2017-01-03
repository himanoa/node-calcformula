"use strict";

function IndivisibleError(a,b){
  this.message = a + ' / ' + b;
  var last_part = new Error().stack.match(/[^\s]+$/);
  this.stack = this.name + ' at ' + last_part;
}
Object.setPrototypeOf(IndivisibleError, Error);
IndivisibleError.prototype = Object.create(Error.prototype);
IndivisibleError.prototype.name = "IndivisibleError";
IndivisibleError.prototype.message = "";
IndivisibleError.prototype.constructor = IndivisibleError;

function FormulaValueError(message) {
  this.message = message;
  var last_part = new Error().stack.match(/[^\s]+$/);
  this.stack = this.name + ' at ' + last_part;
}
Object.setPrototypeOf(FormulaValueError, Error);
FormulaValueError.prototype = Object.create(Error.prototype);
FormulaValueError.prototype.name = "FormulaValueError";
FormulaValueError.prototype.message = "";
FormulaValueError.prototype.constructor = FormulaValueError;

var calcFormula = function(formula, point) {
  /**
   * It is a function that takes a string of a formula and return the result.
   * @param {string} formula Calculated formula string.
   * @param {function} point
   * @type {number}
   **/
  if(point == undefined) point = Math.floor;
  var operations = {
    '+': function(a,b){ return a+b },
    '-': function(a,b){ return a-b },
    '*': function(a,b){ return a*b },
    '/': function(a,b){
      var result = a/b
      if(isFinite(result)){
        return result;
      }else{
        throw new IndivisibleError(a,b);
      }
    }
  }
  var rpn = formulaToRpn(formula).split(' ');
  var stack = [0];
  rpn.forEach(function(val){
    if(isFinite(val)){
      stack.push(Number(val));
    }else{
      var b = stack.pop();
      var a = stack.pop();
      stack.push(operations[val](a,b));
    }
  });
  return point(stack.pop());
}

var formulaToRpn = function(formula) {
  /**
   * It is a function that takes a string of a formula and return the Rpn string
   * @param {string} formula
   * @type {string}
   **/

  var rpnRank = {
    '(': 4,
    '#': 3,
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1,
    ')': 0
  };
  formula = formula.replace(/\s+/g, '');
  if(formula.match(/[^0-9\+\-\*\/\(\)\.]/g)) {
    throw new FormulaValueError(formula);
  }
  formula = formula.split(/([\+\-\/\*\(\)])/);
  var stack = new Array();
  formula.unshift('(');
  formula.push(')');

  var result = "";
  var tmp = "";

  formula.forEach(function(val){
    if(isFinite(val)){
      tmp += val;
    } else {
      if(val != "") {
        if(result.length > 0) {
          result += ' ';
        }
        result += tmp;
        tmp = '';
      }

      while (stack && rpnRank[stack[stack.length-1]] >= rpnRank[val] && stack[stack.length-1] != '(') {
        if(result.length > 0){
          result += ' ';
        }
        result += stack.pop();
      }
      if (val == ')') {
        stack.pop();
      } else {
        stack.push(val);
      }
    }
  });
  return result.replace(/\s+/g, ' ');
}

module.exports = {
  calcFormula: calcFormula,
  formulaToRpn: formulaToRpn,
  FormulaValueError: FormulaValueError,
  IndivisibleError: IndivisibleError
}
