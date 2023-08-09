module.exports = function({ $__parent_this_2_bucket, $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return {
      "status": 200,
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([(await $__parent_this_2_bucket.get("test"))]),}
      ;
    }
  }
  return $Closure2;
}
