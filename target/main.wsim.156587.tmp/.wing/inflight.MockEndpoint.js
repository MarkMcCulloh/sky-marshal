module.exports = function({  }) {
  class MockEndpoint {
    constructor({ api, bucket }) {
      this.api = api;
      this.bucket = bucket;
    }
    async $inflight_init()  {
    }
    async setSuccess()  {
      (await this.bucket.put("test","success"));
    }
    async setFailure()  {
      (await this.bucket.put("test","failure"));
    }
  }
  return MockEndpoint;
}
