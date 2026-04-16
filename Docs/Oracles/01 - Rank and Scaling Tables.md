## Rank And Scaling Tables

Use this file for rank bands, numeric baselines, rewards, prices, upgrades, and slot capacity.

## Rank Reference

How to use:

Use this table when rules need Player rank, enemy / encounter base `Resolution Score`, default ability / set contribution, active slot capacity, XP base, resource reward, price, or upgrade cost by rank.

| Rank | Level Band | +1 Mission Unlock | Enemy / Encounter Base RS | Ability Base RS | Set Base RS | Active Slot Capacity | XP Base | XP / Level | LP / Level | Money Reward       | Typical Ability Price | Upgrade Cost |
| :--- | :--------- | :---------------- | ------------------------: | --------------: | ----------: | -------------------: | ------: | ---------: | ---------: | :----------------- | --------------------: | -----------: |
| F    | 1-49       | 40                |                       120 |              50 |         150 |                    3 |      10 |         25 |          4 | `350 + 1d150`      |                   500 |          250 |
| E    | 50-149     | 130               |                       220 |             100 |         300 |                    3 |      25 |         60 |          4 | `700 + 1d300`      |                  1000 |          500 |
| D    | 150-299    | 270               |                       480 |             175 |         525 |                    4 |      60 |        400 |          3 | `1750 + 1d750`     |                  2500 |         1250 |
| C    | 300-499    | 460               |                      1000 |             275 |         825 |                    4 |     150 |       1200 |          3 | `3500 + 1d1500`    |                  5000 |         2500 |
| B    | 500-699    | 660               |                      2000 |             400 |        1200 |                    5 |     400 |       3000 |          3 | `7000 + 1d3000`    |                 10000 |         5000 |
| A    | 700-899    | 860               |                      3000 |             550 |        1650 |                    5 |     900 |       6000 |          2 | `14000 + 1d6000`   |                 20000 |        10000 |
| S    | 900-949    | 940               |                      4850 |             725 |        2175 |                    6 |    1800 |      10000 |          2 | `28000 + 1d12000`  |                 40000 |        20000 |
| SS   | 950-974    | 970               |                      5500 |             925 |        2775 |                    6 |    3200 |      18000 |          2 | `56000 + 1d24000`  |                 80000 |        40000 |
| SSS  | 975-989    | 987               |                      6000 |            1150 |        3450 |                    7 |    5800 |      28000 |          2 | `105000 + 1d45000` |                150000 |        75000 |
| Z    | 990-1000   | N/A               |                      7000 |            1400 |        4200 |                    7 |   10000 |      40000 |          2 | `175000 + 1d75000` |                250000 |       125000 |

Notes:

- level bands define default Player rank; Game Master can override
- +1 mission unlock is the first level in the final `20%` of that rank's level band; rank `Z` has no next rank
- enemy / encounter base RS is used for enemies and non-combat encounters
- ability base RS is default when ability entry does not define custom contribution
- set base RS is default when set entry does not define custom contribution
- active slot capacity is maximum active gear count, not guaranteed filled relevant slots
- XP uses mission rank
- XP / Level is flat per rank; every level inside a rank band costs the listed amount
- LP / Level is per rank; each level-up grants the listed LP amount
- money reward is the resource reward from missions
- ability price applies to abilities and sets for selling, duplicate conversion, and economy reference
- upgrade cost uses `Money` and the ability's current rank; LP is for base stats only
- LP comes from level-ups only, not from mission rewards

## Enemy / Encounter RS Random Rule

How to use:

Use this rule when generating enemy or non-combat encounter `Resolution Score` from rank. Roll once unless Game Master enters score manually.

| Step | Rule                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| 1    | `Final Score = Base Rank Score + Random Factor`                                      |
| 2    | `Max Range = Next Rank Base Score - Current Rank Base Score - 1`                     |
| 3    | `Random Factor = 1d(Max Range)`                                                      |
| 4    | result can never reach or exceed next rank base score                                |
| Z    | rank `Z` has no next rank; default random factor is `0` unless Game Master overrides |

## Ability RS Random Rule

How to use:

Use this rule when creating ability contribution value. Roll once at creation or unlock and save result permanently. Roll again only when an upgraded ability changes rank contribution.

| Step    | Rule                                                                                 |
| :------ | :----------------------------------------------------------------------------------- |
| 1       | `Final Contribution = Ability Base RS + Random Factor`                               |
| 2       | `Max Range = Next Rank Ability Base RS - Current Rank Ability Base RS - 1`           |
| 3       | `Random Factor = 1d(Max Range)`                                                      |
| 4       | result can never reach or exceed next rank ability base RS                           |
| Save    | roll once, then save entry's contribution value                                      |
| Upgrade | upgraded abilities generate and save new contribution value for new rank             |
| Z       | rank `Z` has no next rank; default random factor is `0` unless Game Master overrides |

## Set RS Random Rule

How to use:

Use this rule when creating set contribution value. Roll once at unlock and save result permanently. Sets cannot be upgraded, so contribution is never re-rolled.

| Step | Rule                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| 1    | `Final Contribution = Set Base RS + Random Factor`                                   |
| 2    | `Max Range = Next Rank Set Base RS - Current Rank Set Base RS - 1`                   |
| 3    | `Random Factor = 1d(Max Range)`                                                      |
| 4    | result can never reach or exceed next rank set base RS                               |
| Save | roll once, then save entry's contribution value                                      |
| Z    | rank `Z` has no next rank; default random factor is `0` unless Game Master overrides |

## XP Reward Random Rule

How to use:

Use this rule when completed mission grants XP. Mission rank determines base XP.

| Step | Rule                                                                                 |
| :--- | :----------------------------------------------------------------------------------- |
| 1    | `Final XP = Base XP + Random Factor`                                                 |
| 2    | `Max Range = Next Rank Base XP - Current Rank Base XP - 1`                           |
| 3    | `Random Factor = 1d(Max Range)`                                                      |
| 4    | result can never reach or exceed next mission rank XP base                           |
| Z    | rank `Z` has no next rank; default random factor is `0` unless Game Master overrides |

## Milestone Effect Reference

How to use:

Use this table only after milestone count is known. Milestone mapping itself is not defined here yet.

| Milestone Count | Effect   |
| :-------------: | :------- |
|       1-3       | +1 slot  |
|       4+        | +2 slots |
