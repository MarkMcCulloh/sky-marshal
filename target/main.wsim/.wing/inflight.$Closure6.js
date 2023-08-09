module.exports = function({ $mock, $testCheck }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $mock.setFailure());
      (await $testCheck.check());
      (await $mock.setSuccess());
      (await $testCheck.check());
    }
  }
  return $Closure6;
}
