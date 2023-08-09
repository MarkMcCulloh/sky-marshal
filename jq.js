const jq = require("@jq-tools/jq");

module.exports.query = function (/** @type {any} */ obj, /** @type {string} */ query) {
  const result = Array.from(jq.evaluate(jq.parse(query), [obj]))
  return result[0]
}
