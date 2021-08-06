# MMM-LOLESPORTS-SCHEDULES
An Esports schedule module for a provided League of Legends tournament id.
Module for <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a>.

## Preview
<img src="" title="Preview"  />


## Installation
In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com:xadamxk/MMM-LOLESPORTS-SCHEDULE.git
````

## Configuration
Add `MMM-LOLESPORTS-SCHEDULE` module to the `modules` array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "MMM-LOLESPORTS-SCHEDULE",
		position: "middle_center",
		config: {
			
		}
	}
]
````
### Configuration Options

| **Option** | **Type** | **Default** | **Description** |
| --- | --- | --- | --- |
| `updateInterval` | integer | 60 | Number of minutes to poll api for updates. |
| `apiKey` | string | '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z' | Api key used to query esports API - all users' api key is the default key. |
| `basePath` | string | 'https://esports-api.lolesports.com/persisted/gw' | Base bath used to query the esports api. |
| `leagueIds` | array | [""] | Array of league ids to get esport standings. Module is coded to handle one, but multiple league ids may be supported. Refer to league table below for ids of other leagues. |
| `hl` | string | 'en-US' | Host language/ locale to use when requesting esports data. |
| `useTeamFullName` | boolean  | true | Set `false` to show team codes rather than team names. |
| `showTeamIcons` | boolean  | true | Set `false` to hide team icons. |
| `showStageName` | boolean  | true | Set `false` to hide the stage name above standings list (ie. Regular Season, Playoffs, etc) |

### League Ids

| **League** | **League Id** |
