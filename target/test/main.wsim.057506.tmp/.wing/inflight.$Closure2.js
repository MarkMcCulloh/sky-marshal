module.exports = function({ util_Util, std_Duration }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await util_Util.sleep((await std_Duration.fromSeconds(5))));
    }
  }
  return $Closure2;
}
