## Mission Tables

Use this file for mission generation, mission rank access, and mission reward rolls.

## Mission Access

How to use:

Use this reference when choosing mission rank during mission generation.

| Case                 | Mission Rank                                                                                |
| :------------------- | :------------------------------------------------------------------------------------------ |
| Default              | same as Player rank                                                                         |
| Near next rank       | `+1` allowed at the explicit unlock level in `Docs/Oracles/01 - Rank and Scaling Tables.md` |
| Default generator    | never produces `+2` rank missions                                                           |
| Game Master override | any rank may be manually set                                                                |

## Mission Type

How to use:

Choose mission type directly or roll if mission type is uncertain.

| Result | Mission Type |
| :----- | :----------- |
| 1      | mandatory    |
| 2      | optional     |

## Goal Type Oracle

How to use:

Roll `1d12` when generating a mission goal.

| d12 | Goal Type   |
| :-- | :---------- |
| 1   | Eliminate   |
| 2   | Retrieve    |
| 3   | Infiltrate  |
| 4   | Investigate |
| 5   | Defend      |
| 6   | Escort      |
| 7   | Negotiate   |
| 8   | Sabotage    |
| 9   | Intercept   |
| 10  | Survive     |
| 11  | Experiment  |
| 12  | Explore     |

## Completed Mission Reward Structure

How to use:

Apply these reward layers after mission completion. XP and one resource reward always apply; ability and set rewards are extra oracle outcomes.

| Reward Layer | Rule                                                            |
| :----------- | :-------------------------------------------------------------- |
| XP           | always grant XP from mission rank                               |
| Resource     | grant money reward from mission rank                             |
| Ability      | may grant additional ability reward through ability reward roll |
| Set          | may grant additional set unlock through set unlock roll         |

## Ability Reward Count

How to use:

Use mission rank to determine how many independent ability reward rolls to make.

| Mission Rank | Ability Reward Rolls | Possible Rewards |
| :----------- | -------------------: | :--------------- |
| F-B          |                    1 | zero or one      |
| A+           |                    2 | zero, one, or two |

## Ability Reward Chance

How to use:

Roll `1d100` once for each ability reward roll after mission completion.

| d100   | Result            | Chance |
| :----- | :---------------- | -----: |
| 1-5    | `+1` rank ability |   `5%` |
| 6-10   | `-1` rank ability |   `5%` |
| 11-20  | same-rank ability |  `10%` |
| 21-100 | no ability        |  `80%` |

## Set Unlock Chance

How to use:

Roll set unlock chance only for missions ranked `S` or above.

| Mission Rank | Set Unlock Chance |
| :----------- | ----------------: |
| F-A          |              `0%` |
| S+           |              `1%` |
