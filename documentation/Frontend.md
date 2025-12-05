# Frontend Components and Hooks

This document covers the React frontend implementation, including components, custom hooks, and state management.

## Overview

The frontend is built with React 19 and TypeScript, using modern patterns like hooks, context, and lazy loading. The UI is styled with Tailwind CSS and uses the HeroUI component library.

## Application Structure

### Main Entry Point

**Location**: [src/main.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/main.tsx)

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### App Component

**Location**: [src/App.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/App.tsx)

The main app component manages character selection:

```typescript
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import Header from '@src/components/Header'
import { useState } from 'react'
import CharactersTable from '@src/components/CharactersTable'
import CharacterOverview from './components/CharacterOverview'
import type { characters as Character } from '@prisma/client'

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  return (
    <HeroUIProvider>
      <ToastProvider />
      <Header />
      {selectedCharacter ? (
        <CharacterOverview
          character={selectedCharacter}
          onBack={() => setSelectedCharacter(null)}
        />
      ) : (
        <CharactersTable
          onSelect={(c) => setSelectedCharacter(c)}
        />
      )}
    </HeroUIProvider>
  )
}
```

**State Management**:
- `selectedCharacter`: Currently selected character (null = character selection view)

**Views**:
- **CharactersTable**: Character selection and management
- **CharacterOverview**: Character detail view with missions, resources, and store

## Custom Hooks

### usePrismaMutation

**Location**: [src/hooks/usePrismaMutation.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/hooks/usePrismaMutation.ts)

Hook for database write operations (create, update, delete).

**Type Signature**:
```typescript
function usePrismaMutation<M extends Models, O extends MutationOperations>(
  model: M,
  operation: O
): [
  UsePrismaMutationFunc<M, O>,
  { isLoading: boolean; isError: boolean }
]
```

**Usage**:
```typescript
const [createCharacter, { isLoading, isError }] = usePrismaMutation(
  'characters',
  'create'
)

// Call the mutation
await createCharacter({
  data: {
    uid: 'char-123',
    name: 'Hero',
    lvl: 1
  }
})
```

**Features**:
- Returns mutation function and loading/error states
- Automatically invalidates SWR cache on success
- Uses pattern matching to invalidate related queries

**Cache Invalidation**:
```typescript
// Invalidates all keys starting with the model name
mutate((key) => typeof key === 'string' && key.startsWith(model))
```

### usePrismaController

**Location**: [src/hooks/usePrismaController.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/hooks/usePrismaController.ts)

Hook for complex business logic operations.

**Type Signature**:
```typescript
function usePrismaController<C extends Controller, M extends Models>(
  controllerName: C,
  modelToMutate?: M | (string & {}) | M[] | (string & {})[]
): [
  UsePrismaControllerFunc<C>,
  { isLoading: boolean; isError: boolean }
]
```

**Usage**:
```typescript
const [createMission, { isLoading, isError }] = usePrismaController(
  'createMission',
  'missions'
)

// Call the controller
await createMission({
  title: 'Daily Quest',
  description: 'Complete tasks',
  type: 'daily',
  rank: 'C',
  character_ref: characterId,
  goals: [{ description: 'Exercise' }],
  rewards: [{ reward_type: 'money', reward_amount: 100 }]
})
```

**Features**:
- Handles complex operations with multiple database calls
- Supports invalidating multiple models
- Returns loading and error states

**Multiple Model Invalidation**:
```typescript
const [progressMission] = usePrismaController(
  'progressMission',
  ['missions', 'characters']  // Invalidate both models
)
```

### useList

**Location**: [src/hooks/useList.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/hooks/useList.ts)

Hook for managing local list state with add, remove, and edit operations.

**Type Signature**:
```typescript
function useList<T extends Record<string, any>>(initValue?: T[]): {
  list: T[]
  add: (item: T) => void
  remove: <K extends keyof T>(key: K, value: T[K]) => void
  editList: (list: T[]) => void
  editItem: <K extends keyof T, U extends keyof T>(
    criteria: K,
    criteriaValue: T[K],
    updateField: U,
    updateFieldValue: T[U]
  ) => void
}
```

