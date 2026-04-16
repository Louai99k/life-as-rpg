## Mission Philosophy

Mission is main engine of play. Mission system should create direction, structure session flow, deliver challenge, and feed progression without requiring large manual prep.

## Mission Structure

Each mission should eventually include:

- rank
- goals
- location
- reward structure
- completion state
- optional temporary mission acquisitions
- given tags or abilities
- mission type
- optional abandon consequence

Completion state values:

- `new`
- `in progress`
- `completed`
- `failed`
- `abandoned`

## Mission Rank

Mission rank represents expected difficulty and reward band. Rank rules must align with progression, encounter generation, and access pacing.

- default mission rank: same as Player rank
- `+1` mission rank becomes available when Player is inside final `20%` of current Player rank level band
- default mission generation does not produce `+2` rank missions
- Game Master may manually change mission rank

## Goal Types

Goal types are determined by `Docs/Oracles/02 - Mission Tables.md`.

Mission may contain both main goals and optional goals.

- mission completes when all main goals are done
- optional goals always grant extra XP
- optional goals may also grant extra rewards if mission says so

## Failure Consequences

Failure and abandonment do not always mean same thing. Some missions are mandatory, some are optional, and some create consequences if abandoned or failed.

Consequence system should support:

- time loss
- resource drain
- injury or condition
- missed reward
- world escalation
- follow-up mission pressure

Mission or encounter failure may also redirect story instead of fully blocking progress. Outcome after failure may be chosen by Game Master or determined through oracle support.

Abandoned mission grants nothing.

Abandoned mission also removes temporary mission acquisitions immediately.

## Reward Rules

Mission rewards should use mission-rank tables in `Docs/Oracles/01 - Rank and Scaling Tables.md` and reward rules in `Docs/Oracles/02 - Mission Tables.md` directly rather than abstract reward-budget currency.

- each completed mission grants XP based on mission rank table in `Docs/Oracles/01 - Rank and Scaling Tables.md`
- each completed mission grants exactly one resource reward: money
- money reward uses derived mission-rank formula:
- `Money Base = 70% of same-rank ability price baseline`
- `Money Random Factor = 1d(30% of same-rank ability price baseline)`
- XP reward uses mission-rank base table plus next-rank-safe random factor
- ability rewards and set unlocks are additional oracle rewards, not replacement for XP or resource reward
- Game Master may manually override rolled result

## Reward Types

Core reward families:

- XP
- money
- abilities
- set unlocks

Items are treated as ability subtype rather than separate top-level reward family.

Ability Sets are tracked as set unlocks, not normal ability rewards.

Consumables are treated as item type.

Special access is handled through key items rather than separate reward family.

## Reward Tables

Reward tables use direct rank-based generation.

- XP uses mission rank base + random table in `Docs/Oracles/01 - Rank and Scaling Tables.md`
- XP random factor is capped so result cannot reach next mission rank XP base
- mission resource reward is money (see money reward formula above)
- missions before rank `A` run the ability reward roll once and grant at most one ability reward
- missions rank `A` or higher run the ability reward roll twice and may grant zero, one, or two ability rewards
- each ability reward roll uses `1d100`: `1-5` grants a `+1` rank ability, `6-10` grants a `-1` rank ability, `11-20` grants a same-rank ability, and `21-100` grants no ability
- only missions ranked `S` or above have `1%` chance to unlock a set
- Game Master may always override any rolled reward result

## Loot Rules

Loot section should define:

- guaranteed vs random rewards (Not fully random but ranked random)
- direct drop vs post-mission reward
- unique item handling
- duplicate handling

Loot is what player collects during encounters. Mission reward is what player receives upon mission completion.

Enemies can have drops and percentage-based drop rates. Drop check is rolled after encounter rather than tracked precisely during encounter.

## Mission Temporary Acquisitions

Some missions may grant temporary abilities or temporary tags that stay active only during that mission.

These temporary acquisitions should be added and removed automatically by state tracking app according to mission state.

Temporary mission acquisitions may include both tags and abilities.

They do not survive mission end unless later granted again as reward.

## Item Reward Notes

Mission-facing item rewards include mission reward items and enemy drops. Full item acquisition rules belong in [Docs/05 - Ability Framework.md](<05 - Ability Framework.md>).

If same-rank-or-lower ability reward is rolled:

- reward rank is same rank or `-1` rank based on Game Master choice or oracle result
- if `-1` rank would go below `F`, clamp to `F`

Duplicate reward handling:

- if granted ability already exists in inventory and is stackable, grant duplicate normally
- if granted ability already exists in inventory and is not stackable, convert reward into money using that ability's price value
- this conversion rule applies even if ability is not normally purchasable in market

## Altar Mode

Altar is structured training or request system for controlled progression. It should be treated as formal subsystem, not side exception.

## Daily Request Rules

Altar uses daily request limit.

- request count: `3`
- unfinished request behavior on refresh: nothing happens
- rank generation relation to player growth: same as normal mission rank determination

## Mission Cleanup Rules

After mission, system must resolve:

- removal of mission-only temporary acquisitions
- XP updates
- level-up checks
- rewards
- resource restoration if applicable
- unresolved conditions
- world state changes

Cleanup order:

1. apply XP
2. process level-up if triggered
3. apply money reward
4. apply item, ability, or set rewards
5. remove mission-only temporary acquisitions
6. restore resources if applicable
7. resolve remaining conditions
8. update world state

Failed mission may still grant goal rewards if mission flag allows it.

Suggested mission flag name:

- `goal_rewards_independent`

If `goal_rewards_independent` is active, completed goals can grant their rewards without requiring full mission completion.
