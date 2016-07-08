const chai = require('chai');
const punct = require('../index.js');

chai.should();
chai.use(require('chai-things'));

describe('punctuationize', () => {
  it('should throw error when input is not string', () => {
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
      NaN,
    ].forEach((e) => {
      punct.bind(null, e).should.throw(Error);
    });
  });

  it('should return a string when input is a string', () => {
    [
      'false',
      '',
      String(''),
      '0',
      String('0'),
      'true',
      '1',
      String('1'),
      '-1',
      String('-1'),
    ].forEach((e) => {
      punct(e).should.be.a('string');
    });
  });

  it('should wipe out every ascii char but punctuation marks', () => {
    const ascS = 32;
    const ascE = 127;
    const str = Array.apply(null, new Array(ascE - ascS)).map((_, i) =>
      String.fromCharCode(i + ascS)
    ).join('');
    const ans = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    const t = punct(str, { space: 'keep' });
    t.should.be.a('string');
    t.should.equals(ans);
  });

  it('should wipe out space if specified', () => {
    const str = ' \f\n\r\t\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004' +
              '\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f' +
              '\u3000\ufeff';
    const ans = '';
    const t = punct(str, { space: 'none' });
    t.should.be.a('string');
    t.should.equals(ans);
  });

  it('should keep only one space for repeating space, speficied or by default', () => {
    const str = ' ;  ;; ;     ; \n\n ; \r\n\r\n;;;  ; \r ;';
    const ans = '; ;; ; ;\n;\n;;; ;\n;';
    let t = punct(str, { space: 'single' });
    t.should.be.a('string');
    t.should.equals(ans);

    t = punct(str);
    t.should.be.a('string');
    t.should.equals(ans);
  });


  it('should work well with unicode punctuation marks', () => {
    const gPunctS = 0x2000;
    const gPunctE = 0x2070;
    const sPunctS = 0x2e00;
    const sPunctE = 0x2e80;
    [[gPunctS, gPunctE], [sPunctS, sPunctE]].forEach((range) => {
      const str = Array.apply(null, new Array(range[1] - range[0])).map((_, i) =>
        String.fromCharCode(i + range[0])
      ).join('');
      const t = punct(str, { space: 'keep' });
      t.should.be.a('string');
      t.should.equals(str);
    });
  });
});
