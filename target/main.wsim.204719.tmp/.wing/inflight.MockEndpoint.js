module.exports = function({  }) {
  class MockEndpoint {
    constructor({ $this_bucket }) {
      this.$this_bucket = $this_bucket;
    }
    async setSuccess() {
      (await this.$this_bucket.put("test","success"));
    }
    async setFailure() {
      (await this.$this_bucket.put("test","failure"));
    }
  }
  return MockEndpoint;
}
