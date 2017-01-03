"use strict";
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var formulaToRpn = require('../index.js').formulaToRpn;
var FormulaValueError = require('../index.js').FormulaValueError;
var calcFormula = require('../index.js').calcFormula;
var IndivisibleError = require('../index.js').IndivisibleError;

describe('calcFormula', function(){
  it('should be valid add', function(){
    assert.strictEqual(calcFormula('2+1'), 2+1);
  });
  it('should be valid sub', function(){
    assert.strictEqual(calcFormula('2-1'), 2-1);
  });
  it('should be valid mul', function(){
    assert.strictEqual(calcFormula('2*1'), 2*1);
  });
  it('should be valid div', function(){
    assert.strictEqual(calcFormula('2/1'), 2/1);
  });
  it('should be valid div is result decimal', function(){
    assert.strictEqual(calcFormula('2.5/1'), Math.floor(2.5/1));
  });
  it('should be invalid', function(){
    expect((function(){ calcFormula("1/0") })).to.throw(IndivisibleError);
  });
});
