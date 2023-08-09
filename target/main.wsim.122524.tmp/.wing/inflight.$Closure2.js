module.exports = function({ mock, testCheck }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await mock.setSuccess());
      (await testCheck.check());
      (await testCheck.check());
      (await testCheck.check());
    }
  }
  return $Closure2;
}
