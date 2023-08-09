module.exports = function({ $mainBuildCheck }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $mainBuildCheck.check());
    }
  }
  return $Closure1;
}
