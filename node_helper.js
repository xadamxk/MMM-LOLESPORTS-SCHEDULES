/* Magic Mirror
 * Node Helper: MMM-LOLESPORTS-SCHEDULES
 *
 * By xadamxk
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var LolesportsApi = require("esm")(module)("lolesports-js-sdk");
var defaultClient = LolesportsApi.ApiClient.instance;
var api = new LolesportsApi.LeaguesApi();

module.exports = NodeHelper.create({
	// Override socketNotificationReceived method.
	socketNotificationReceived: function (notification, payload) {
		let self = this;
		if (notification === "MMM-LOLESPORTS-SCHEDULES-GET-SCHEDULE") {
			defaultClient.basePath = payload["basePath"];
			defaultClient.authentications["apiKeyAuth"]["apiKey"] = payload["apiKey"];

			// TODO: Update 
			api.getStandings(LolesportsApi.Locale.enUS, { tournamentId: payload["tournamentIds"] }, function (error, data, response) {
				if (error) {
					console.error(error);
				} else {
					// console.log("API called successfully. Returned data: " + JSON.stringify(data));
					self.sendNotificationTest(data);
				}
			});
		}
	},
	// Example function send notification test
	sendNotificationTest: function (payload) {
		this.sendSocketNotification("MMM-LOLESPORTS-SCHEDULES-SCHEDULE", payload);
	}
});
