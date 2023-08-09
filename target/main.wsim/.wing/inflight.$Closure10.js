module.exports = function({  }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const inputJQ = ".test1.test2";
      const testJson = Object.freeze({"test1":Object.freeze({"test2":"test3"})});
      const actions = [];
      let characterIndex = 0;
      while ((characterIndex < inputJQ.length)) {
        const character = (await inputJQ.at(characterIndex));
        if ((character === ".")) {
          if ((characterIndex === 0)) {
            characterIndex = (characterIndex + 1);
            continue;
          }
          if (((await inputJQ.at((characterIndex + 1))) === "[")) {
            let finalString = "";
            const start = (characterIndex + 2);
            let end = start;
            while (((await inputJQ.at(end)) !== "]")) {
              finalString = (finalString + (await inputJQ.at(end)));
              end = (end + 1);
            }
          }
        }
      }
    }
  }
  return $Closure10;
}
