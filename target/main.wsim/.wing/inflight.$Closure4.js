module.exports = function({ $mock, $testCheck }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $mock.setFailure());
      (await $testCheck.check());
      (await $testCheck.check());
      (await $testCheck.check());
    }
  }
  return $Closure4;
}
