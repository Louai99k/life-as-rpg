## Core Resolution Philosophy

Resolution engine should be small, repeatable, and universal. Same base logic should handle combat, utility, stealth, social pressure, gates, and mission-critical actions unless strong reason exists for exception.

## Universal Roll Method

Universal roll resolves uncertain action into one compared value called `Resolution Score`.

Final formula:

- `Resolution Score = Level contribution + Related Stats contribution + Gear Abilities contribution + Tags contribution`

Resolution Score is then compared against opponent's Resolution Score or fixed target number.

Formula parts:

- character contribution: level contribution plus only stats related to current event
- ability contribution: total numeric contribution extracted from all active slotted Skill, Magic, Item, or Set entries that apply to current event
- situational modifier: handled through tags and conditions that add or subtract from final value
- target number or opposing result: usually comes from a full player-like enemy; fixed enemy numbers remain available for quick filler encounters

Level contribution formula:

- `Level contribution = floor(Level / 10)`

At level cap `1000`, max Level contribution is `100`. This means level alone should be only part of total Resolution Score. Balance target should lean average Resolution Score toward roughly `1000`, so level contribution stays meaningful without making game easy by itself.

Stat contribution depends on event type. Related stats are added directly into `Resolution Score` and should be determined through event-to-stat table in `Docs/Oracles/05 - Stat Tables.md`.

Tags contribute `0` to Resolution Score by default. A tag only adds or subtracts numeric value if the specific tag entry's rule text explicitly defines a bonus or penalty. Most tags are gate checks or rule flags, not numeric modifiers.

## Success and Failure

Success and failure compare your Resolution Score to opposing Resolution Score.

- success: your Resolution Score is higher
- failure: opposing Resolution Score is higher
- tie counts in your favor and is treated as critical success

Success grades:

- landslide success: your score is at least double opponent's score
- clean success: your score is higher
- critical success: final compared scores tie

Success type may later be used by mission goals, tags, events, or special effects.

## Contest Resolution

Contest resolution uses same Resolution Score formula across all event types.

- combat
- chase
- stealth vs detection
- hack vs security
- persuasion vs resistance

Main variable is not formula itself, but which stats count for event. That mapping should come from `Docs/Oracles/05 - Stat Tables.md`.

## Context Modifiers

Context modifiers are mostly handled through tags and conditions. Environment, preparation, hazards, gear states, debuffs, NERF-triggering effects, and temporary effects should add or subtract numeric values only when their rule text explicitly says so.

## Dice Randomness

Game still uses dice wherever rules, tables, enemy generation, mission generation, ability generation, or reward generation require randomness.

- there is no separate Luck factor inside `Resolution Score`
- randomness comes from explicit dice rules attached to subsystems
- oracle tables still use their own die rules separately from `Resolution Score` calculation

## Difficulty Bands

Difficulty bands use same rank language as rest of system.

- `F`
- `E`
- `D`
- `C`
- `B`
- `A`
- `S`
- `SS`
- `SSS`
- `Z`

Higher rank means harder challenge.

## Opposed Checks

Opposed checks normally use a full player-like enemy build.

- full player-like enemies are the standard model and are expected to represent roughly `95%` of enemies chosen during play
- fixed target Resolution Score enemies are expected to represent roughly `5%` and provide quick filler encounters
- Game Master chooses the enemy model; the `95%` / `5%` split is a playstyle target, not an oracle roll
- enemy tags always matter for resolution
- enemy Resolution Score may increase or decrease based on tags, debuffs, NERF-triggering items, conditions, abilities, and other rule-defined effects

## Edge Cases

Need explicit handling for:

- no valid ability equipped: if gate or hard requirement needs specific condition, you cannot pass it
- multiple applicable abilities: all valid active slotted ability contributions stack by addition
- trying non-matching ability against hard requirement: does not occur under current rules
- zero resource state: no special handling
- stacked modifiers: all numeric modifiers stack by addition

## Retry Rules

Each individual roll event allows up to `3` free rerolls. Starting a different roll event starts a new reroll allowance.

This creates risk by itself because later roll is not guaranteed to improve result.
