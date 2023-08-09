module.exports = function({ __parent_this_1, std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      return {
      "status": 200,
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([(await __parent_this_1.bucket.get("test"))]),}
      ;
    }
  }
  return $Closure1;
}
