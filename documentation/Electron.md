# Electron Main Process

This document covers the Electron main process implementation, IPC communication, and database handlers.

## Overview

The Electron main process is responsible for:
- Creating and managing application windows
- Handling IPC (Inter-Process Communication) from the renderer
- Managing database operations
- Providing secure access to Node.js APIs

## Main Process Entry Point

**Location**: [electron/main.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/main.cjs)

### Window Creation

```javascript
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,      // Security: Isolate renderer context
      nodeIntegration: false,       // Security: Disable Node.js in renderer
      preload: path.join(basePath, 'preload.cjs')
    }
  })

  if (isPackaged) {
    // Production: Load built HTML
    win.loadFile(path.join(basePath, '..', 'dist-vite/index.html'))
  } else {
    // Development: Load from Vite dev server
    win.loadURL('http://localhost:5173')
  }
}
```

**Security Features**:
- **Context Isolation**: Prevents renderer from accessing Node.js APIs directly
- **Node Integration Disabled**: Renderer cannot use `require()` or Node.js modules
- **Preload Script**: Controlled bridge for IPC communication

### Application Lifecycle

```javascript
app.whenReady().then(() => {
  setupHandlers()  // Register IPC handlers
  createWindow()

  // macOS: Recreate window when dock icon clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

## Preload Script

**Location**: [electron/preload.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/preload.cjs)

The preload script exposes a controlled API to the renderer process:

```javascript
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  db: {
    query: (...args) => ipcRenderer.invoke('db-query', ...args),
    mutation: (...args) => ipcRenderer.invoke('db-mutation', ...args),
    controller: (...args) => ipcRenderer.invoke('db-controller', ...args)
  }
})
```

**Exposed API**:
- `electronAPI.db.query()`: Read operations
- `electronAPI.db.mutation()`: Write operations
- `electronAPI.db.controller()`: Complex business logic

**Usage in Renderer**:
```typescript
// TypeScript knows about electronAPI through global.d.ts
const characters = await electronAPI.db.query('characters', 'findMany')
```

## IPC Handlers

**Location**: [electron/handlers.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/handlers.cjs)

### Handler Setup

```javascript
const { ipcMain } = require('electron')
const handleQuery = require('./database/query.cjs')
const handleMutation = require('./database/mutation.cjs')
const handleController = require('./database/controller.cjs')

const setupHandlers = () => {
  // Query handler (read operations)
  ipcMain.handle('db-query', (_event, model, operation, ...args) => {
    return handleQuery(model, operation, ...args)
  })

  // Mutation handler (write operations)
  ipcMain.handle('db-mutation', (_event, model, operation, ...args) => {
    return handleMutation(model, operation, ...args)
  })

  // Controller handler (complex operations)
  ipcMain.handle('db-controller', (_event, controllerName, ...args) => {
    return handleController(controllerName, ...args)
  })
}

module.exports = setupHandlers
```

### IPC Channels

| Channel | Purpose | Handler | Example |
|---------|---------|---------|---------|
| `db-query` | Read operations | `handleQuery` | `findMany`, `findFirst`, `findUnique` |
| `db-mutation` | Write operations | `handleMutation` | `create`, `update`, `delete` |
| `db-controller` | Business logic | `handleController` | `createMission`, `progressMission` |

## Database Handlers

### Query Handler

**Location**: [electron/database/query.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/query.cjs)

Handles read-only database operations:

```javascript
const client = require('./client.cjs')

const handleQuery = async (uid, operation, ...args) => {
  const model = client[uid]  // e.g., client.characters
  
  if (!model) {
    console.warn('no model')
    return
  }

  const func = model[operation]  // e.g., model.findMany
  
  if (typeof func !== 'function') {
    console.warn('no operation')
    return
  }

  const res = await func(...args)
  return res
}

module.exports = handleQuery
```

**Supported Operations**:
- `findUnique`: Find single record by unique field
- `findFirst`: Find first matching record
- `findMany`: Find multiple records
- `findUniqueOrThrow`: Find or throw error
- `findFirstOrThrow`: Find first or throw error

**Example Usage**:
```javascript
// From renderer
const character = await electronAPI.db.query(
  'characters',
  'findUnique',
  { where: { uid: 'char-123' } }
)
```

### Mutation Handler

**Location**: [electron/database/mutation.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/mutation.cjs)

Handles write operations (create, update, delete):

```javascript
const client = require('./client.cjs')

