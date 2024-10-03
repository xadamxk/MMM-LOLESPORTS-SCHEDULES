# MMM-LOLESPORTS-SCHEDULES
An Esports schedule module for a provided League of Legends tournament id.
Module for <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a>.

Other league related modules:
- <a href="https://github.com/xadamxk/MMM-CHAMPIONSQUEUE-LEADERBOARD">MMM-CHAMPIONSQUEUE-LEADERBOARD</a>: Display LOL Champions Queue standings
- <a href="https://github.com/xadamxk/MMM-LOLESPORTS-STANDINGS">MMM-LOLESPORTS-STANDINGS</a>: Display LOL Esports league standings 

## Previews with Configuration Samples
#### Default
<img src="https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES/blob/main/screenshots/default_live.png?raw=true" title="Default Configuration Preview"  />

<details> 
  <summary>Hide Team Label Format:</summary>
  <img src="https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES/blob/main/screenshots/hideFullName.png?raw=true" title="Preview Hide Team Label Format"  />
	<pre><code>
config: {
	showTeamLabel: false	
}
	</code></pre>
</details>

<details> 
  <summary>Minified Format:</summary>
  <img src="https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES/blob/main/screenshots/hideFullName_hideRegionAndBestOf.png?raw=true" title="Preview Minified Format"  />
	<pre><code>
config: {
	showTeamLabel: false,
	showRegionAndBestOf: false,
}
	</code></pre>
</details>

<details> 
  <summary>Full Format:</summary>
  <img src="https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES/blob/main/screenshots/hidePeriodLabel_use24hour_useFullTeamName_showTournamentBlock.png?raw=true" title="Preview Full Format"  />
	<pre><code>
config: {
	showPeriodLabel: false,
	use24HourTime: true,
	useTeamFullName: true,
	showTournamentBlock: true
}
	</code></pre>
</details>

## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
SSH: git clone git@github.com:xadamxk/MMM-LOLESPORTS-SCHEDULES.git
HTTPS: git clone https://github.com/xadamxk/MMM-LOLESPORTS-SCHEDULES.git
````

Install/Update Dependencies:
````
npm install
````

## Configuration
Add `MMM-LOLESPORTS-SCHEDULE` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "MMM-LOLESPORTS-SCHEDULES",
		position: "bottom_left",
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
| `useInternationalDateFormat` | boolean | false | Show date format as international format (Day. Month) - False for US format (Month Day) |
| `showPeriodLabel` | boolean | true | Show period (AM/PM) after time. |
| `showTeamLabel` | boolean | true | Show team label (name/code). Use `false` for slim component. |
| `showRegionAndBestOf` | boolean | true | Show region and best of format for games. |
| `showTournamentBlock` | boolean | false | Show tournament block (ie. Playoffs - Round 1) after start date.|

### League Ids
League Ids are obtained by navigating to `https://lolesports.com/schedule`, opening dev tools, selecting a league filter, and finding the league id in the network panel.

| **League** | **League Id** |
| --- | --- |
| Arabian League | `109545772895506419` |
| CBLOL Academy | `105549980953490846` |
| CBLOL | `98767991332355509` |
| EBL | `105266108767593290` |
| Elite Series | `107407335299756365` |
| Greek Legends League | `105266108767593290` |
| Hitpoint Masters | `105266106309666619` |
| LCK Challengers | `98767991335774713` |
| LCK | `98767991310872058` |
| LCL | `98767991355908944` |
| LCO | `105709090213554609` |
| LCS Challengers | `109511549831443335` |
| LCS | `98767991299243165` |
| LEC | `98767991302996019` |
| LFL | `105266103462388553` |
| Liga Portuguesa | `105266101075764040` |
| LJL Challengers | `106827757669296909` |
| LJL | `98767991349978712` |
| LLA | `101382741235120470` |
| LOL Italian Tournament | `105266094998946936` |
| LPL | `98767991314006698` |
| NLC | `105266098308571975` |
| PCS | `104366947889790212` |
| Prime League | `105266091639104326` |
| Superliga | `105266074488398661` |
| TCL | `98767991343597634` |
| Ultraliga | `105266088231437431` |
| VCS | `107213827295848783` |
| Worlds | `98767975604431411` |

