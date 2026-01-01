export interface GSIEvent {
  buildings: Buildings
  provider: Provider
  map: Map
  player: Player
  hero: Hero
  abilities: Abilities
  items: Items
  draft: Draft
  wearables: Wearables
  auth: Auth
}

export interface Buildings {
  radiant: Radiant
}

export interface Radiant {
  dota_goodguys_tower1_top: DotaGoodguysTower1Top
  dota_goodguys_tower2_top: DotaGoodguysTower2Top
  dota_goodguys_tower3_top: DotaGoodguysTower3Top
  dota_goodguys_tower1_mid: DotaGoodguysTower1Mid
  dota_goodguys_tower2_mid: DotaGoodguysTower2Mid
  dota_goodguys_tower3_mid: DotaGoodguysTower3Mid
  dota_goodguys_tower1_bot: DotaGoodguysTower1Bot
  dota_goodguys_tower2_bot: DotaGoodguysTower2Bot
  dota_goodguys_tower3_bot: DotaGoodguysTower3Bot
  dota_goodguys_tower4_top: DotaGoodguysTower4Top
  dota_goodguys_tower4_bot: DotaGoodguysTower4Bot
  good_rax_melee_top: GoodRaxMeleeTop
  good_rax_range_top: GoodRaxRangeTop
  good_rax_melee_mid: GoodRaxMeleeMid
  good_rax_range_mid: GoodRaxRangeMid
  good_rax_melee_bot: GoodRaxMeleeBot
  good_rax_range_bot: GoodRaxRangeBot
  dota_goodguys_fort: DotaGoodguysFort
}

export interface DotaGoodguysTower1Top {
  health: number
  max_health: number
}

export interface DotaGoodguysTower2Top {
  health: number
  max_health: number
}

export interface DotaGoodguysTower3Top {
  health: number
  max_health: number
}

export interface DotaGoodguysTower1Mid {
  health: number
  max_health: number
}

export interface DotaGoodguysTower2Mid {
  health: number
  max_health: number
}

export interface DotaGoodguysTower3Mid {
  health: number
  max_health: number
}

export interface DotaGoodguysTower1Bot {
  health: number
  max_health: number
}

export interface DotaGoodguysTower2Bot {
  health: number
  max_health: number
}

export interface DotaGoodguysTower3Bot {
  health: number
  max_health: number
}

export interface DotaGoodguysTower4Top {
  health: number
  max_health: number
}

export interface DotaGoodguysTower4Bot {
  health: number
  max_health: number
}

export interface GoodRaxMeleeTop {
  health: number
  max_health: number
}

export interface GoodRaxRangeTop {
  health: number
  max_health: number
}

export interface GoodRaxMeleeMid {
  health: number
  max_health: number
}

export interface GoodRaxRangeMid {
  health: number
  max_health: number
}

export interface GoodRaxMeleeBot {
  health: number
  max_health: number
}

export interface GoodRaxRangeBot {
  health: number
  max_health: number
}

export interface DotaGoodguysFort {
  health: number
  max_health: number
}

export interface Provider {
  name: string
  appid: number
  version: number
  timestamp: number
}

export interface Map {
  name: string
  matchid: string
  game_time: number
  clock_time: number
  daytime: boolean
  nightstalker_night: boolean
  radiant_score: number
  dire_score: number
  game_state: string
  paused: boolean
  win_team: string
  customgamename: string
  ward_purchase_cooldown: number
}

export interface Player {
  steamid: string
  accountid: string
  name: string
  activity: string
  kills: number
  deaths: number
  assists: number
  last_hits: number
  denies: number
  kill_streak: number
  commands_issued: number
  kill_list: KillList
  team_name: string
  player_slot: number
  team_slot: number
  gold: number
  gold_reliable: number
  gold_unreliable: number
  gold_from_hero_kills: number
  gold_from_creep_kills: number
  gold_from_income: number
  gold_from_shared: number
  gpm: number
  xpm: number
}

export interface KillList {}

