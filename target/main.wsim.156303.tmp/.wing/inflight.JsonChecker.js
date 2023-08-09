module.exports = function({ http_Util, std_Json }) {
  class JsonChecker {
    constructor({ expectedFailure, expectedSuccess, jsonQuery, name, statusBucket, url }) {
      this.expectedFailure = expectedFailure;
      this.expectedSuccess = expectedSuccess;
      this.jsonQuery = jsonQuery;
      this.name = name;
      this.statusBucket = statusBucket;
      this.url = url;
    }
    async $inflight_init()  {
    }
    static async query(obj, query)  {
      return (require("/Users/markm/Documents/GitHub/sky-marshal/./jq.js")["query"])(obj, query)
    }
    async check()  {
      {
        const $IF_LET_VALUE = (await http_Util.get(this.url)).body;
        if ($IF_LET_VALUE != undefined) {
          const body = $IF_LET_VALUE;
          {
            const $IF_LET_VALUE = ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })((await JsonChecker.query((JSON.parse(body)),this.jsonQuery)));
            if ($IF_LET_VALUE != undefined) {
              const status = $IF_LET_VALUE;
              {
                const $IF_LET_VALUE = (await this.statusBucket.tryGet(this.name));
                if ($IF_LET_VALUE != undefined) {
                  const lastStatus = $IF_LET_VALUE;
                  if ((status !== lastStatus)) {
                    if ((status === this.expectedFailure)) {
                      {console.log("New failure!")};
                    }
                    else if ((status === this.expectedSuccess)) {
                      {console.log("Issue has cleared up")};
                    }
                    else {
                      {console.log(String.raw({ raw: ["Unexpected status: ", ""] }, status))};
                    }
                  }
                }
              }
              (await this.statusBucket.put(this.name,status));
            }
          }
        }
      }
    }
  }
  return JsonChecker;
}
