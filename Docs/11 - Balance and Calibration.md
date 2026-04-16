## Balance Philosophy

Balance target is not perfect symmetry in every scene. Balance target is fair challenge, readable growth, meaningful build choices, and low grind pressure.

Simulation default build assumption is even-spread (LP distributed across all six base stats). Focused build is the min-max edge case, not the expected player behavior.

## Target Power Curve

Power curve must describe what low, mid, and high progression should feel like in practice. Curve should answer questions like:

- what can player reasonably defeat
- what feels risky
- what remains out of reach
- how fast power expression grows

Resolution engine should be balanced around average Resolution Score leaning toward roughly `1000`. This keeps level contribution meaningful without letting it dominate whole formula by itself.

Concrete anchors used for calibration:

- level contribution max is `100` at level cap (`floor(Level / 10)`)
- enemy and non-combat encounter use updated base Resolution Score by rank plus full safe random factor (see `Docs/Oracles/01 - Rank and Scaling Tables.md`)
- current enemy base curve was selected to scale against per-rank LP (F=4, E=4, D=3, C=3, B=3, A=2, S+=2) as the growth anchor
- success grades in `Docs/06` should be achievable and meaningful, not rare edge cases

Encounter difficulty is determined by player choices and system levers, not fixed percentage targets:

- **Equal-rank**: baseline fair fight. Outcome depends on tag matching, stat selection against encounter type, equipped abilities, and NERF conditions.
- **+1 rank**: winnable with smart play. Right tags, NERF bypass, favorable environment, and stat-matchup advantage shift the balance.
- **+2 rank**: extremely hard. Requires strong build synergy, tag advantage, ability stacking, and favorable conditions.

The levers that determine win probability:
- Tags on abilities, enemies, and environment
- NERF system (penalty + bypass conditions)
- Event-to-stat mapping (which base stats apply to this encounter)
- Ability stacking across filled active slots
- Equipment/set choices in limited gear slots

## Resource Economy

Resource economy must define whether Ki, money, consumables, and unlock opportunities arrive at healthy rates relative to spending demands. LP comes from level-ups only.

Economy anchors:

- average purchasable item price baseline: `$10000` (Rank `B`)
- mission money reward uses `70%` base plus `30%` random factor, so top result equals same-rank ability price baseline (see `Docs/Oracles/01 - Rank and Scaling Tables.md`)
- item upgrades should generally cost less than buying new item of same rank (current default: ~50% of typical purchase price)

Economy targets:

- Rank `B` item purchase (`$10000`) should take about `1` Rank `B` mission
- Rank `B` item upgrade (`$5000`) should take about `1` mission of Rank `B` or even Rank `C` on average

## Grind Limits

System should explicitly reject progression model that requires long repetition of low-interest missions just to keep pace with scaling.

## Difficulty Limits

Difficulty should have upper and lower sanity bounds. Challenge may spike in rare cases, but baseline system should not produce impossible walls as standard output.

## Enemy Scaling Rules

Enemy scaling uses rank + Resolution Score model.

- base Resolution Score by rank comes from `Docs/Oracles/01 - Rank and Scaling Tables.md`
- random factor cannot reach next-rank base (rank ceiling safe)
- current default enemy curve is intentionally steeper from `C` upward to prevent raw stat growth from flattening challenge too early
- enemy tags and NERF effects should matter more than tiny numeric differences

## Reward Scaling Rules

Rewards use direct mission-rank reward tables.

- XP and money use mission-rank tables in `Docs/Oracles/01 - Rank and Scaling Tables.md`
- XP uses mission-rank base table plus next-rank-safe random factor
- completed mission grants XP plus money as the resource reward
- each ability reward roll has `5%` chance for `+1` rank, `5%` for `-1` rank, `10%` for same rank, and `80%` for no ability
- set unlock baseline chance is `1%` only for missions ranked `S` or above
- goal rewards and mission rewards can coexist; flags like `goal_rewards_independent` change partial reward behavior

## Ability Scaling Rules

Ability scaling section must determine:

- how upgrades improve output
- how utility stays relevant
- how sets compare to single abilities
- how caps stop dominant strategy abuse

Item is ability subtype. Balance must consider:

- items as ability power sources
- item prices and upgrade costs
- key items as special access instead of separate reward category

## Power Cap Rules

Caps exist where explicitly defined, but system does not currently use universal per-ability cap.

- no universal per-ability cap
- no universal per-item cap
- per-turn or per-check caps only if later subsystem requires them
- enemy rank or Resolution Score caps may still exist if needed for encounter balance

## Test Scenarios

Balance chapter should later test against reference situations such as:

- equal-rank duel
- under-ranked mission
- over-ranked mission
- tag mismatch encounter
- magic-heavy build
- skill-heavy build
- item-reliant build
- set-focused build

Calibration checks:

- equal-rank encounter: baseline fair fight; outcome shifts with player choices
- +1 rank encounter: harder but winnable through tactical tag matching, ability stacking, NERF bypass, or stat advantage
- +2 rank encounter: extremely hard; requires significant build advantage and favorable conditions

## Known Risk Areas

Current known risk areas from previous iteration:

- admin overhead slowing play
- slot bloat
- vague requirement resolution
- unclear real-world scaling references
- hard-to-track Ki pacing
- grind-heavy progression

## Revision Triggers

Rebalance should occur when:

- one strategy dominates
- sessions stall in admin
- requirement logic creates debate
- mission rewards stop feeling meaningful
- player must grind excessively
- enemy scaling becomes unreadable

## Open Questions

- no-go balance rules are TBD
