module.exports = function({ $http_Util, $std_Json }) {
  class JsonChecker {
    constructor({ $this_expectedFailure, $this_expectedSuccess, $this_jsonQuery, $this_name, $this_statusBucket, $this_url }) {
      this.$this_expectedFailure = $this_expectedFailure;
      this.$this_expectedSuccess = $this_expectedSuccess;
      this.$this_jsonQuery = $this_jsonQuery;
      this.$this_name = $this_name;
      this.$this_statusBucket = $this_statusBucket;
      this.$this_url = $this_url;
    }
    static async query(obj, query) {
      return (require("/Users/markm/Documents/GitHub/sky-marshal/./jq.js")["query"])(obj, query)
    }
    async check() {
      {
        const $IF_LET_VALUE = (await $http_Util.get(this.$this_url)).body;
        if ($IF_LET_VALUE != undefined) {
          const body = $IF_LET_VALUE;
          {
            const $IF_LET_VALUE = ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })((await JsonChecker.query((JSON.parse(body)),this.$this_jsonQuery)));
            if ($IF_LET_VALUE != undefined) {
              const status = $IF_LET_VALUE;
              {
                const $IF_LET_VALUE = (await this.$this_statusBucket.tryGet(this.$this_name));
                if ($IF_LET_VALUE != undefined) {
                  const lastStatus = $IF_LET_VALUE;
                  if ((status !== lastStatus)) {
                    if ((status === this.$this_expectedFailure)) {
                      {console.log("New failure!")};
                    }
                    else if ((status === this.$this_expectedSuccess)) {
                      {console.log("Issue has cleared up")};
                    }
                    else {
                      {console.log(String.raw({ raw: ["Unexpected status: ", ""] }, status))};
                    }
                  }
                }
              }
              (await this.$this_statusBucket.put(this.$this_name,status));
            }
          }
        }
      }
    }
  }
  return JsonChecker;
}
