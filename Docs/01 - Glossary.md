## Core Terms

**System**  
Hidden game-layer that overlays normal reality and grants panels, rules, rewards, and progression.

**Player**  
Person selected by System who can perceive and interact with System functions.

**Character**  
Playable identity being tracked under rules. In many sessions, Player and Character may refer to same in-world person, but docs should still keep terms separate.

**Session**  
One unit of play, planning, action, and resolution.

**Panel**  
System-visible interface element that presents stats, missions, rewards, or alerts to Player.

**Resolution Score**  
Final compared number used in uncertain actions after level, related stats, active ability contributions, tags, and other rule-defined numeric effects are combined. Balance target leans average Resolution Score toward roughly `1000`.

## Player Terms

**Character Sheet**  
Full structured record of tracked character state.

**State**  
Current rules-relevant condition of character, including persistent and temporary values.

**Gear**  
Currently equipped active abilities or sets available for immediate use.

**Inventory**  
Owned items, consumables, equipment, and other tracked possessions.

**Condition**  
Temporary status that changes what character can do or how rules affect them.

## Progression Terms

**Level**  
Primary measure of character advancement.

**XP**  
Experience resource stored as current level bar and used to advance level according to progression rules.

**Level-Up**  
Automatic state transition that occurs when XP crosses defined threshold.

**LP**  
Level Points used to increase base stats according to progression rules.

**Cap**  
Maximum allowed value in defined scope, such as level cap, power cap, or rank cap.

**Milestone**  
Named progression point tied to rank transitions. Each new rank unlocks the Active Slot Capacity listed in `Docs/Oracles/01 - Rank and Scaling Tables.md`.

**Player Rank**  
Rank that changes through milestone progression and marks broad progression stage.

## Ability Terms

**Ability**  
Generic umbrella term for a usable Skill, Magic, or Item entry. Ability Sets are separate unlockable bundles that can contain multiple ability-like techniques, but they are tracked as sets rather than normal abilities.

**Skill**  
Ability rooted in physical, technical, mental, or learned competence. Skills do not consume Ki by default.

**Magic**  
Ability rooted in supernatural power and normally consumes Ki or other explicit resource cost.

**Item**  
Ability subtype represented by owned object with defined mechanical effect, tag profile, and acquisition path.

**Ability Set**  
Predefined grouped package of related techniques. It unlocks as one set, occupies one gear slot, has fixed `Resolution Score`, and uses internal abilities mainly for context and tags.

**Slot**  
Limited active capacity used to equip abilities or sets.

**Tag**  
Explicit property label used for requirement checks, synergies, restrictions, and generation logic. Tags contribute `0` to Resolution Score unless a specific tag entry defines an explicit numeric bonus.

**Passive Tag**  
Tag that stays present and active continuously unless rules explicitly remove it.

**Active Tag**  
Tag that only applies when activation logic is met and may also define deactivation logic.

**Property**  
Structured rule attribute attached to ability, item, enemy, mission, or encounter component.

**Rank**  
Label that groups relative power, rarity, or difficulty.

## Mission Terms

**Mission**  
Structured package containing goals, opposition, stakes, and reward logic.

**Goal**  
Each mission can have one or more Goals. Mission completes when all main Goals are completed. Optional Goals may grant extra XP and sometimes extra rewards.

**Encounter**  
Discrete challenge scene inside mission, such as combat, gate, hazard, or social obstacle.

**Reward**  
Any gain earned from mission resolution, including XP, money, abilities such as items, or set unlocks. LP comes from level-ups.

**Altar**  
Special mission-access structure used for training or controlled progression encounters.

**Stake**  
Defined consequence tied to failure, delay, or escalation.

## Oracle Terms

**Oracle**  
Randomized rule support tool used to generate answers, prompts, or content within controlled logic.

**Table**  
Structured list of possible oracle outputs keyed to roll range.

**Roll**  
Random value generation step used to resolve uncertainty or select table entry.

**Chaos**  
Unexpected twist layer used when normal outcomes escalate or destabilize.

## Balance Terms

**Scaling**  
How power, challenge, cost, and reward increase over time.

**Power Budget**  
Defined amount of mechanical strength allowed in specific context, such as enemy build or reward package.

**Grinding**  
Repeated low-value play required to progress at acceptable rate.

**Calibration**  
Process of testing whether formulas, rewards, and difficulty produce intended play experience.

**NERF**  
Rules-based penalty or restriction that reduces effectiveness unless explicit bypass condition is met.

## UI / Notation Terms

**State Marker**  
Visual notation showing current status category in docs or logs.

**Fact Marker**  
Visual notation showing non-optional rule fact or canon point.

**Header Convention**  
Standard formatting rule for titles, states, and document structure.

**Log Entry**  
Structured record of mission, event, reward, or change in character state.

## Forbidden Ambiguities

These terms must not be used interchangeably without definition:

- Player vs Character
- Skill vs Magic
- Item vs non-item ability subtype
- Tag vs flavor text
- Rank vs Level
- Gear vs Inventory
- Requirement vs suggestion
- NERF vs general difficulty
- Session note vs canon rule
