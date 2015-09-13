/*!
 * view-loader <https://github.com/jonschlinkert/view-loader>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var viewLoader = require('./');

describe('viewLoader', function () {
  it('should:', function () {
    viewLoader('a').should.eql({a: 'b'});
    viewLoader('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      viewLoader();
    }).should.throw('viewLoader expects valid arguments');
  });
});
