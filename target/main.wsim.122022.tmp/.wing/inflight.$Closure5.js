module.exports = function({ mock, testCheck }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await mock.setFailure());
      (await testCheck.check());
      (await mock.setSuccess());
      (await testCheck.check());
    }
  }
  return $Closure5;
}