const handleMutation = async (uid, operation, ...args) => {
  const model = client[uid]
  
  if (!model) {
    console.warn('no model')
    return
  }

  const func = model[operation]
  
  if (typeof func !== 'function') {
    console.warn('no operation')
    return
  }

  const res = await func(...args)
  return res
}

module.exports = handleMutation
```

**Supported Operations**:
- `create`: Create single record
- `createMany`: Create multiple records
- `update`: Update single record
- `updateMany`: Update multiple records
- `delete`: Delete single record
- `deleteMany`: Delete multiple records
- `upsert`: Update or insert

**Example Usage**:
```javascript
// From renderer
const newCharacter = await electronAPI.db.mutation(
  'characters',
  'create',
  {
    data: {
      uid: 'char-456',
      name: 'Warrior',
      lvl: 1
    }
  }
)
```

### Controller Handler

**Location**: [electron/database/controller.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/controller.cjs)

Handles complex business logic operations:

```javascript
const handleController = async (controllerName, ...args) => {
  const controller = require('./controllers/index.cjs')[controllerName]
  
  if (typeof controller === 'function') {
    return controller(...args)
  }

  return null
}

module.exports = handleController
```

**Available Controllers**:
- `createMission`: Create mission with goals and rewards
- `updateMission`: Update mission with goals and rewards
- `progressMission`: Mark mission goals as complete
- `findSkillWithCharacter`: Get skills with character's level
- `findMagicWithCharacter`: Get magic with character's level
- `findItemWithCharacter`: Get items with character's quantity

## Controllers

Controllers encapsulate complex business logic that involves multiple database operations.

### Mission Controllers

**Location**: [electron/database/controllers/mission/](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/controllers/mission/)

#### createMission

Creates a mission with associated goals and rewards.

**File**: [create-mission.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/controllers/mission/create-mission.cjs)

```javascript
const createMission = async (payload = {}) => {
  // 1. Create mission
  const mission = await client.missions.create({
    data: {
      uid: generateUID(),
      title: payload.title,
      description: payload.description,
      xp_reward: payload.xp_reward,
      is_completed: 0,
      type: payload.type,
      rank: payload.rank,
      character_ref: payload.character_ref
    }
  })

  // 2. Create mission goals
  await createMissionGoals(mission.uid, payload.goals)
  
  // 3. Create mission rewards
  await createMissionRewards(mission.uid, payload.rewards)

  return mission
}
```

**Payload Structure**:
```typescript
{
  title: string
  description: string
  xp_reward: number
  type: string
  rank: string
  character_ref: string
  goals: Array<{ description: string }>
  rewards: Array<{
    reward_type: 'money' | 'item' | 'skill' | 'magic'
    reward_amount?: number
    reward_uid?: string
    reward_lvl?: number
  }>
}
```

#### updateMission

Updates a mission and its goals/rewards.

**Operations**:
1. Update mission details
2. Delete existing goals and rewards
3. Create new goals and rewards

#### progressMission

Marks mission goals as complete and handles mission completion.

**Logic**:
1. Mark specified goals as done
2. Check if all goals are complete
3. If complete, award rewards and mark mission as completed

### Item Controllers

**Location**: [electron/database/controllers/item/](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/controllers/item/)

#### findItemWithCharacter

Retrieves all items with character's ownership information.

**Returns**:
```typescript
Array<{
  ...item,
  character_item: {
    qty: number
  } | null
}>
```

### Skill Controllers

**Location**: [electron/database/controllers/skill/](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/controllers/skill/)

#### findSkillWithCharacter

Retrieves all skills with character's skill level.

**Returns**:
```typescript
Array<{
  ...skill,
  character_skill: {
    lvl: number
  } | null
}>
```

### Magic Controllers

**Location**: [electron/database/controllers/magic/](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/controllers/magic/)

#### findMagicWithCharacter

Retrieves all magic with character's magic level.

**Returns**:
```typescript
Array<{
  ...magic,
  character_magic: {
    lvl: number
  } | null
}>
```

## Database Client

### Prisma Client Setup

**Location**: [electron/database/prisma.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/prisma.cjs)

```javascript
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['error', 'warn']  // Log errors and warnings
})

module.exports = prisma
```

### Extended Client

**Location**: [electron/database/client.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/client.cjs)

The client is extended with custom methods through Prisma extensions:

```javascript
const prisma = require('./prisma.cjs')
const extensions = require('./extensions/index.cjs')

