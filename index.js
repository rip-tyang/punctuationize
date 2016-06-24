"use strict";
module.exports = (function () {
  var notPunctReg = /[^\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

  function makeDefault(config) {
    config = config || {};
    linebreak = config.linebreak ? config.linebreak : true;
    space = config.space || "single";
    if (space !== "single" && space !== "keep" && space !== "none") {
      throw new Error("Invalid space value" + space + ", should be single, keep, or none");
    }
  }

  function punctuationize(text, config) {
    if (!(typeof text === "string") && !(text instanceof String)) {
      throw new Error("Input " + text + " is not a string or string object.");
    }
    return text.replace(notPunctReg, "");
  }

  return punctuationize;
})();
