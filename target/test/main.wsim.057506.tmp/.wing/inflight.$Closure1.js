module.exports = function({ bucket, http_Util, std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const url = "https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true";
      const lastUpdate = (await bucket.tryGetJson(url));
      const result = (await http_Util.get(url));
      const body = result.body;
      {
        const $IF_LET_VALUE = body;
        if ($IF_LET_VALUE != undefined) {
          const body = $IF_LET_VALUE;
          const json = (((JSON.parse(body)))["workflow_runs"])[0];
          const conclusion = (((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })((json)?.["conclusion"]) ?? "");
          const status = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })((json)["status"]);
          const id = ((arg) => { if (typeof arg !== "number") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a number")}; return JSON.parse(JSON.stringify(arg)) })((json)["id"]);
          {console.log(String.raw({ raw: ["", ""] }, id))};
          {console.log(status)};
          {console.log(conclusion)};
          (await bucket.putJson(url,Object.freeze({"id":id,"status":status,"conclusion":conclusion})));
        }
      }
    }
  }
  return $Closure1;
}