// Apply all extensions
const client = prisma.$extends(extensions)

module.exports = client
```

### Prisma Extensions

**Location**: [electron/database/extensions/](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/extensions/)

Extensions add custom methods to Prisma models:

**Example - Character Extension**:
```javascript
Prisma.defineExtension({
  model: {
    characters: {
      async addXp(uid, amount) {
        const character = await this.findUnique({ where: { uid } })
        const newXp = character.xp + amount
        
        // Check for level up
        const newLevel = calculateLevel(newXp)
        
        return this.update({
          where: { uid },
          data: {
            xp: newXp,
            lvl: newLevel,
            lvl_points: character.lvl_points + (newLevel - character.lvl)
          }
        })
      }
    }
  }
})
```

## Services

**Location**: [electron/database/services/](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/services/)

Services provide reusable functions for common operations:

### Mission Services

**File**: [services/mission.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/services/mission.cjs)

```javascript
// Create mission goals
async function createMissionGoals(missionUid, goals) {
  for (const goal of goals) {
    const goalRecord = await client.goals.create({
      data: { uid: generateUID(), description: goal.description }
    })
    
    await client.mission_goals.create({
      data: {
        uid: generateUID(),
        mission_ref: missionUid,
        goal_ref: goalRecord.uid,
        done: 0
      }
    })
  }
}

// Create mission rewards
async function createMissionRewards(missionUid, rewards) {
  for (const reward of rewards) {
    const rewardRecord = await client.rewards.create({
      data: {
        uid: generateUID(),
        reward_type: reward.reward_type,
        reward_amount: reward.reward_amount,
        reward_uid: reward.reward_uid,
        reward_lvl: reward.reward_lvl
      }
    })
    
    await client.mission_rewards.create({
      data: {
        uid: generateUID(),
        mission_ref: missionUid,
        reward_ref: rewardRecord.uid
      }
    })
  }
}
```

## Utilities

**Location**: [electron/database/utils.cjs](https://github.com/Louai99k/life-as-rpg/blob/master/electron/database/utils.cjs)

Common utility functions:

```javascript
// Generate unique ID
function generateUID() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

module.exports = { generateUID }
```

## Error Handling

### Handler Level

Handlers should catch and log errors:

```javascript
ipcMain.handle('db-query', async (_event, model, operation, ...args) => {
  try {
    return await handleQuery(model, operation, ...args)
  } catch (error) {
    console.error('Query error:', error)
    throw error  // Re-throw to renderer
  }
})
```

### Controller Level

Controllers should validate input and handle errors:

```javascript
const createMission = async (payload) => {
  if (!payload.title || !payload.character_ref) {
    throw new Error('Missing required fields')
  }

  try {
    // ... operation
  } catch (error) {
    console.error('Failed to create mission:', error)
    throw error
  }
}
```

## Security Considerations

### 1. Context Isolation

Always keep context isolation enabled:

```javascript
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false
}
```

### 2. Input Validation

Validate all input from renderer:

```javascript
const handleQuery = async (model, operation, ...args) => {
  // Validate model name
  const allowedModels = ['characters', 'missions', 'skills', ...]
  if (!allowedModels.includes(model)) {
    throw new Error('Invalid model')
  }
  
  // Validate operation
  const allowedOps = ['findMany', 'findFirst', 'findUnique']
  if (!allowedOps.includes(operation)) {
    throw new Error('Invalid operation')
  }
  
  // ... proceed
}
```

### 3. SQL Injection Prevention

Prisma automatically prevents SQL injection through parameterized queries.

## Performance Tips

### 1. Connection Management

Reuse Prisma client instance (singleton pattern).

### 2. Batch Operations

Use `createMany`, `updateMany` for bulk operations:

```javascript
await client.character_items.createMany({
  data: items.map(item => ({
    uid: generateUID(),
    character_ref: characterId,
    item_ref: item.uid,
    qty: 1
  }))
})
```

### 3. Selective Queries

Only fetch needed fields:

```javascript
await client.characters.findMany({
  select: {
    uid: true,
    name: true,
    lvl: true
  }
})
```

## Next Steps

- Explore [Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md) to see how the renderer uses these APIs
- Review [API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md) for type definitions
- Check [Database](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Database.md) for schema details
