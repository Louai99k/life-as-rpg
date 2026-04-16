## Purpose

This chapter is the oracle library reference. It explains how oracle tables are used and points to table files. Detailed tables live in `Docs/Oracles`.

## Oracle Rules

- all oracle rolls are single die unless table says otherwise
- rerolls: each roll event allows up to `3` free rerolls; a different roll event starts a new allowance
- if result is impossible for current story, reroll or override
- Game Master can always override oracle output
- every generated random value and reroll is saved before dependent processing continues
- retrying a failed process reuses its saved random values instead of rolling again
- table files own the detailed table content
- this chapter owns table navigation and shared oracle usage rules

## How To Use Oracle Tables

1. Identify which game question needs table support.
2. Open the matching table file below.
3. Read the table's `How to use` note.
4. Roll the listed die once unless the table says otherwise.
5. Apply result using current mission, encounter, rank, or character context.
6. Reroll or override if result is impossible for current story.

## Table Index

| Category | File | Use |
| :------- | :--- | :-- |
| Oracle rules | [00 - Oracle Rules.md](<Oracles/00 - Oracle Rules.md>) | shared dice, reroll, override, and table-use procedure |
| Rank and scaling | [01 - Rank and Scaling Tables.md](<Oracles/01 - Rank and Scaling Tables.md>) | ranks, level bands, RS bases, rewards, prices, upgrades, slot capacity |
| Missions | [02 - Mission Tables.md](<Oracles/02 - Mission Tables.md>) | mission access, mission type, goal type, reward rolls |
| Locations | [03 - Location Tables.md](<Oracles/03 - Location Tables.md>) | location scale, location detail, site anomaly |
| Encounters | [04 - Encounter Tables.md](<Oracles/04 - Encounter Tables.md>) | enemy source, ability domain, requirements, stakes, NERF penalties |
| Stats | [05 - Stat Tables.md](<Oracles/05 - Stat Tables.md>) | event-to-stat mapping and stat pair oracle |
| Narrative | [06 - Narrative Tables.md](<Oracles/06 - Narrative Tables.md>) | fortune, plot twists, NPC descriptors, NPC goals, NPC roles, themes, backlash |

## Source-Of-Truth Map

| Rules Need | Table Source |
| :--------- | :----------- |
| Player rank level bands | `Docs/Oracles/01 - Rank and Scaling Tables.md` |
| Enemy / encounter base `Resolution Score` | `Docs/Oracles/01 - Rank and Scaling Tables.md` |
| Ability / set base `Resolution Score` | `Docs/Oracles/01 - Rank and Scaling Tables.md` |
| Active slot capacity | `Docs/Oracles/01 - Rank and Scaling Tables.md` |
| XP, money, price, upgrade values | `Docs/Oracles/01 - Rank and Scaling Tables.md` |
| Mission access and rewards | `Docs/Oracles/02 - Mission Tables.md` |
| Location prompts | `Docs/Oracles/03 - Location Tables.md` |
| Encounter prompts and NERF penalties | `Docs/Oracles/04 - Encounter Tables.md` |
| Event-to-stat references | `Docs/Oracles/05 - Stat Tables.md` |
| Narrative prompts | `Docs/Oracles/06 - Narrative Tables.md` |

## Split Policy

Keep `Docs/09 - Oracle Library.md` small. Add or edit detailed oracle tables in `Docs/Oracles`.

Every detailed table should include:

- table name
- die or input source
- short `How to use` note above table
- table result values
