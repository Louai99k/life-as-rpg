# AGENTS.md

## Repo type

Game design docs + Rust/Iced desktop app. App implements the solo tabletop RPG system described in `Docs/`.

## Tech stack

- **Language**: Rust (edition 2024)
- **GUI framework**: Iced (Elm-like architecture, `iced` crate)
- **State management**: Iced's `Sandbox` / `Application` traits
- **Serialization**: `serde` + `serde_json` or `ron` for save/load
- **RNG**: `rand` crate for oracle rolls and dice

## Role boundary

User writes all production code. Agent acts as:

- Mentor: guide Rust syntax, borrow checker, Iced patterns, project structure
- Validator: review code for correctness, idiomatic Rust, make sure user writes with best practices, and consistency with `Docs/`
- Test writer: write unit tests where appropriate
- Doc keeper: update `Docs/` whenever app behavior diverges from or extends the design docs

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

# Or open a shell inside the container
docker compose exec app bash
```

## Project structure (Rust)

Standard Cargo project layout:

```
src/
  main.rs          # entrypoint, Iced app runner
  app.rs           # Application/Sandbox impl, update/view
  state.rs         # Character state structs (level, XP, stats, Ki, money, etc.)
  abilities.rs     # Skill, Magic, AbilitySet, Item structs and logic
  missions.rs      # Mission, Goal, Encounter structs and generation
  oracles.rs       # Oracle table types, dice roller, random generators
  progression.rs   # Level-up, XP overflow, LP spend, Ki formula
  resolution.rs    # Resolution Score calculator, requirement checks, tags, NERF
  save.rs          # Serialization, save/load logic
```

Build from core outward:

1. Character state + serialization
2. Progression engine (level-up, Ki formula)
3. Abilities + tags
4. Oracle / dice tools
5. Resolution engine
6. Mission generation
7. Iced UI

## Rust mentorship notes

- User is senior JS developer, new to Rust
- Prefer explicit ownership explanations when borrow checker errors arise
- Show `rustc --explain E####` for compiler error codes
- Favor `derive` macros over manual trait impls unless performance or logic requires it
- Use `enum` with payloads instead of unions or type flags (Rust idioms differ from JS/TS)
- Iced follows Elm Architecture: `Message` enum, `update(&mut self, message)`, `view(&self)` — explain the closure-less event loop
- `Rc<RefCell<>>` is not needed for Iced; state lives in the Application struct and `update` takes `&mut self`

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