**Usage**:
```typescript
const { list, add, remove, editItem } = useList([
  { uid: '1', description: 'Goal 1' },
  { uid: '2', description: 'Goal 2' }
])

// Add item
add({ uid: '3', description: 'Goal 3' })

// Remove item by uid
remove('uid', '1')

// Edit item
editItem('uid', '2', 'description', 'Updated Goal 2')
```

**Methods**:
- `add(item)`: Add item to list
- `remove(key, value)`: Remove item where `item[key] === value`
- `editItem(criteria, criteriaValue, updateField, updateFieldValue)`: Update item
- `editList(newList)`: Replace entire list

## Components

### CharactersTable

**Location**: [src/components/CharactersTable/](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/)

Main component for character selection and management.

**Features**:
- Display all characters in a table
- Search/filter by name
- Add new characters
- Edit existing characters
- Delete characters
- Select character to view details

**Key Files**:
- [index.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/index.tsx): Main table component
- [useColumns.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/useColumns.tsx): Column definitions
- [AddCharacterModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/AddCharacterModal.tsx): Add character modal
- [UpdateCharacterModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/UpdateCharacterModal.tsx): Edit character modal
- [DeleteCharacterModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/DeleteCharacterModal.tsx): Delete confirmation modal
- [CellActions.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharactersTable/CellActions.tsx): Row action buttons

**Data Fetching**:
```typescript
const { data, isLoading } = useSWR('characters', () =>
  fetchData('characters', 'findMany')
)
```

**Filtering**:
```typescript
const [filterValue, setFilterValue] = useState<string>('')
const filteredData = useMemo(() => {
  if (!filterValue || !data) return data
  
  return data.filter((c) =>
    c.name.toLowerCase().includes(filterValue.toLowerCase())
  )
}, [filterValue, data])
```

**Lazy Loading Modals**:
```typescript
const AddCharacterModal = lazy(() => import('./AddCharacterModal'))
const DeleteCharacterModal = lazy(() => import('./DeleteCharacterModal'))
const UpdateCharacterModal = lazy(() => import('./UpdateCharacterModal'))
```

### CharacterOverview

**Location**: [src/components/CharacterOverview/](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/)

Detailed view of a selected character.

**Structure**:
```
CharacterOverview/
├── index.tsx              # Main overview component
├── OverviewContext.ts     # React context for character data
├── Resources/             # Character stats display
├── MissionTable/          # Mission management
└── Store/                 # Items, Skills, Magic stores
    ├── Items/
    ├── Skills/
    └── Magic/
```

**Context Usage**:
```typescript
// OverviewContext.ts
const OverviewContext = createContext<{ character: Character }>()

// index.tsx
<OverviewContext.Provider value={{ character: data }}>
  <Resources />
  <MissionsTable />
  <Store />
</OverviewContext.Provider>
```

**Components**:
- **Resources**: Display character stats (level, XP, Ki, money)
- **MissionsTable**: View and manage missions
- **Store**: Purchase items, skills, and magic

### Resources Component

**Location**: [src/components/CharacterOverview/Resources/](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/Resources/)

Displays and allows editing of character resources.

**Features**:
- Display character stats (name, level, XP, Ki, money)
- Edit resources via modal
- Real-time updates

**Key Files**:
- [index.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/Resources/index.tsx): Resources display
- [ResourceEditModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/Resources/ResourceEditModal.tsx): Edit modal
- [useItems.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/Resources/useItems.tsx): Resource item definitions

### MissionTable Component

**Location**: [src/components/CharacterOverview/MissionTable/](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/)

Manages character missions.

**Features**:
- Display all missions for character
- Add new missions with goals and rewards
- Update existing missions
- Progress missions (mark goals as complete)
- Delete missions
- Filter by completion status

**Key Files**:
- [index.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/index.tsx): Main table
- [useColumns.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/useColumns.tsx): Column definitions
- [AddMissionModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/AddMissionModal.tsx): Add mission
- [UpdateMissionModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/UpdateMissionModal.tsx): Edit mission
- [ProgressMissionModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/ProgressMissionModal.tsx): Mark goals complete
- [DeleteMissionModal.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/DeleteMissionModal.tsx): Delete confirmation
- [MissionForm.tsx](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/MissionTable/MissionForm.tsx): Reusable form component

