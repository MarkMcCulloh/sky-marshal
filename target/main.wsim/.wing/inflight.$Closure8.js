module.exports = function({ pollTick, checker, mockGitHubSuccess, mockGitHubFailure }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await pollTick(checker,mockGitHubSuccess));
      (await pollTick(checker,mockGitHubFailure));
    }
  }
  return $Closure8;
}
