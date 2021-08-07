Module.register("MMM-LOLESPORTS-SCHEDULES", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    basePath: "https://esports-api.lolesports.com/persisted/gw",
    leagueId: ["98767991299243165"], // NA LCS
    hl: "en-US",
    // Custom
    numberOfFutureGames: 5,
    showPeriodLabel: true,
    use24HourTime: false,
    useTeamFullName: true,
    hideTeamLabel: false
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
      leagueId: this.config.leagueId,
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
      .slice(0, this.config.numberOfFutureGames)
      // Add custom fields for display
      .map((event) => {
        // Start time fields
        let hours = new Date(event["startTime"]).getHours();
        if (hours >= 12) {
          event["startPeriod"] = "PM";
        } else {
          event["startPeriod"] = "AM";
        }
        if (!this.config.use24HourTime) {
          hours = hours % 12;
        }
        event["startHour"] = hours;
        // Header fields
        return event;
      });

    // Credit: https://stackoverflow.com/a/37844673/2694643
    var groupByDay = function (obj) {
      var objPeriod = {};
      var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
      for (var i = 0; i < obj.length; i++) {
        var d = new Date(obj[i]["startTime"]); // unique to schedule data
        d = Math.floor(d.getTime() / oneDay);
        // define object key
        objPeriod[d] = objPeriod[d] || [];
        objPeriod[d].push(obj[i]);
      }
      return objPeriod;
    };
    // Games grouped by day
    const groupedSchedulesMap = groupByDay(futureEvents);
    const groupedSchedules = Object.values(groupedSchedulesMap).map(
      (values) => values
    );
    console.log(groupedSchedules);
    this.groupedSchedules = groupedSchedules;
    this.updateDom(500);
  }
});
