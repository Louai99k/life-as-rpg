## Ability Categories

Core ability families are Skills, Magic, and Items. Items are not outside ability model; they are one of ability families. Ability Sets are separate unlockable gear bundles that can expose multiple techniques but are not normal ability entries.

## Skills

Skills represent trained or enhanced capability rooted in body, technique, intellect, or technology. Skills should:

- usually cost no Ki
- remain valid in real-world logic before enhancement
- scale into superhuman expression
- use explicit tags and role definitions

## Magic

Magic represents supernatural power that exceeds normal physical logic. Magic should:

- usually consume Ki
- use explicit effect scope
- define activation and limitation clearly
- avoid vague anime flavor without mechanical meaning

## Items

Items are external objects that grant effect, utility, access, or combat value. Item design must define:

- consumable vs persistent
- stackable vs unique
- equip rules
- purchase rules
- loot-only rules

## Ability Sets

Ability Set is grouped package of related techniques treated as one active gear choice. Set exists to solve high-slot clutter by bundling coherent theme under one equip decision.

Set rules must define:

- what counts as one set: themed bundle such as Naruto Bundle, Goku Bundle, Sharingan Bundle, Gojo Satoru, Superman, or similar concept package
- how many abilities one set exposes: no fixed number
- how set rank is measured: each set has predefined rank and fixed saved `Resolution Score`
- how internal techniques work: abilities inside set are used for context, fiction, tags, and requirement matching, not separate additive `Resolution Score`
- how sets are generated, learned, and balanced: sets are unlocked as single set rewards or special-event rewards
- how sets use slots: `1` set occupies `1` gear slot

## Tags and Properties

Tags are explicit machine-readable style properties used to remove subjective interpretation. Tag system should split into two types:

- passive tags
- active tags

Passive tags are attached properties that remain present and active continuously unless rules explicitly remove them.

Active tags require state logic such as activation condition, trigger, or deactivation rule before they apply.

Each tag entry should define:

- description
- tag type
- activation rule if active
- deactivation rule if active

Tags may cover:

- element
- damage type
- method
- domain
- movement type
- social function
- utility type
- access type

Every rule that previously depended on opinion should map to tag or property check when possible.

Duration may exist for some active tags, but duration should not become core dependency for moment-to-moment play because system is not real-time video game. For now, duration handling can remain player-managed where needed instead of being treated as fully consumed by strict timing model.

Tags may also be acquired dynamically from equipped gear, locations, mission-only effects, triggered events, and changing conditions. State tracking should update these tags automatically when their source appears or disappears.

## Acquisition Rules

Abilities may come from these sources:

- mission reward
- purchase if available in store
- special events during game

All abilities must have price value for selling, duplicate conversion, and economy reference even if they do not exist in store.

Item acquisition still needs separate tracking because items are object-based. Item acquisition must distinguish:

- purchasable item
- mission reward item
- enemy drop
- altar reward
- unique artifact

Altar reward does not differ from normal mission reward.

Ability Sets are acquired as set unlocks, not normal ability rewards.

## Activation Rules

Activation and definition rules must be separated by pillar.

Shared fields across Skills, Magic, and Items:

- cost if purchasable or unlockable
- price value even if not store-purchasable
- rank

Each ability must also define how its rank contributes to `Resolution Score`:

- contribution per rank: base value per rank plus random value
- saved contribution value: random contribution is rolled once when ability is created or gained, then stored
- min rank and max rank for that ability
- tag unlocks: per-ability manual list tied to rank upgrades

If ability does not define its own base-by-rank contribution table, use defaults in `Docs/Oracles/01 - Rank and Scaling Tables.md` for base contribution and rank ceiling safe random factor.

Every ability should have price value even if it cannot normally be purchased in market. This price is used by reward-conversion rules when duplicate non-stackable reward is granted.

If more than one active slotted ability applies to same action, total ability contribution is additive:

- `Total Ability Contribution = Ability A RS + Ability B RS + Ability C RS + ...`

Only active slotted abilities and active slotted sets contribute unless another rule explicitly says otherwise.

Skill entries define:

- description
- tags

Magic entries define:

- description
- tags
- Ki consumption rate

Item entries define:

- description
- tags

If item is activated item, it must also define:

- trigger condition
- deactivation condition
- duration
- tags added by activation

Activated items may also change numeric contribution directly even without adding tags.

Items may also carry active tags under tag system, but activated-item logic is separate from active-tag logic.

Set entries define:

- description
- rank
- fixed saved `Resolution Score`
- exposed internal techniques for context
- tags granted by set
- price value for selling, duplicate conversion, and economy reference

## Slot Rules

Slot system stays intentionally small. Slots govern active complexity, not total ownership.

- base slot count: `3`
- scaling rule: slot capacity follows default active slot capacity table in `Docs/Oracles/01 - Rank and Scaling Tables.md` unless campaign-specific milestone rules override it
- slot use by single abilities vs sets: same; `1` set = `1` slot and `1` skill = `1` slot
- passive systems do not consume slots
- slot capacity is maximum equipped active gear; it is not same as number of filled relevant slots in a specific simulation or encounter

## Cost Rules

Costs may include:

- Ki
- money
- item consumption
- conditional sacrifice

Every cost must be explicit, measurable, and trackable without subjective pacing.

## Rank Rules

All major categories use same rank system from [04 - Progression](<04 - Progression.md>).

Rank list: `F, E, D, C, B, A, S, SS, SSS, Z`

Same rank system applies to:

- skills
- magic
- items
- sets
- enemies
- missions

## Upgrade Rules

Upgrade rules:

- what can be upgraded: Skills, Magic, and Items. Sets cannot be upgraded.
- upgrade currency: `Money` for Skills, Magic, and Items
- upgrade cost: use the ability's current rank to read `Upgrade Cost` from `Docs/Oracles/01 - Rank and Scaling Tables.md`
- cap interaction: each upgradable has its own cap defined per ability; special upgrade tags will also be defined per ability
- upgrading increases ability rank, which determines contribution to `Resolution Score`
- when upgrade changes rank contribution, generate and save new contribution value for new rank
- upgrading may unlock tags

## Requirement Rules

Requirements are objective checks needed for access, bypass, activation, or mission success. Requirement logic should prefer:

- exact tag match
- rank threshold
- ownership check
- condition check
- resource threshold

## NERF and Restriction Rules

NERF is defined rules penalty, not vague feeling that something should be weaker. Every NERF must specify:

- trigger
- penalty
- bypass condition
- scope
- duration

NERF is implemented as opponent tag with activation trigger and effect on player. If bypass condition is met and tag does not activate, then no penalty applies.

## Examples of Valid Abilities

Future examples must show:

- one grounded skill
- one supernatural magic
- one purchasable item
- one bundled ability set