export interface Hero {
  facet: number
  xpos: number
  ypos: number
  id: number
  name: string
  level: number
  xp: number
  alive: boolean
  respawn_seconds: number
  buyback_cost: number
  buyback_cooldown: number
  health: number
  max_health: number
  health_percent: number
  mana: number
  max_mana: number
  mana_percent: number
  silenced: boolean
  stunned: boolean
  disarmed: boolean
  magicimmune: boolean
  hexed: boolean
  muted: boolean
  break: boolean
  aghanims_scepter: boolean
  aghanims_shard: boolean
  smoked: boolean
  permanent_buffs: PermanentBuffs
  has_debuff: boolean
  talent_1: boolean
  talent_2: boolean
  talent_3: boolean
  talent_4: boolean
  talent_5: boolean
  talent_6: boolean
  talent_7: boolean
  talent_8: boolean
  attributes_level: number
}

export interface PermanentBuffs {}

export interface Abilities {
  ability0: Ability0
  ability1: Ability1
  ability2: Ability2
  ability3: Ability3
  ability4: Ability4
  ability5: Ability5
}

export interface Ability0 {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  max_cooldown: number
  ultimate: boolean
}

export interface Ability1 {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  max_cooldown: number
  ultimate: boolean
}

export interface Ability2 {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  max_cooldown: number
  ultimate: boolean
}

export interface Ability3 {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  max_cooldown: number
  ultimate: boolean
}

export interface Ability4 {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  max_cooldown: number
  ultimate: boolean
}

export interface Ability5 {
  name: string
  level: number
  can_cast: boolean
  passive: boolean
  ability_active: boolean
  cooldown: number
  max_cooldown: number
  ultimate: boolean
}

export interface Items {
  slot0: Slot0
  slot1: Slot1
  slot2: Slot2
  slot3: Slot3
  slot4: Slot4
  slot5: Slot5
  slot6: Slot6
  slot7: Slot7
  slot8: Slot8
  stash0: Stash0
  stash1: Stash1
  stash2: Stash2
  stash3: Stash3
  stash4: Stash4
  stash5: Stash5
  teleport0: Teleport0
  neutral0: Neutral0
  neutral1: Neutral1
  preserved_neutral6: PreservedNeutral6
  preserved_neutral7: PreservedNeutral7
  preserved_neutral8: PreservedNeutral8
  preserved_neutral9: PreservedNeutral9
  preserved_neutral10: PreservedNeutral10
}

export interface Slot0 {
  name: string
}

export interface Slot1 {
  name: string
}

export interface Slot2 {
  name: string
}

export interface Slot3 {
  name: string
}

export interface Slot4 {
  name: string
}

export interface Slot5 {
  name: string
}

export interface Slot6 {
  name: string
}

export interface Slot7 {
  name: string
}

export interface Slot8 {
  name: string
}

export interface Stash0 {
  name: string
}

export interface Stash1 {
  name: string
}

export interface Stash2 {
  name: string
}

export interface Stash3 {
  name: string
}

export interface Stash4 {
  name: string
}

export interface Stash5 {
  name: string
}

export interface Teleport0 {
  name: string
  purchaser: number
  item_level: number
  can_cast: boolean
  cooldown: number
  max_cooldown: number
  passive: boolean
  item_charges: number
  charges: number
}

export interface Neutral0 {
  name: string
}

export interface Neutral1 {
  name: string
}

export interface PreservedNeutral6 {
  name: string
}

export interface PreservedNeutral7 {
  name: string
}

export interface PreservedNeutral8 {
  name: string
}

export interface PreservedNeutral9 {
  name: string
}

export interface PreservedNeutral10 {
  name: string
}

export interface Draft {}

export interface Wearables {
  wearable0: number
  wearable1: number
  wearable2: number
  wearable3: number
  wearable4: number
  wearable5: number
  wearable6: number
  wearable7: number
  wearable8: number
  wearable9: number
  wearable10: number
  wearable11: number
  wearable12: number
  wearable13: number
  wearable14: number
}

export interface Auth {
  token: string
}
