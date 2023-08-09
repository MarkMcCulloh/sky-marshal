module.exports = function({ pollTick, checker, mockGitHubFailure, mockGitHubSuccess }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await pollTick(checker,mockGitHubFailure));
      (await pollTick(checker,mockGitHubSuccess));
    }
  }
  return $Closure9;
}
