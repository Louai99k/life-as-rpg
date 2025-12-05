# Life as RPG - Documentation

Welcome to the comprehensive documentation for the **Life as RPG** project. This documentation is organized into multiple files to help you understand, develop, and contribute to the project.

## 📚 Documentation Index

### Getting Started

- **[Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md)** - Project introduction, features, and technology stack
- **[Getting Started](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Getting-Started.md)** - Installation, setup, and running the application

### Architecture & Design

- **[Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md)** - System architecture, design patterns, and data flow
- **[Database](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Database.md)** - Database schema, models, and Prisma configuration

### Implementation

- **[Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md)** - Electron main process, IPC communication, and database handlers
- **[Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md)** - React components, hooks, and state management

### Reference

- **[API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md)** - Complete API documentation with types and interfaces
- **[Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md)** - Development workflow, best practices, and coding standards

## 🚀 Quick Start

New to the project? Follow this reading order:

1. **[Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md)** - Understand what the project is about
2. **[Getting Started](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Getting-Started.md)** - Set up your development environment
3. **[Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md)** - Learn the system design
4. **[Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md)** - Start coding with best practices

## 📖 Documentation by Role

### For New Developers

Start here to understand the project:

1. **[Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md)** - What is Life as RPG?
2. **[Getting Started](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Getting-Started.md)** - Install and run
3. **[Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md)** - How it works
4. **[Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md)** - UI components

### For Backend Developers

Focus on the data layer:

1. **[Database](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Database.md)** - Schema and models
2. **[Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md)** - Main process and IPC
3. **[API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md)** - Type definitions

### For Frontend Developers

Focus on the UI layer:

1. **[Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md)** - Components and hooks
2. **[API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md)** - Available APIs
3. **[Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md)** - Best practices

### For Contributors

Everything you need to contribute:

1. **[Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md)** - Workflow and standards
2. **[Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md)** - Design patterns
3. **[API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md)** - Type safety

## 🔍 Quick Reference

### Common Tasks

| Task | Documentation |
|------|---------------|
| Install and run | [Getting Started](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Getting-Started.md) |
| Understand architecture | [Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md) |
| Create a component | [Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md) |
| Add database model | [Database](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Database.md) |
| Create IPC handler | [Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md) |
| Use custom hooks | [Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md) |
| Type definitions | [API Reference](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/API-Reference.md) |
| Best practices | [Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md) |

### Key Concepts

| Concept | Documentation |
|---------|---------------|
| Three-layer architecture | [Architecture](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Architecture.md) |
| IPC communication | [Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md) |
| Database schema | [Database](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Database.md) |
| State management | [Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md) |
| Controllers | [Electron](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Electron.md) |
| Custom hooks | [Frontend](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Frontend.md) |

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, HeroUI
- **Backend**: Electron 38, Prisma 6, SQLite
- **Build Tools**: Vite 7, Electron Builder
- **State Management**: SWR
- **Animation**: Framer Motion

See [Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md) for details.

## 📊 Project Structure

```
life-as-rpg/
├── electron/           # Electron main process
│   └── database/      # Database handlers and controllers
├── src/               # React frontend
│   ├── components/   # UI components
│   ├── hooks/        # Custom hooks
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── prisma/           # Database schema
├── documentation/    # This documentation
└── public/          # Static assets
```

See [Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md) for detailed structure.

## 🎯 Core Features

- **Character Management**: Create and manage RPG characters
- **Mission System**: Track goals and earn rewards
- **Skills & Magic**: Learn and level up abilities
- **Item Store**: Purchase and manage inventory
- **Offline-First**: All data stored locally

See [Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md) for complete feature list.

## 🔗 External Resources

- **Repository**: [https://github.com/Louai99k/life-as-rpg](https://github.com/Louai99k/life-as-rpg)
- **Issues**: [https://github.com/Louai99k/life-as-rpg/issues](https://github.com/Louai99k/life-as-rpg/issues)
- **React Docs**: [https://react.dev/](https://react.dev/)
- **Electron Docs**: [https://www.electronjs.org/docs/](https://www.electronjs.org/docs/)
- **Prisma Docs**: [https://www.prisma.io/docs/](https://www.prisma.io/docs/)

## 📝 Documentation Maintenance

This documentation is organized into separate files for easier maintenance and navigation:

- Each file focuses on a specific aspect of the project
- Files are cross-referenced for easy navigation
- Code examples are included throughout
- Diagrams illustrate complex concepts

### Contributing to Documentation

When updating documentation:

1. Keep files focused on their specific topic
2. Update cross-references when adding new content
3. Include code examples for clarity
4. Use diagrams for complex concepts
5. Update this README if adding new files

See [Development](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Development.md) for contribution guidelines.

## 📄 License

ISC License - See project root for details.

## 👤 Author

**Louai99k**

- GitHub: [@Louai99k](https://github.com/Louai99k)

---

**Need help?** Start with the [Overview](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Overview.md) or jump to [Getting Started](https://github.com/Louai99k/life-as-rpg/blob/master/documentation/Getting-Started.md) to begin development!
