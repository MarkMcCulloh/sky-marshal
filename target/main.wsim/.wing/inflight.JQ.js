module.exports = function({  }) {
  class JQ {
     constructor()  {
    }
    static async jqParse(obj, jqString)  {
      return (require("/Users/markm/Documents/GitHub/sky-marshal/./jq.js")["jqParse"])(obj, jqString)
    }
  }
  return JQ;
}
