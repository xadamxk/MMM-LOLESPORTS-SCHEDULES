# MMM-LOLESPORTS-SCHEDULES
An Esports schedule module for a provided League of Legends tournament id.
Module for <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a>.

## Preview
<img src="https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES/blob/main/screenshots/default.png?raw=true" title="Default Configuration Preview"  />


## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com:xadamxk/MMM-LOLESPORTS-SCHEDULES.git
````

## Configuration
Add `MMM-LOLESPORTS-SCHEDULE` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "MMM-LOLESPORTS-SCHEDULES",
		position: "middle_center",
		config: {}
	}
]
````
### Configuration Options

| **Option** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `updateInterval` | integer | 60 | Number of minutes to poll api for updates. |
| `apiKey` | string | '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' | Api key used to query esports API - all users' api key is the default key. |
| `basePath` | string | 'https://esports-api.lolesports.com/persisted/gw' | Base bath used to query the esports api. |
| `leagueId` | array | ["98767991299243165"] | Array of league ids to get esport standings. Currently the API only supports a single league id. If no id is provided, then all region games will be provided. Refer to league table below for ids of other leagues. Defaults to NA LCS.|
| `hl` | string | 'en-US' | Host language/ locale to use when requesting esports data. |
| `numberOfFutureGames` | integer | `5` | Number of future games to display. |
| `use24HourTime` | boolean | false | Use 24 hour format (hh:mm) rather than 12 hour format (hh PERIOD) |
| `useTeamFullName` | boolean | false | Show teams' full name rather than teams' code. |
| `showPeriodLabel` | boolean | true | Show period (AM/PM) after time. |
| `showTeamLabel` | boolean | true | Show team label (name/code). Use `false` for slim component. |
| `showRegionAndBestOf` | boolean | true | Show region and best of format for games. |
| `showTournamentBlock` | boolean | false | Show tournament block (ie. Playoffs - Round 1) after start date.|

### League Ids
League Ids are obtained by navigating to `https://lolesports.com/schedule`, opening dev tools, selecting a league filter, and finding the league id in the network panel.

| **League** | **League Id** |
| LCS | `98767991299243165` |
| LCS Academy | `99332500638116286` |
| LEC | `98767991302996019` |
| LCK | `98767991310872058` |
| LPL | `98767991314006698` |
| TCL | `98767991343597634` |
| CBLOL | `98767991332355509` |
| LLA | `101382741235120470` |
| LCO | `105709090213554609` |
| LJL | `98767991349978712` |
| LCL | `98767991355908944` |

