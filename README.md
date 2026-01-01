# DotaGSI

Node.js/TypeScript библиотека для работы с **Dota 2 Game State Integration (GSI)**.  
Позволяет подписываться на изменения состояния игры с возможностью фильтрации по маске.

## Установка

```bash
npm install dota-gsi
```

или

```bash
yarn add dota-gsi
```

> Требуется Node.js 18+.

---

## Использование

```ts
import { DotaGSI } from 'dota-gsi'

const gsi = new DotaGSI({
  port: 3000, // порт сервера для приема GSI
  clientTokens: ['hello1234'], // токены клиентов, если нужно
})
```

### Подписка на события

Используется метод `on` с **маской**, которая повторяет структуру `GSIEvent`.  
В маске можно указать `true` для примитивов или объектов, чтобы получать изменения по ним.

```ts
gsi.on(
  {
    player: { kills: true, deaths: true },
    hero: true, // подписка на всю структуру hero
  },
  (changes) => {
    console.log('Изменения:', changes)
  },
)
```

- `changes` будет содержать только изменённые поля, соответствующие маске.
- Если значение в маске — объект, то возвращается объект с изменениями внутри него.

---

## Методы

### `on(mask, listener)`

Подписка на изменения по маске:

- **mask** — объект с булевыми значениями, повторяющий структуру `GSIEvent`.
- **listener** — функция, которая вызывается при изменениях:

```ts
(listener: (changes: DeepPartial<GSIEvent>) => void)
```

---

## Пример структуры GSIEvent

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
