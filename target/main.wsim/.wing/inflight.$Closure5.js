module.exports = function({ $mock, $testCheck }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $mock.setSuccess());
      (await $testCheck.check());
      (await $mock.setFailure());
      (await $testCheck.check());
    }
  }
  return $Closure5;
}
