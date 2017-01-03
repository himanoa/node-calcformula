"use strict";
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var formulaToRpn = require('../index.js').formulaToRpn;
var FormulaValueError = require('../index.js').FormulaValueError;

describe('formulaToRpn', function(){
  it('should be valid add', function(){ assert.strictEqual(formulaToRpn('1+1'), '1 1 +') });
  it('should be valid sub', function(){ assert.strictEqual(formulaToRpn('1-1'), '1 1 -') });
  it('should be valid mul', function(){ assert.strictEqual(formulaToRpn('1*1'), '1 1 *') });
  it('should be valid div', function(){ assert.strictEqual(formulaToRpn('1/1'), '1 1 /') });
  it('should be invalid', function(){
    expect((function(){ formulaToRpn('1+1n') })).to.throw(FormulaValueError);
  });
  it('should be valid decimal', function(){
    assert.strictEqual(formulaToRpn('1.5/1'), '1.5 1 /')
  })
  it('should be valid complex', function(){
    assert.strictEqual(formulaToRpn('( 1 + 2 / 2 ) - ( 3 + 4 * 5 )'), '1 2 2 / + 3 4 5 * + -');
  });
})
