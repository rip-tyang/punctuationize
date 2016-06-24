var chai = require('chai');
var punct = require('../index.js');

chai.should();
chai.use(require('chai-things'));

describe('punctuationize', function () {
  it('should throw error when input is not string', function () {
    [
      null,
      undefined,
      false,
      Boolean(false),
      [],
      [[]],
      0,
      Number(0),
      [0],
      true,
      Boolean(true),
      1,
      Number(1),
      [1],
      -1,
      Number(-1),
      [-1],
      Infinity,
      -Infinity,
      Object(),
      NaN
    ].forEach(function (e) {
      punct.bind(null, e).should.throw(Error);
    });
  });

  it('should return a string when input is a string', function () {
    [
      "false",
      "",
      String(""),
      "0",
      String("0"),
      "true",
      "1",
      String("1"),
      "-1",
      String("-1"),
    ].forEach(function (e) {
      t = punct(e);
      t.should.be.a('string');
    });
  });

  it('should wipe out every ascii char but punctuations by default', function () {
    str = Array.apply(null, new Array(127 - 32)).map(function (e, i) {
      return String.fromCharCode(i + 32);
    }).join('');
    ans = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    t = punct(str);
    t.should.be.a('string');
    t.should.equals(ans);
  });
});
