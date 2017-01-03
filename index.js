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

  formula = formula.split("");
  var stack = new Array();
  formula.unshift('(');
  formula.push(')');

  var result = "";
  var tmp = "";

  formula.forEach(function(val){

  })

}
