<template>
  <div id="app">
  </div>
</template>

<script>
import PollService from "./services/PollService";

export default {
  name: "App",
  data(){
    return {
      pollService: null
    }
  },
  created() {
    const config = {
      checkResponse: this.checkResponse,
      onComplete: this.onComplete,
      maxTries: 5,
      inverval: 2000,
      // endTime: +new Date() + 1000 * 3
    };
    this.pollService = new PollService(config);
    this.pollService.poll();
  },
  beforeDestroy() {
    this.pollService.endPolling();
  },
  methods: {
    checkResponse(response) {
      return response === "ok";
    },
    onComplete() {
      console.info("Response is OK. I'm done.");
    }
  }
};
</script>
