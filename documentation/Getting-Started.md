# Getting Started

This guide will help you set up and run the Life as RPG application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **Yarn**: Package manager (or npm)
- **Git**: For cloning the repository

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Louai99k/life-as-rpg.git
cd life-as-rpg
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

This will automatically run `npx prisma generate` as a postinstall script to generate the Prisma client.

### 3. Database Setup

The application uses SQLite with a sample database included (`sample-data.db`). The Prisma schema is located at `prisma/schema.prisma`.

If you need to regenerate the Prisma client:

```bash
npx prisma generate
```

To create a fresh database:

```bash
npx prisma db push
```

## Running the Application

### Development Mode

Run both the Vite dev server and Electron in development mode:

```bash
yarn dev
# or
npm run dev
```

This command uses `concurrently` to run:
- `vite` - Frontend dev server on http://localhost:5173
- `electron .` - Electron main process

The application will open automatically, and changes to the frontend will hot-reload.

### Running Components Separately

You can also run the frontend and Electron separately:

**Frontend only:**
```bash
yarn vite:dev
# or
npm run vite:dev
```

**Electron only:**
```bash
yarn electron:dev
# or
npm run electron:dev
```

## Building for Production

### Build the Application

```bash
yarn build
# or
npm run build
```

This command will:
1. Generate Prisma client
2. Build the Vite frontend to `dist-vite/`
3. Package the Electron app using electron-builder

### Build Steps Individually

**Build Vite only:**
```bash
yarn build:vite
# or
npm run build:vite
```

**Build Electron only:**
```bash
yarn build:electron
# or
npm run build:electron
```

## Docker Build (Windows from Linux)

The project includes a Docker Compose configuration for building Windows executables from Linux (specifically Arch Linux).

```bash
docker-compose up
```

See [docker-compose.yaml](https://github.com/Louai99k/life-as-rpg/blob/master/docker-compose.yaml) for configuration details.

## Project Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Run Vite dev server and Electron concurrently |
| `yarn vite:dev` | Run Vite dev server only |
| `yarn electron:dev` | Run Electron only |
| `yarn build` | Full production build (Prisma + Vite + Electron) |
| `yarn build:vite` | Build Vite frontend only |
| `yarn build:electron` | Package Electron app only |
| `yarn postinstall` | Auto-run after install to generate Prisma client |

## Configuration Files

### TypeScript Configuration

The project uses multiple TypeScript configurations:

- **[tsconfig.json](https://github.com/Louai99k/life-as-rpg/blob/master/tsconfig.json)**: Base configuration
- **[tsconfig.app.json](https://github.com/Louai99k/life-as-rpg/blob/master/tsconfig.app.json)**: Frontend app configuration
- **[tsconfig.node.json](https://github.com/Louai99k/life-as-rpg/blob/master/tsconfig.node.json)**: Node.js configuration

### Vite Configuration

See [vite.config.ts](https://github.com/Louai99k/life-as-rpg/blob/master/vite.config.ts) for Vite build configuration including:
- React plugin
- Tailwind CSS plugin
- Path aliases (`@src`, `@prisma`)
- Build output directory

### Electron Builder Configuration

The `build` section in [package.json](https://github.com/Louai99k/life-as-rpg/blob/master/package.json) configures:
- App ID: `com.life-as-rpg`
- Extra resources (Prisma binaries and database)
- Platform-specific settings

## Troubleshooting

### Prisma Client Not Found

If you encounter Prisma client errors:

```bash
npx prisma generate
```

### Port Already in Use

If port 5173 is already in use, you can change it in [vite.config.ts](https://github.com/Louai99k/life-as-rpg/blob/master/vite.config.ts):

```typescript
export default defineConfig({
  server: {
    port: 3000 // Change to your preferred port
  }
})
```

### Database Locked

If you get a "database is locked" error, ensure no other instances of the app are running.

### Build Errors

Make sure all dependencies are installed:

```bash
rm -rf node_modules yarn.lock
yarn install
```

## Next Steps

- Read the [Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md) documentation to understand the system design
- Explore the [Database](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Database.md) schema
- Learn about [Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md) components and hooks
- Review the [API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md) for type definitions

## Development Environment

### Code Quality

The project uses:
- **ESLint**: Code linting (see [eslint.config.js](https://github.com/Louai99k/life-as-rpg/blob/master/eslint.config.js))
- **TypeScript**: Type checking
- **Prettier**: Code formatting (recommended)

Run linting:
```bash
npx eslint .
```

## Sample Data

The application includes a sample database (`sample-data.db`) with pre-populated data for testing. This database is copied to `data.db` during the build process.

To reset to sample data, simply copy the sample database:

```bash
cp sample-data.db data.db
```

> [!NOTE]
> The database file path is configured in `prisma/schema.prisma` as `file:./data.db`
