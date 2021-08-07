Module.register("MMM-LOLESPORTS-SCHEDULES", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    basePath: "https://esports-api.lolesports.com/persisted/gw",
    leagueIds: ["98767991299243165"], // NA LCS
    hl: "en-US",
    numberOfFutureGames: 5
  },

  // Module properties.
  groupedSchedules: [],

  // Start the module.
  start: function () {
    // Get initial API data
    this.getData();

    // Schedule update poll
    var self = this;
    setInterval(function () {
      self.getData();
    }, self.config.updateInterval * 60 * 1000); //convert to milliseconds
  },
  getTranslations() {
    return {
      en: "translations/en.json"
    };
  },
  getStyles: function () {
    return ["MMM-LOLESPORTS-SCHEDULES.css"];
  },
  getTemplate() {
    return `templates/schedules.njk`;
  },
  getTemplateData() {
    return {
      groupedSchedules: this.groupedSchedules,
      config: this.config
    };
  },
  // Fetch schedule for provided league ids
  getData: function () {
    this.sendSocketNotification("MMM-LOLESPORTS-SCHEDULES-GET-SCHEDULE", {
      apiKey: this.config.apiKey,
      basePath: this.config.basePath,
      leagueIds: this.config.leagueIds,
      hl: this.config.hl
    });
  },

  // Schedule data is coming back
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-LOLESPORTS-SCHEDULES-SCHEDULE") {
      this.getSchedulesData(payload);
    }
  },
  // Condense schedule data and render it
  getSchedulesData: function (data) {
    if (!data || !data.hasOwnProperty("data")) {
      return []; // Wrong league id most likely
    }
    if (!data["data"]["schedule"] || !data["data"]["schedule"]["events"]) {
      return []; // No events for league id
    }
    const events = data["data"]["schedule"]["events"];

    const futureEvents = events
      .filter((event) => {
        return event["startTime"] > new Date().toISOString();
      })
      .slice(0, this.config.numberOfFutureGames);
    console.log(futureEvents);

    // Credit: https://stackoverflow.com/a/20631750/2694643
    var groupByTimePeriod = function (obj, timestamp, period) {
      var objPeriod = {};
      var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      for (var i = 0; i < obj.length; i++) {
        var d = new Date(obj[i]["startTime"]);
        if (period == "day") {
          d = Math.floor(d.getTime() / oneDay);
        } else if (period == "week") {
          d = Math.floor(d.getTime() / (oneDay * 7));
        } else if (period == "month") {
          d = (d.getFullYear() - 1970) * 12 + d.getMonth();
        } else if (period == "year") {
          d = d.getFullYear();
        } else {
          console.log(
            "groupByTimePeriod: You have to set a period! day | week | month | year"
          );
        }
        // define object key
        objPeriod[d] = objPeriod[d] || [];
        objPeriod[d].push(obj[i]);
      }
      return objPeriod;
    };
    // Games grouped by day
    const groupedSchedulesMap = groupByTimePeriod(futureEvents, "date", "day");
    const groupedSchedules = Object.values(groupedSchedulesMap).map(
      (values) => values
    );
    console.log(groupedSchedules);
    this.groupedSchedules = groupedSchedules;
    this.updateDom(500);
  }
});
