Module.register("MMM-LOLESPORTS-SCHEDULES", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    basePath: "https://esports-api.lolesports.com/persisted/gw",
    tournamentIds: ["105658534671026792"], // NA LCS
    hl: "en-US",
    useTeamFullName: true, // Show team's full name rather than team code
    showTeamIcons: true, // Show team's icon
    showStageName: true // Show the stage name (ie. Regular Season, Playoffs, etc)
  },

  // Module properties.
  standings: [],
  stageName: "",

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
      standings: this.standings,
      stageName: this.stageName,
      config: this.config
    };
  },
  // Fetch schedule for provided tournament ids
  getData: function () {
    this.sendSocketNotification("MMM-LOLESPORTS-SCHEDULES-GET-SCHEDULE", {
      apiKey: this.config.apiKey,
      basePath: this.config.basePath,
      tournamentIds: this.config.tournamentIds,
      hl: this.config.hl
    });
  },

  // Schedule data is coming back
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-LOLESPORTS-SCHEDULES-SCHEDULE") {
      this.getStandingData(payload);
    }
  },
  // Condense standing data and render it
  getStandingData: function (data) {
    let stageName = "";
    if (!data || !data.hasOwnProperty("data")) {
      return []; // Wrong tournament id most likely
    }
    data["data"]["standings"].forEach((standing) => {
      if (!standing["stages"]) {
        return;
      }
      standing["stages"].forEach((stage) => {
        stageName = stage["name"];
        stage["sections"].forEach((section) => {
          if (!section["rankings"] || !section["rankings"].length) {
            return;
          }
          this.standings = section["rankings"];
          this.stageName = stageName;
          this.updateDom(500);
        });
      });
    });
  }
});
