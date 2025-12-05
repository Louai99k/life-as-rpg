# Database Schema

This document describes the database schema, models, relationships, and Prisma configuration for the Life as RPG application.

## Database Configuration

### Prisma Setup

**Location**: [prisma/schema.prisma](https://github.com/Louai99k/life-as-rpg/blob/master/prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
  engineType = "binary"
  binaryTargets = ["windows", "debian-openssl-3.0.x"]
}

datasource db {
  provider = "sqlite"
  url      = "file:./data.db"
}
```

**Key Configuration**:
- **Provider**: SQLite for lightweight, embedded database
- **Binary Targets**: Supports both Windows and Linux (for Docker builds)
- **Database File**: `data.db` in the project root

## Database Models

### Entity Relationship Diagram

![Database Entity Relationship Diagram](DB%20Model.excalidraw.png)

## Model Definitions

### characters

The main entity representing a player character.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `name` | String | - | Character name |
| `money` | Int | 0 | In-game currency |
| `lvl` | Int | 1 | Character level |
| `lvl_points` | Int | 0 | Unspent level points |
| `max_ki` | Int | 0 | Maximum Ki (energy) |
| `ki` | Int | 0 | Current Ki |
| `xp` | Int | 0 | Experience points |

**Relationships**:
- One-to-many with `missions`
- One-to-many with `character_skills`
- One-to-many with `character_magic`
- One-to-many with `character_items`

**Example**:
```typescript
{
  uid: "char-123",
  name: "Hero",
  money: 1000,
  lvl: 5,
  lvl_points: 3,
  max_ki: 100,
  ki: 75,
  xp: 450
}
```

---

### missions

Tasks that characters complete for rewards.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `title` | String | - | Mission title |
| `description` | String | - | Mission description |
| `xp_reward` | Int | 0 | XP earned on completion |
| `is_completed` | Int | 0 | Completion status (0 or 1) |
| `type` | String | - | Mission type (e.g. daily, weekly, custom) |
| `rank` | String | - | Difficulty rank (e.g. E, D, C, B, A, S) |
| `character_ref` | String | - | Foreign key to characters |

**Example**:
```typescript
{
  uid: "mission-456",
  title: "Morning Workout",
  description: "Complete 30 minutes of exercise",
  xp_reward: 50,
  is_completed: 0,
  type: "daily",
  rank: "C",
  character_ref: "char-123"
}
```

---

### mission_goals

Individual goals that must be completed for a mission.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `mission_ref` | String | - | Foreign key to missions |
| `goal_ref` | String | - | Foreign key to goals (unique) |
| `done` | Int | 0 | Completion status (0 or 1) |

**Note**: `goal_ref` has a unique constraint, meaning each goal can only be associated with one mission.

---

### goals

Reusable goal definitions.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `description` | String | - | Goal description |

**Example**:
```typescript
{
  uid: "goal-789",
  description: "Run 5 kilometers"
}
```

---

### mission_rewards

Rewards earned upon mission completion.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `mission_ref` | String | - | Foreign key to missions |
| `reward_ref` | String | - | Foreign key to rewards |

---

### rewards

Reward definitions with various types.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `description` | String? | - | Optional description |
| `reward_type` | String | - | Type: money, item, skill, magic |
| `reward_amount` | Int? | 0 | Amount (for money & items) |
| `reward_uid` | String? | - | Reference to item/skill/magic |
| `reward_lvl` | Int? | 0 | Level (for skill/magic) |

**Reward Types**:
- `money`: Currency reward (uses `reward_amount`)
- `item`: Item reward (uses `reward_uid` for item reference and `reward_amount` for quantity)
- `skill`: Skill reward (uses `reward_uid` and `reward_lvl`)
- `magic`: Magic reward (uses `reward_uid` and `reward_lvl`)

**Example**:
```typescript
// Money reward
{
  uid: "reward-001",
  description: "Gold coins",
  reward_type: "money",
  reward_amount: 100,
  reward_uid: null,
  reward_lvl: 0
}

