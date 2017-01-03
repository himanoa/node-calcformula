"use strict";

var calcFormula = function(formula, options) {
  /**
   * It is a function that takes a string of a formula and return the result.
   * @param {string} formula Calculated formula string.
   * @param {object} options
   * @type {number}
   **/

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
  formula = formula.split("");
  var stack = new Array();
  formula.unshift('(');
  formula.push(')');

  var result = "";
  var tmp = "";

  formula.forEach(function(val){
    if(val.match(/[0-9]/)){
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
  return result;
}

module.exports = {
  calcFormula: calcFormula,
  formulaToRpn: formulaToRpn
}
