## Encounter Philosophy

Encounter is challenge, scene, or obstacle that appears during mission. System should support encounter creation, but not replace Game Master creativity. Mainline story, enemy identity, and scene details can be authored directly by Game Master while still using rank, Resolution Score, tags, and rules for consistency.

## Encounter Types

Common encounter families:

- combat encounter
- gate encounter
- hazard encounter
- social encounter
- investigation encounter
- chase or mobility encounter

## Mission Encounters

Mission may include one or more encounters, or may move more freely depending on story and Game Master judgment. Encounters are support structure, not forced rigid chain.

If encounter belongs to mission, encounter rank should usually match mission rank. If encounter contains boss plus minions, boss keeps mission rank while minions are lower rank.

If encounter is not tied to mission, rank may be random or manually determined by Game Master.

## Combat Encounters

Combat encounter should at minimum define:

- enemy rank
- enemy Resolution Score
- enemy tags

Other details such as enemy role, count, behavior, and scene logic may be created freely by Game Master using certain oracle tables.

## Social Encounters

Social encounters may use objective rules when needed, but exact scene flow can remain flexible under Game Master control.

Minimum fields:

- description
- Resolution Score
- tags
- conditions

## Utility Encounters

Utility encounters cover hacking, lockpicking, traversal, and technical interactions. These remain important because system lives in modern world, not only combat arena.

Minimum fields:

- description
- Resolution Score
- tags
- conditions

## Environmental Encounters

Environment may itself be challenge through hazards, terrain, anomalies, weather, or unstable supernatural zones, but response to those situations is chosen freely by Game Master and player rather than forced through fixed encounter templates.

Minimum fields:

- description
- Resolution Score
- tags
- conditions

## Enemy Generation Rules

Enemy generation should define:

- enemy rank
- enemy Resolution Score
- enemy tags

Enemy generation may use randomness, oracle support, and Game Master creativity together.

- Game Master chooses whether an enemy uses full player-like mechanics or a fixed Resolution Score
- full player-like enemies are expected to represent roughly `95%` of enemies chosen during play
- fixed-RS enemies are expected to represent roughly `5%` and provide quick filler encounters
- enemy creation should stay reasonable relative to Player rank and what Player can realistically access
- fixed-RS enemy Resolution Score may be generated from base Resolution Score by rank plus random factor, or entered manually by Game Master
- enemy random factor formula: `1d(Max Range)`
- `Max Range = Next Rank Base Score - Current Rank Base Score - 1`

## Risk and Stakes

Encounter stakes may include:

- time loss
- resource loss
- injury
- mission escalation
- narrative consequence

Encounter failure may redirect story instead of simply blocking progress. After failure, Game Master may decide next outcome directly or use oracle table to determine what happens next.

## Encounter Difficulty Mapping

Difficulty should stay reasonable relative to Player rank and what Player can access. Exact encounter shape may vary by creativity and story context, but encounter rank and Resolution Score should not ignore progression boundaries.

Mission-linked encounter rank normally follows mission rank.

## Encounter Templates

Rigid encounter templates are not required. Game Master may create scenes freely and then apply rules, rank logic, Resolution Score, tags, and stakes where needed.

## Enemy State Models

Full-stat enemies use player-like base stats, abilities, tags, and gear. They are the standard encounter type, not reserved for bosses or rare events. Tag interaction, NERF systems, and stat matchup drive outcomes. Fixed-RS abstract enemies remain available for quick filler encounters. Game Master chooses the model while creating the enemy; the approximate `95%` full-stat and `5%` fixed-RS split describes intended play rather than a randomized rule.
