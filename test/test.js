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
      {},
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
      punct(e).should.be.a('string');
    });
  });

  it('should wipe out every ascii char but punctuation marks', function () {
    var ascS = 32,
        ascE = 127;
    var str = Array.apply(null, new Array(ascE - ascS)).map(function (_, i) {
      return String.fromCharCode(i + ascS);
    }).join('');
    var ans = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    var t = punct(str, {space: 'keep'});
    t.should.be.a('string');
    t.should.equals(ans);
  });

  it('should wipe out space if specified', function () {
    var str = ' \f\n\r\t\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004' +
              '\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f' +
              '\u3000\ufeff';
    var ans = '';
    var t = punct(str, {space: 'none'});
    t.should.be.a('string');
    t.should.equals(ans);
  });

  it('should keep only one space for repeating space, speficied or by default', function () {
    var str = ' ;  ;; ;     ; \n\n ; \r\n\r\n;;;  ; \r ;';
    var ans = '; ;; ; ;\n;\n;;; ;\n;';
    var t = punct(str, {space: 'single'});
    t.should.be.a('string');
    t.should.equals(ans);

    t = punct(str);
    t.should.be.a('string');
    t.should.equals(ans);
  });


  it('should work well with unicode punctuation marks', function () {
    var gPunctS = 0x2000,
        gPunctE = 0x2070,
        sPunctS = 0x2e00,
        sPunctE = 0x2e80;
    [[gPunctS, gPunctE], [sPunctS, sPunctE]].forEach(function (range) {
      str = Array.apply(null, new Array(range[1] - range[0])).map(function (_, i) {
        return String.fromCharCode(i + range[0]);
      }).join('');
      var t = punct(str, {space: 'keep'});
      t.should.be.a('string');
      t.should.equals(str);
    });
  });
});
