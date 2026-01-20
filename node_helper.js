/* Magic Mirror
 * Node Helper: MMM-LOLESPORTS-SCHEDULES
 *
 * By xadamxk
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var https = require("https");

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.
  socketNotificationReceived: function (notification, payload) {
    let self = this;
    if (notification === "MMM-LOLESPORTS-SCHEDULES-GET-SCHEDULE") {
      const basePath = payload["basePath"];
      const apiKey = payload["apiKey"];
      const leagueId = payload["leagueId"];

      // Construct the URL
      const url = `${basePath}/persisted/gw/getSchedule?hl=en-US&leagueId=${leagueId}`;

      https
        .get(
          url,
          {
            headers: {
              "x-api-key": apiKey,
            },
          },
          (response) => {
            let data = "";

            // A chunk of data has been received
            response.on("data", (chunk) => {
              data += chunk;
            });

            // The whole response has been received
            response.on("end", () => {
              try {
                const jsonData = JSON.parse(data);
                self.sendNotificationTest(jsonData);
              } catch (error) {
                console.error("Error parsing response:", error);
              }
            });
          }
        )
        .on("error", (error) => {
          console.error("Error fetching schedule:", error);
        });
    }
  },
  // Example function send notification test
  sendNotificationTest: function (payload) {
    this.sendSocketNotification("MMM-LOLESPORTS-SCHEDULES-SCHEDULE", payload);
  },
});
