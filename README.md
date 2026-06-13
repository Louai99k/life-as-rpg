# Life as RPG

Desktop app for the ["Life as RPG"](./Docs/Summary.md) solo tabletop RPG system. Urban fantasy LitRPG — you are a Player selected by a hidden System, gaining powers, completing missions, and growing your character in the real modern world.

Built with a backend-first **Rust** domain layer and a **Tauri 2** desktop shell.
The frontend will use **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

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

# Frontend commands become available after the frontend scaffold is added
docker compose exec -w /app/frontend app yarn install
docker compose exec -w /app/frontend app yarn dev

# Open a shell inside the container
docker compose exec app bash
```

## Project status

Early development — building the core player sheet and dice roller first. See [Docs/](./Docs/) for the full game system design.

## Tech stack

- **Rust** (edition 2024)
- **Tauri 2** — desktop shell and Rust/frontend IPC
- **React + TypeScript** — frontend component layer
- **Vite** — frontend development and bundling
- **Tailwind CSS** — frontend styling
- **Yarn 4** — package management through Corepack
- **serde** — serialization for save/load
- **rand** — RNG for oracle rolls and dice

The root Cargo package remains independent from Tauri and owns all game rules.
The future `src-tauri` crate will be a thin adapter between that domain library
and the frontend in `frontend/`.
