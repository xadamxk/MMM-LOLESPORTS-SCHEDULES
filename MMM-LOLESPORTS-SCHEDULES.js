Module.register("MMM-LOLESPORTS-SCHEDULES", {
  // Default module config
  defaults: {
    updateInterval: 60, // minutes
    // lang: config.language,
    apiKey: "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    basePath: "https://esports-api.lolesports.com/persisted/gw",
    hl: "en-US",
    // Custom
    leagueId: ["113475149040947852"], // LTA
    numberOfFutureGames: 5,
    use24HourTime: false,
    useTeamFullName: false,
    useInternationalDateFormat: false, // false = month day (US), true = day month (International)
    showPeriodLabel: true,
    showTeamLabel: true,
    showRegionAndBestOf: true,
    showTournamentBlock: false,
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
      en: "translations/en.json",
      de: "translations/de.json",
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
      config: this.config,
    };
  },
  // Fetch schedule for provided league ids
  getData: function () {
    this.sendSocketNotification("MMM-LOLESPORTS-SCHEDULES-GET-SCHEDULE", {
      apiKey: this.config.apiKey,
      basePath: this.config.basePath,
      leagueId: this.config.leagueId,
      hl: this.config.hl,
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

    // Date helpers
    const getMidnight = (day) => {
      const date = new Date(day);
      date.setMilliseconds(999);
      date.setSeconds(59);
      date.setMinutes(59);
      date.setHours(23);
      return date;
    };

    const oneDay = 1000 * 60 * 60 * 24;

    const isToday = (date) => {
      const today = new Date();
      return (
        // eslint-disable-next-line eqeqeq
        date.getDate() == today.getDate() &&
        // eslint-disable-next-line eqeqeq
        date.getMonth() == today.getMonth() &&
        // eslint-disable-next-line eqeqeq
        date.getFullYear() == today.getFullYear()
      );
    };

    const isTomorrow = (date) => {
      const midnightTonight = getMidnight(new Date());
      const midnightTomorrow = new Date(midnightTonight.getTime() + oneDay);
      return date > midnightTonight && date < midnightTomorrow;
    };

    const futureEvents = events
      .filter((event) => {
        return (
          event["startTime"] > new Date().toISOString() ||
          event["state"] === "inProgress"
        );
      })
      .slice(0, this.config.numberOfFutureGames)
      // Add custom fields for display
      .map((event) => {
        // Is Live
        if (event["state"] === "inProgress") {
          event["isLive"] = true;
        } else {
          event["isLive"] = false;
        }
        // Start time fields
        const startTimeDate = new Date(event["startTime"]);
        let hours = startTimeDate.getHours();
        if (hours >= 12) {
          event["startPeriod"] = "PM";
        } else {
          event["startPeriod"] = "AM";
        }
        if (!this.config.use24HourTime) {
          hours = hours % 12;
        }
        event["startHour"] = hours;
        // Start date fields
        if (isToday(startTimeDate)) {
          event["startDayOfWeek"] = this.translate("TODAY");
        } else if (isTomorrow(startTimeDate)) {
          event["startDayOfWeek"] = this.translate("TOMORROW");
        } else {
          switch (startTimeDate.getDay()) {
            case 0:
              event["startDayOfWeek"] = this.translate("SUNDAY");
              break;
            case 1:
              event["startDayOfWeek"] = this.translate("MONDAY");
              break;
            case 2:
              event["startDayOfWeek"] = this.translate("TUESDAY");
              break;
            case 3:
              event["startDayOfWeek"] = this.translate("WEDNESDAY");
              break;
            case 4:
              event["startDayOfWeek"] = this.translate("THURSDAY");
              break;
            case 5:
              event["startDayOfWeek"] = this.translate("FRIDAY");
              break;
            case 6:
              event["startDayOfWeek"] = this.translate("SATURDAY");
              break;
            default:
              event["startDayOfWeek"] = this.translate("SUNDAY");
          }
        }
        // Start month fields
        switch (startTimeDate.getMonth()) {
          case 0:
            event["startMonth"] = this.translate("JANUARY");
            break;
          case 1:
            event["startMonth"] = this.translate("FEBRUARY");
            break;
          case 2:
            event["startMonth"] = this.translate("MARCH");
            break;
          case 3:
            event["startMonth"] = this.translate("APRIL");
            break;
          case 4:
            event["startMonth"] = this.translate("MAY");
            break;
          case 5:
            event["startMonth"] = this.translate("JUNE");
            break;
          case 6:
            event["startMonth"] = this.translate("JULY");
            break;
          case 7:
            event["startMonth"] = this.translate("AUGUST");
            break;
          case 8:
            event["startMonth"] = this.translate("SEPTEMBER");
            break;
          case 9:
            event["startMonth"] = this.translate("OCTOBER");
            break;
          case 10:
            event["startMonth"] = this.translate("NOVEMBER");
            break;
          case 11:
            event["startMonth"] = this.translate("DECEMBER");
            break;
          default:
            event["startMonth"] = this.translate("JANUARY");
            break;
        }

        event["startDayOfMonth"] = startTimeDate.getDate();

        return event;
      });

    // Credit: https://stackoverflow.com/a/46802505
    var groupByDay = function (arr) {
      return arr.reduce((groups, entry) => {
        if (!entry || !entry.hasOwnProperty("startTime")) {
          return groups;
        } else {
          const localDate = new Date(entry["startTime"]).toLocaleDateString();
          if (!groups[localDate]) {
            groups[localDate] = [];
          }
          groups[localDate].push(entry);
        }
        return groups;
      }, {});
    };
    // Games grouped by day
    const groupedSchedulesMap = groupByDay(futureEvents);
    const groupedSchedules = Object.values(groupedSchedulesMap);
    this.groupedSchedules = groupedSchedules;
    this.updateDom(500);
  },
});
