# DotaGSI

Node.js/TypeScript library for working with **Dota2 Game State Integration (GSI)**.  
Allows you to subscribe to game state changes with the ability to filter by mask.


## Quick Start

### Installing

```bash
npm i @chezzyderp/dota-gsi
```

---

### Creating a GSI configuration
Make sure that you have the created config in the directory
```steamapps\common\dota 2 beta version\game\dota\cfg\gamestate_integration```

For example, with a file like ```gamestate_integration_dota2-gsi.cfg``` with such contents

``` 
"dota2-gsi Configuration"
{
    "uri"               "http://localhost:3000/"
    "timeout"           "5.0"
    "buffer"            "0.1"
    "throttle"          "0.1"
    "heartbeat"         "30.0"
    "data"
    {
        "buildings"     "1"
        "provider"      "1"
        "map"           "1"
        "player"        "1"
        "hero"          "1"
        "abilities"     "1"
        "items"         "1"
        "draft"         "1"
        "wearables"     "1"
    }
    "auth"
    {
        "token"         "hello1234"
    }
}
```

Also, don't forget to add the "-gamestateintegration" flag to the Dota2 launch options on Steam.

```
 Steam -> Dota2 -> Properties -> General -> Launch Options
```



### Code example
```ts
import { DotaGSI } from 'dota-gsi'

const gsi = new DotaGSI({
  port: 3000, // Server port for receiving GSI
  clientTokens: ['hello1234'], // client tokens, if necessary
})

gsi.on(
  {
    player: { kills: true, deaths: true },
    hero: true, // Subscribe to the entire hero structure
  },
  (changes) => {
    console.log('Changes:', changes)
  },
)
```

---

## Example of GSIEvent

```ts
interface GSIEvent {
  buildings: Record<string, any>
  map: {
    game_time: number
    clock_time: number
    daytime: boolean
    win_team: 'radiant' | 'dire' | 'none'
  }
  player: {
    steamid: string
    name: string
    kills: number
    deaths: number
    assists: number
  }
  hero: {
    name: string
    level: number
    health: number
    mana: number
  }
  items: Record<string, { name: string }>
  abilities: Record<string, { name: string; level: number }>
  auth: { token: string }
}
```
