## Progression Philosophy

Progression must feel visible, frequent enough to stay motivating, and stable enough to support balance. Growth should reward completed play, not demand repetitive grind with little change.

## Level Structure

Level is main long-term progression axis.

- starting level: `1`
- level cap: `1000`
- next level required XP: flat per rank from XP / Level column in `Docs/Oracles/01 - Rank and Scaling Tables.md`
- each level-up grants LP and resets current XP bar after overflow is carried forward
- Player rank is `F, E, D, C, B, A, S, SS, SSS, Z` and is mapped to level bands in `Docs/Oracles/01 - Rank and Scaling Tables.md`

## XP Rules

XP is stored as current bar only, not lifetime total.

- XP is awarded from missions, specific interactions, or special events
- current XP bar resets on each level-up
- overflow carries into next level's XP bar
- failure has no XP effect unless mission rules explicitly say otherwise
- XP gained at level `1000` is discarded because progression cannot exceed the level cap

## Level-Up Triggers

Level-up occurs automatically when XP reaches required threshold.

- threshold check timing: on every XP change
- overflow handling: remaining XP carries into next level's bar
- repeated level-up handling: continue recalculating with same formula until overflow no longer reaches next threshold
- reward grant timing: immediately on level-up
- current XP bar resets each level after overflow is applied forward
- when overflow reaches level `1000`, any remaining XP is discarded

## LP Rules

LP is used for base stats only.

- gain source: level-up or special events
- level-up gain amount: per rank (F=4, E=4, D=3, C=3, B=3, A=2, S=2, SS=2, SSS=2, Z=2)
- spending rule: `1` LP = `+1` to one base stat

## Ki Rules

Ki is primary supernatural energy resource used by Magic.

- max Ki formula: `((Level - 1) ^ 2) * 10`
- every level-up restores current Ki to the newly calculated max Ki
- Ki regenerates after getting out of combat based on Game Master decision per scene
- Ki may be restored during fights by passives, consumables, or abilities
- at zero Ki, character cannot use Magic
- non-magic systems do not interact with Ki indirectly

## Growth Expectations

- early game growth should feel faster than most other Players
- mid game should push specialization into stealth, escape, and survival-heavy play because character is known enough to attract threat without yet being overwhelmingly powerful
- late game target is for character to become strongest among other Players

## Cap Rules

Caps currently defined:

- level cap: `1000`
- ranks: `F, E, D, C, B, A, S, SS, SSS, Z`
- single ability contribution cap: none
- resource caps: only during special events where rules explicitly add one
- universal reward cap: none for now; mission reward tables may still define mission-specific reward structure and limits

## Reward Timing

Reward timing is immediate and direct.

- mission rewards apply immediately on mission completion
- level-up rewards apply immediately on level-up
- rest or session close does not create reward timing by itself

## Reset and Recovery Rules

What resets:

- current Ki recovers only when Game Master scene decision, rest, consumable, passive, or ability effect says it recovers
- temporary conditions depend on each condition's own reset, removal, or persistence rules
- Altar mission request count is `3`; other mission sources are infinite unless another rule says otherwise
- no separate short-term encounter resources for now

What never resets:

- total XP does not exist as tracked value
- unlocked abilities stay learned
- permanent stat growth stays

## Scaling Milestones

Milestones are tied to Player rank transitions. When Player advances to a new rank, they gain the Active Slot Capacity listed in `Docs/Oracles/01 - Rank and Scaling Tables.md`. This is the milestone implementation — the slot capacity column is the milestone effect table.

- more slots: yes (per rank, from slot capacity table)
- stronger sets: yes (sets scale with rank)
- wider mission rank access: yes (+1 rank missions unlock near rank boundary)
- new resource behaviors: no
- narrative recognition in-world: not from milestone itself; stronger character will naturally become more visible
