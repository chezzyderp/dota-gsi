DotaGSI

Node.js/TypeScript библиотека для работы с Dota 2 Game State Integration (GSI).
Позволяет подписываться на изменения состояния игры с возможностью фильтрации по маске.

Установка
npm install dota-gsi


или

yarn add dota-gsi


Требуется Node.js 18+.

Использование
import { DotaGSI } from 'dota-gsi'

const gsi = new DotaGSI({
  port: 3000, // порт сервера для приема GSI
  clientTokens: ['hello1234'], // токены клиентов, если нужно
})

Подписка на события

Используется метод on с маской, которая повторяет структуру GSIEvent.
В маске можно указать true для примитивов или объектов, чтобы получать изменения по ним.

gsi.on(
  {
    player: { kills: true, deaths: true },
    hero: true, // подписка на всю структуру hero
  },
  (changes) => {
    console.log('Изменения:', changes)
  },
)


changes будет содержать только изменённые поля, соответствующие маске.

Если значение в маске — объект, то возвращается объект с изменениями внутри него.

Конфигурация
type DotaGSIConfig = {
  port?: number             // Порт для запуска сервера (по умолчанию 3000)
  clientTokens?: string[]   // Список валидных токенов клиентов
}


Пример конфигурации:

const gsi = new DotaGSI({
  port: 4000,
  clientTokens: ['myToken1', 'myToken2'],
})

Методы
on(mask, listener)

Подписка на изменения по маске:

mask — объект с булевыми значениями, повторяющий структуру GSIEvent.

listener — функция, которая вызывается при изменениях:

(listener: (changes: DeepPartial<GSIEvent>) => void)
