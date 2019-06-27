/**
 * @global
 */

/**
 * @typedef BuffObject
 * @property {number} uid
 * @property {string} kind
 * @property {number} effect
 * @property {number} effect_value
 * @property {number} effect_roll
 * @property {any} effect_filter
 * @property {number} caster_uid 
 * @property {number} target_uid
 * @property {number} target_kind
 * @property {number} end_eta
 * @property {number} end_trigger
 */

/**
 * @typedef PlayerObject
 * @property {number} uid
 * @property {string} user_id
 * @property {string} alias
 * @property {number} colour_left
 * @property {number} colour_right
 * @property {number} shape
 * @property {number} damage
 * @property {number} kills
 * @property {number} burns
 * @property {number} gold
 * @property {number} mana
 * @property {number} valour
 * @property {Array<any>} drawn_unit_uids
 * @property {Array<any>} deck 
 * @property {{string: number}} min_deck 
 * @property {{string: any}} rewards 
 * @property {number} exp
 * @property {{string: any}} achievements
 */

/**
 * @typedef UnitObject
 * @property {number} uid
 * @property {number} player_uid
 * @property {string} kind
 * @property {number} hero
 * @property {number} strength
 * @property {number} population
 * @property {number} race
 * @property {number} faction
 * @property {Array<number>} traits
 * @property {number} undead
 * @property {number} hero_uid
 * @property {number} power_uid
 * @property {number} behaviour_kind
 * @property {number} behaviour_end
 * @property {number} behaviour_start
 * @property {number} move_kind
 * @property {number} speed
 * @property {number} hex_index
 * @property {number} hex_target
 * @property {number} hex_offset
 * @property {Array<any>} waypoints
 * @property {Array<any>} path
 * @property {number} cost
 * @property {number} speed_bonus
 * @property {number} strength_bonus
 * @property {number} cost_bonus
 * @property {number} rarity
 */

/**
 * @typedef GraveObject
 * @property {number} uid
 * @property {number} hex_index
 * @property {number} hex_target
 * @property {number} hex_offset
 * @property {Map<number, number>} bodies
 */

/**
 * @typedef PowerObject
 * @property {number} uid
 * @property {string} zombie_mountain_warrior
 * @property {number} unit_uid
 * @property {number} cost
 * @property {number} restore_duration
 * @property {number} restore_eta
 * @property {number} trigger
 * @property {Array<number>} trigger_filter
 * @property {number} target_kind
 * @property {Array<any>} target_filter
 * @property {number} target_range
 * @property {number} target_area
 * @property {number} effect
 * @property {number} effect_value
 * @property {number} effect_roll
 * @property {Array<any>} effect_filter
 * @property {boolean} buff
 * @property {number} buff_duration
 * @property {number} buff_end_trigger
 */

/**
 * @typedef PlacesObject
 * @property {number} uid
 * @property {string} name
 * @property {string} kind
 * @property {number} player_uid
 * @property {number} hex_index
 * @property {number} population
 * @property {number} cost
 * @property {number} race
 * @property {Array<number>} traits
 * @property {any} reward_kind
 * @property {any} reward_value
 * @property {any} reward_uid
 * @property {number} fortifications
 * @property {number} fortifications_bonus
 * @property {number} resources_produced
 * @property {number} resource_kind
 * @property {number} resource_eta
 * @property {number} resources_per_person
 * @property {number} blighted
 * @property {number} start
 * @property {string} militia_kind
 * @property {number} militia_cost
 * @property {number} militia_population
 * @property {number} militia_strength
 * @property {number} militia_eta
 * @property {number} deploy_eta
 */

/**
 * @typedef ConfigObject
 * @property {string} kind
 * @property {number} difficulty
 * @property {number} [playerType]
 * @property {string} [name]
 * @property {string} [adminUserId]
 * @property {Array<string>} [non_default_settings]
 * @property {number} [minLevel]
 * @property {boolean} [turnBased]
 * @property {string} [kind_name]
 * @property {string} [version]
 * @property {string} [password]
 * @property {boolean} [tutorial]
 * @property {string} [adminUserId]
 * @property {string} [description]
 * @property {any} [tournament]
 * @property {string} [version]
 */

/**
 * @typedef GameObject
 * @property {string} status
 * @property {string} name
 * @property {string} creator
 * @property {Date} created
 * @property {number} joined
 * @property {string} number
 * @property {number} players
 * @property {Date} activity
 * @property {'required' | ''} password
 * @property {ConfigObject} config
 */

/**
 * @typedef AccountObject
 * @property {boolean} allowEmail
 * @property {Date} created
 * @property {string} adminUserId
 * @property {string} nagged
 * @property {Array<any>} gifts
 * @property {string} alias
 * @property {boolean} emailBouncing
 * @property {string} csrf
 * @property {boolean} emailVerified
 * @property {Array<GameObject>} games
 * @property {string} email
 */

/**
 * @typedef FullUniverseMapObject
 * @property {Array<Array<string | number | null>>} graves
 * @property {Array<any>} roads
 * @property {number} width
 * @property {Array<any>} rivers
 * @property {Array<number>} terrain
 * @property {number} height
 */

/**
 * @typedef FullUinverseReportObject
 * @property {BuffObject} buffs
 * @property {PlayerObject} players
 * @property {UnitObject} units
 * @property {PlacesObject} places
 * @property {PowerObject} powers
 * @property {number} deploy_unit_cost_multiplier
 * @property {boolean} paused
 * @property {number} undead_souls
 * @property {number} buy_place_cost_multiplier
 * @property {string} user_id
 * @property {ConfigObject} config
 * @property {number} living_souls
 * @property {FullUniverseMapObject} map
 * @property {number} game_over
 * @property {boolean} started
 * @property {number} militia_training_time
 * @property {number} start_time
 * @property {number} use_power_cost_multiplier
 * @property {number} soulds_at_rest
 * @property {number} now
 * @property {number} valour_mana_exchange
 * @property {number} player_uid
 * @property {number} admin
 * @property {number} age
 * @property {number} valour_bonus_zombie_strength_divisor
 * @property {number} starting_population
 * @property {number} valour_gold_exchange
 * @property {number} restless_souls
 */

/**
 * @typedef FullUniverseObject
 * @property {string} event
 * @property {FullUinverseReportObject} report
 */

 /**
 * @typedef AchievementsObject
 * @property {number} troll_zombie_lord
 * @property {number} dwarf_zombie_boss
 * @property {number} elf_zombie_lord
 * @property {number} elf_zombie_boss
 */

/**
 * @typedef CardsObject
 * @property {number} quantity
 * @property {string} kind
 * @property {number} hero
 * @property {number} strength
 * @property {Array<number>} traits
 * @property {number} move_kind
 * @property {number} speed
 * @property {number} population
 * @property {number} race
 * @property {number} faction
 * @property {number} cost
 * @property {number} rarity
 * @property {PowerObject} power
 */

/**
 * @typedef CollectionObject
 * @property {AchievementsObject} achievements
 * @property {Array<any>} drafted
 * @property {string} user_id
 * @property {number} level
 * @property {number} credits
 * @property {Map<any, any>} badges
 * @property {number} exp
 * @property {any} cards
 * @property {string} type
 * @property {string} user_email
 * @property {Date} subscription
 * @property {CardsObject} cards
 */


