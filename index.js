"use strict";
module.exports = (function () {
  var notPunctReg = /[^\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

  function makeDefault(config) {
    config = config || {};
    config.space = config.space || 'single';
    return config;
  }

  function punctuationize(text, config) {
    if (!(typeof text === "string" || text instanceof String)) {
      throw new Error("Input " + text + " is not a string or string object.");
    }
    var res = text.replace(notPunctReg, '');
    config = makeDefault(config);
    if (config.space === 'none') {
      res = res.replace(/\s/g, '');
    }
    else if (config.space === 'single') {
      // keep only single line break, in unix style
      res = res.replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n\n+/g, '\n')
      // remove trailing space
        .replace(/\s+$/mg, '')
      // remove leading space
        .replace(/^\s+/mg, '')
      // keep only single space
        .replace(/\s\s+/g, ' ');
    }
    return res;

  }

  return punctuationize;
})();
