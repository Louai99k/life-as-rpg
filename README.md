# Life as RPG

Desktop app for the ["Life as RPG"](./Docs/Summary.md) solo tabletop RPG system. Urban fantasy LitRPG — you are a Player selected by a hidden System, gaining powers, completing missions, and growing your character in the real modern world.

Built with **Rust** and **Iced**.

## Quick start

Everything runs inside Docker — no need to install Rust or anything else on your machine.

```bash
# Build and start the dev container (first run takes a few minutes)
docker compose up -d

# Compile
docker compose exec app cargo build

# Run tests
docker compose exec app cargo test

# Lint
docker compose exec app cargo clippy

# Format
docker compose exec app cargo fmt

# Open a shell inside the container
docker compose exec app bash
```

## Project status

Early development — building the core player sheet and dice roller first. See [Docs/](./Docs/) for the full game system design.

## Tech stack

- **Rust** (edition 2024)
- **Iced** — Elm-like GUI framework
- **serde** — serialization for save/load
- **rand** — RNG for oracle rolls and dice