**Mission Form**:
The form manages goals and rewards using the `useList` hook:

```typescript
const { list: goals, add: addGoal, remove: removeGoal } = useList([
  { description: '' }
])

const { list: rewards, add: addReward, remove: removeReward } = useList([
  { reward_type: 'money', reward_amount: 0 }
])
```

### Store Component

**Location**: [src/components/CharacterOverview/Store/](https://github.com/Louai99k/life-as-rpg/blob/master/src/components/CharacterOverview/Store/)

Manages items, skills, and magic purchases.

**Structure**:
```
Store/
├── index.tsx              # Store tabs container
├── Items/                 # Item store
│   ├── index.tsx         # Item grid
│   ├── ItemCard.tsx      # Item display card
│   ├── ItemForm.tsx      # Add/edit form
│   ├── AddItemModal.tsx
│   ├── UpdateItemModal.tsx
│   ├── DeleteItemModal.tsx
│   ├── PurchaseItemModal.tsx
│   └── SellItemModal.tsx
├── Skills/                # Skill store
│   ├── index.tsx
│   ├── SkillCard.tsx
│   ├── SkillForm.tsx
│   ├── AddSkillModal.tsx
│   ├── UpdateSkillModal.tsx
│   ├── DeleteSkillModal.tsx
│   └── EditCharacterSkillModal.tsx
└── Magic/                 # Magic store
    ├── index.tsx
    ├── MagicCard.tsx
    ├── MagicForm.tsx
    ├── AddMagicModal.tsx
    ├── UpdateMagicModal.tsx
    ├── DeleteMagicModal.tsx
    └── EditCharacterMagicModal.tsx
```

**Features**:
- **Items**: Purchase, sell, and manage inventory
- **Skills**: Learn and level up skills
- **Magic**: Learn and level up magic abilities

**Item Card Example**:
```typescript
<ItemCard
  item={item}
  characterItem={item.character_item}
  onPurchase={() => setPurchaseModal(item)}
  onSell={() => setSellModal(item)}
  onEdit={() => setUpdateModal(item)}
  onDelete={() => setDeleteModal(item.uid)}
/>
```

## Utilities

### Fetcher

**Location**: [src/utils/prisma/fetcher.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/utils/prisma/fetcher.ts)

Type-safe wrapper for database queries:

```typescript
function fetchData<M extends Models, O extends QueryOperations>(
  model: M,
  operation: O,
  ...args: Parameters<PrismaClient[M][O]>
) {
  return electronAPI.db.query(model, operation, ...args)
}
```

**Usage with SWR**:
```typescript
const { data, isLoading } = useSWR('characters', () =>
  fetchData('characters', 'findMany')
)
```

### Fetcher Controller

**Location**: [src/utils/prisma/fetcher-controller.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/utils/prisma/fetcher-controller.ts)

Type-safe wrapper for controller operations:

```typescript
function fetchController<C extends Controller>(
  controllerName: C,
  ...args: ControllerPayloadMap[C]
): Promise<ControllerReturnMap[C]> {
  return electronAPI.db.controller(controllerName, ...args)
}
```

### Form Submit Helper

**Location**: [src/utils/form/submitHelper.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/utils/form/submitHelper.ts)

Helper for handling form submissions:

```typescript
async function submitHelper<T>(
  callback: () => Promise<T>,
  onSuccess?: (result: T) => void,
  onError?: (error: Error) => void
) {
  try {
    const result = await callback()
    onSuccess?.(result)
  } catch (error) {
    onError?.(error as Error)
  }
}
```

## State Management

### SWR for Server State

The application uses SWR for data fetching and caching:

**Basic Usage**:
```typescript
const { data, error, isLoading, mutate } = useSWR(
  'characters',
  () => fetchData('characters', 'findMany')
)
```

**Cache Keys**:
- Simple: `'characters'`, `'missions'`
- With params: `'characters/char-123'`, `'missions/mission-456'`

**Manual Revalidation**:
```typescript
// Revalidate specific key
mutate('characters')

// Revalidate by pattern
mutate((key) => typeof key === 'string' && key.startsWith('characters'))
```

### Local State with useState

Component-specific state:

```typescript
const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
const [filterValue, setFilterValue] = useState<string>('')
const [addModal, setAddModal] = useState(false)
```

### Context for Shared State

Character overview uses context to share character data:

```typescript
const OverviewContext = createContext<{ character: Character }>()

// Provider
<OverviewContext.Provider value={{ character }}>
  {children}
</OverviewContext.Provider>

// Consumer
const { character } = useContext(OverviewContext)
```

## Performance Optimizations

### 1. Lazy Loading

Components are lazy-loaded to reduce initial bundle size:

```typescript
const AddCharacterModal = lazy(() => import('./AddCharacterModal'))

// Usage with Suspense
<Suspense fallback={<Loading />}>
  {addModal && <AddCharacterModal />}
</Suspense>
```

### 2. Memoization

Expensive computations are memoized:

```typescript
const filteredData = useMemo(() => {
  if (!filterValue || !data) return data
  return data.filter((c) => c.name.toLowerCase().includes(filterValue.toLowerCase()))
}, [filterValue, data])
```

### 3. SWR Deduplication

SWR automatically deduplicates requests with the same key.

### 4. Optimistic Updates

UI updates immediately while mutations are in progress:

```typescript
mutate(
  'characters',
  async (current) => [...current, newCharacter],
  false  // Don't revalidate immediately
)
```

## Styling

### Tailwind CSS

The application uses Tailwind CSS 4 for styling:

**Configuration**: [index.css](https://github.com/Louai99k/life-as-rpg/blob/master/src/index.css)

```css
@import "tailwindcss";
```

**Usage**:
```tsx
<div className="flex flex-col gap-4 mt-8 px-8">
  <Button className="bg-foreground text-background">
    Click Me
  </Button>
</div>
```

### HeroUI Components

The application uses HeroUI for consistent UI components:

**Setup**: [hero.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/hero.ts)

```typescript
import { heroui } from '@heroui/react'
export default heroui()
```

**Components Used**:
- Table, TableHeader, TableBody, TableRow, TableCell
- Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
- Button, Input, Select, Textarea
- Card, CardHeader, CardBody, CardFooter
- Skeleton (loading states)
- Toast (notifications)

## Type Safety

### Global Types

**Location**: [global.d.ts](https://github.com/Louai99k/life-as-rpg/blob/master/global.d.ts)

Declares global `electronAPI` interface:

```typescript
declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

declare const electronAPI: ElectronAPI
```

### Prisma Types

**Location**: [src/types/prisma.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/types/prisma.ts)

Type-safe Prisma operations:

```typescript
export type Models = Prisma.ModelName
export type Operations = keyof PrismaClient[Models]
export type QueryOperations = Extract<Operations, 'findUnique' | 'findFirst' | 'findMany' | ...>
export type MutationOperations = Extract<Operations, 'create' | 'update' | 'delete' | ...>
```

### Electron Types

**Location**: [src/types/electron.ts](https://github.com/Louai99k/life-as-rpg/blob/master/src/types/electron.ts)

Type-safe controller operations:

```typescript
export type Controller =
  | 'createMission'
  | 'updateMission'
  | 'progressMission'
  | 'findSkillWithCharacter'
  | 'findMagicWithCharacter'
  | 'findItemWithCharacter'

export interface ControllerPayloadMap extends Record<Controller, any[]> {
  createMission: [CreateMissionControllerPayload]
  updateMission: [UpdateMissionControllerPayload]
  // ...
}
```

## Error Handling

### Hook-Level Errors

Hooks return error states:

```typescript
const [mutate, { isLoading, isError }] = usePrismaMutation('characters', 'create')

if (isError) {
  toast.error('Failed to create character')
}
```

### Component-Level Errors

Components handle errors from SWR:

```typescript
const { data, error, isLoading } = useSWR('characters', fetcher)

if (error) {
  return <ErrorMessage error={error} />
}
```

## Next Steps

- Review [API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md) for detailed type definitions
- Explore [Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md) for backend implementation
- Check [Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md) for best practices
