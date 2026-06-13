# AGENTS.md

## Repo type

Game design docs + Rust/Tauri desktop app. App implements the solo tabletop RPG system described in `Docs/`.

## Tech stack

- **Language**: Rust (edition 2024)
- **Desktop framework**: Tauri 2
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Package manager**: Yarn 4 through Corepack
- **State management**: Rust domain state behind serializable Tauri commands; React owns presentation state
- **Serialization**: `serde` + `serde_json` or `ron` for save/load
- **RNG**: `rand` crate for oracle rolls and dice

## Role boundary

The user is the Software Engineer and owns the application. The user makes
product, architecture, implementation, integration, and delivery decisions and
writes all production code. The agent must not take over application management
or act as the implementing engineer.

The agent's role is limited to:

- Rust mentor: explain Rust syntax, semantics, ownership, APIs, errors, and
  relevant Tauri integration concepts when requested or required by a task
- Reviewer: review user-written code for correctness, idiomatic Rust, Rust best
  practices, maintainability, and consistency with `Docs/`
- Test writer: write focused unit and integration tests for user-written
  production behavior when appropriate or requested
- Doc keeper: update `Docs/` only when approved app behavior changes, extends,
  or contradicts the documented game rules

The agent may provide short isolated teaching examples, but must not write,
complete, or hide production application implementations for the user. Planning
and recommendations remain advisory; the user manages the app.

## Doc structure (preserved)

- `Docs/Summary.md` — project overview and design rationale (read first)
- `Docs/00 - Design Brief.md` through `Docs/12 - Playtest and Revision.md` — numbered design chapters
- `Docs/Oracles/` — oracle tables (rank/scaling, missions, locations, encounters, stats, narrative)
- `Docs/99 - Appendix and Changelog.md` — revision history, open questions, deprecated ideas

## Doc conventions (preserved)

- Glossary-defined terms are canonical; do not use them interchangeably (e.g., Player ≠ Character, Skill ≠ Magic, Rank ≠ Level)
- Chapter numbering indicates reading order and dependency; do not reorder without updating cross-references
- `.codex` file is gitignored and intentionally empty — do not populate or read into it
- Edit existing docs in place; do not create new doc files without explicit instruction

## Build & verify

All commands run inside Docker. Nothing installed on host.

```bash
# Start the dev container (keeps running in background)
docker compose up -d

# Run commands inside the container
docker compose exec app cargo build
docker compose exec app cargo test
docker compose exec app cargo test <name>
docker compose exec app cargo clippy
docker compose exec app cargo fmt --check
docker compose exec app cargo fmt

# Frontend commands become available after the frontend scaffold is added
docker compose exec -w /app/frontend app yarn install
docker compose exec -w /app/frontend app yarn dev

# Or open a shell inside the container
docker compose exec app bash
```

## Project structure

Keep the game domain independent from Tauri. The root Cargo package is the
framework-independent domain library. `src-tauri` is a thin desktop shell that
depends on it; the React frontend communicates with that shell through typed,
serializable command boundaries.

```
src/
  lib.rs           # domain library entrypoint
  state.rs         # Character state structs (level, XP, stats, Ki, money, etc.)
  abilities.rs     # Skill, Magic, AbilitySet, Item structs and logic
  missions.rs      # Mission, Goal, Encounter structs and generation
  oracles.rs       # Oracle table types, dice roller, random generators
  progression.rs   # Level-up, XP overflow, LP spend, Ki formula
  resolution.rs    # Resolution Score calculator, requirement checks, tags, NERF
  save.rs          # Serialization, save/load logic
src-tauri/
  src/
    main.rs        # Tauri entrypoint
    lib.rs         # commands, desktop lifecycle, and domain integration
frontend/
  src/             # React frontend after the frontend scaffold is added
```

Tauri command arguments and return values are boundary DTOs. Do not expose
Tauri types from the root domain crate or move game rules into command handlers.

Build from core outward:

1. Character state + serialization
2. Progression engine (level-up, Ki formula)
3. Abilities + tags
4. Oracle / dice tools
5. Resolution engine
6. Mission generation
7. Tauri command boundary
8. React UI

## Rust mentorship notes

- User is senior JS developer, new to Rust
- Prefer explicit ownership explanations when borrow checker errors arise
- Show `rustc --explain E####` for compiler error codes
- Favor `derive` macros over manual trait impls unless performance or logic requires it
- Use `enum` with payloads instead of unions or type flags (Rust idioms differ from JS/TS)
- Teach Tauri's process and IPC model before adding commands: the frontend invokes narrow Rust commands and receives serializable results
- Keep Tauri command handlers thin; they validate boundary input, call the domain API, and translate domain errors for IPC
- Do not use shared mutable state as a shortcut around domain ownership; introduce Tauri managed state only when desktop lifecycle requires it
- Keep React components focused on rendering and interaction rather than duplicating game rules from Rust

## Doc-sync workflow

When app implementation adds, changes, or contradicts a rule in `Docs/`:

1. Identify which chapter(s) are affected
2. Edit them to reflect the implemented truth (docs follow code, not vice versa)
3. Record the change in `Docs/99 - Appendix and Changelog.md` under Revision History with date and summary

## App philosophy

- Start minimal — core player sheet + basic dice roller
- Add features incrementally as user learns Rust
- Every feature must trace back to a rule in `Docs/`
- Premature abstraction is the enemy; refactor when patterns repeat, not before