// Item reward
{
  uid: "reward-002",
  description: "Health potion",
  reward_type: "item",
  reward_amount: 0,
  reward_uid: "item-123",
  reward_lvl: 0
}
```

---

### skills

Learnable skills that characters can acquire and level up.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `name` | String | - | Skill name |
| `description` | String | - | Skill description |
| `max_lvl` | Int | 1 | Maximum level |
| `avatar` | String? | - | Optional avatar/icon path |

**Example**:
```typescript
{
  uid: "skill-001",
  name: "Programming",
  description: "Ability to write code",
  max_lvl: 10,
  avatar: "/icons/programming.png"
}
```

---

### character_skills

Junction table linking characters to their learned skills.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `character_ref` | String | - | Foreign key to characters |
| `skill_ref` | String | - | Foreign key to skills |
| `lvl` | Int | 1 | Current skill level |

---

### magic

Magical abilities that characters can learn.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `name` | String | - | Magic name |
| `description` | String | - | Magic description |
| `max_lvl` | Int | 1 | Maximum level |
| `avatar` | String? | - | Optional avatar/icon path |

**Example**:
```typescript
{
  uid: "magic-001",
  name: "Focus",
  description: "Enhances concentration",
  max_lvl: 5,
  avatar: "/icons/focus.png"
}
```

---

### character_magic

Junction table linking characters to their learned magic.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `character_ref` | String | - | Foreign key to characters |
| `magic_ref` | String | - | Foreign key to magic |
| `lvl` | Int | 1 | Current magic level |

---

### items

Purchasable items in the store.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `name` | String | - | Item name |
| `description` | String | - | Item description |
| `in_store` | Int | 1 | Available in store (0 or 1) |
| `store_price` | Int | 0 | Purchase price |
| `avatar` | String? | - | Optional avatar/icon path |
| `max_qty` | Int | 9999 | Maximum quantity per character |

**Example**:
```typescript
{
  uid: "item-001",
  name: "Health Potion",
  description: "Restores 50 HP",
  in_store: 1,
  store_price: 50,
  avatar: "/icons/potion.png",
  max_qty: 99
}
```

---

### character_items

Junction table linking characters to their owned items.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `uid` | String | - | Primary key (UUID) |
| `character_ref` | String | - | Foreign key to characters |
| `item_ref` | String | - | Foreign key to items |
| `qty` | Int | 1 | Quantity owned |

---

## Database Operations

### Prisma Client Usage

The Prisma client is generated and used throughout the application:

```javascript
// Generate client
npx prisma generate

// Usage in code
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Query
const characters = await prisma.characters.findMany()

// Create
const newCharacter = await prisma.characters.create({
  data: { name: 'Hero', lvl: 1 }
})
```

## Database Migrations

### Development

For schema changes during development:

```bash
# Push schema changes to database
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### Production

For production migrations:

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy
```

## Database Seeding

The application includes a sample database (`sample-data.db`) with pre-populated data. To create custom seed data:

```javascript
// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.characters.create({
    data: {
      name: 'Hero',
      lvl: 1,
      money: 100
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run seeding:
```bash
node prisma/seed.js
```

## Performance Considerations

### Indexes

Consider adding indexes for frequently queried fields:

```prisma
model missions {
  uid           String @id
  character_ref String
  
  @@index([character_ref])
}
```

### Query Optimization

- Use `select` to fetch only needed fields
- Use `include` judiciously to avoid over-fetching
- Batch operations with `createMany`, `updateMany`

### Connection Pooling

SQLite uses a single connection, but for other databases:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  pool_timeout = 20
  connection_limit = 10
}
```

## Backup and Recovery

### Backup

Simply copy the database file:

```bash
cp data.db data.db.backup
```

### Restore

```bash
cp data.db.backup data.db
```

### Export to SQL

```bash
sqlite3 data.db .dump > backup.sql
```

### Import from SQL

```bash
sqlite3 data.db < backup.sql
```

## Next Steps

- Learn about [Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md) database handlers
- Explore [API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md) for type definitions
- Review [Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md) for data flow
```
