export default class {

  constructor(config) {
    this.config = config;
    this.tries = 1;
    this.timeout = null;
  }
  async poll() {
    console.info(`Polling for ${this.tries} time`);
    const result = await fetchData();
    if (this.config.checkResponse(result)) {
      this.config.onComplete();
    } else {
      if (this.config.maxTries > this.tries) {
        this.tries++;
        if (!this.config.endTime || +new Date() < this.config.endTime) {
          this.timeout = setTimeout(this.poll.bind(this), this.config.inverval);
        } else {
          console.warn(`Time passed is after end time ${this.config.endTime}. Ending polling.`);
        }
      } else {
        console.warn(`Tried ${this.tries} times. Giving up.`);
      }
    }
  }
  endPolling() {
    clearTimeout(this.timeout);
  }
}

function fetchData() {
  return new Promise((resolve) => resolve("nok"));
}
