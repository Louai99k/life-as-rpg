## Player Identity

Player model defines all information required to run character consistently between sessions. It exists to remove guesswork, reduce admin work, and make later automation possible.

## Character Sheet Philosophy

Character sheet should track only values that matter for play, progression, requirement checks, and mission consequences. If data does not create decisions, resolve rules, or support continuity, it should not become a core tracked stat.

## Persistent Attributes

- character name or identifier
- level
- current XP bar
- LP
- max Ki
- current Ki
- money
- owned abilities
- owned items tracked separately in inventory as ability subtype
- unlocked sets
- long-term traits or flags

## Base Stats

These are core character stats, not Skills.

- Strength
- Agility
- Dexterity
- Intelligence
- Charisma
- Wisdom

Base stat rules:

- starting value: all base stats start at `10`
- stat increase: spending `1` LP increases chosen stat by `+1`
- stat cap: none

## Derived Attributes

Derived values are calculated from persistent data and rule formulas. Derived values should never require manual interpretation when formula exists.

Examples:

- next level threshold
- active slot count
- power caps
- current Player rank
- encounter access limits

## Visible vs Hidden Stats

Visible stats are values Player always knows from System panels. Hidden stats are behind-scenes values used for generation, mystery, or enemy logic. Any hidden stat must still be documented for system design even if not always shown in play.

## Resources

Resources are spendable or depletable tracked values. Initial core resources:

- XP for growth
- LP for base stat increases
- Ki for magic use
- money for purchases
- consumable items

Starting resource defaults:

- money starts at `$1000`
- no free starting abilities; abilities are acquired through play (missions, purchases, or special events)
- gear slots are empty at start; capacity follows Active Slot Capacity table at rank `F`

## Conditions

Conditions are temporary state changes such as injury, exhaustion, silence, seal, exposure, or mission flags. Condition rules must define:

- trigger
- effect
- duration
- removal method
- whether condition stacks

Condition triggers may come from any valid source, including enemy effects, equipped item effects, entering specific areas, or other rules-defined events.

## Inventory

Inventory tracks owned items and quantity-sensitive objects. Each item entry should eventually support:

- name
- type
- tags
- rank
- effect
- quantity or uniqueness
- acquisition source

## Gear

Gear is limited active configuration for immediate mission use. Gear exists to cap complexity and force meaningful choice. Gear should favor small number of strong options over huge number of weak individually slotted options.

When multiple active abilities apply to same action, their `Resolution Score` contributions stack by addition.

## Ability Ownership

Character may own more abilities than can be actively equipped. Ownership records what is learned or acquired. Items are also abilities, but remain tracked separately in inventory because they are object-based. Gear records what is currently active. Rules must never confuse these layers.

## Auto-Update Rules

State tracker should automatically update only rules that are deterministic from explicit triggers.

Auto-updated behaviors are:

- level-up when gained XP reaches required threshold
- reward application when mission or other reward mechanism grants output
- condition addition and removal based on defined trigger, removal condition, or duration
- Ki recovery after Game Master-defined recovery trigger, rest, or resource effect
- dynamic tag and temporary acquisition updates from gear, locations, conditions, triggered events, and mission-only effects
