# Music Library Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Prisma Setup](#prisma-setup)
- [Seeding the Database](#seeding-the-database)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the **Music Library Application**! This cross-platform desktop application allows users to manage and play their local music files. Built with Electron and Vue.js, it offers a sleek interface powered by Naive UI components. The application leverages Prisma ORM with a local SQLite database to efficiently handle music library data.

## Features

- **User-Friendly Interface**: Organized layout with navigable sections.
- **Local Music Management**: Scan and add local music files to your library.
- **Music Playback Controls**: Play, pause, skip tracks with volume control.
- **Data Management**: Utilize Prisma ORM for seamless database interactions.
- **Expandable**: Future integrations with streaming services and cloud sync.

## Tech Stack

### Frontend

- **Framework**: Vue.js (with TypeScript)
- **Component Library**: Naive UI
- **Bundler**: Vite

### Backend

- **Main Process**: Electron (with TypeScript)
- **Database ORM**: Prisma (with SQLite)

### Integration and External Services

- **Authentication**: Clerk (future integration)
- **Backend Storage/Database**: Supabase (future integration for cloud sync)
- **Streaming Service Integration**: Spotify API (initial MVP)

### Other Tools and Libraries

- **Node.js**: JavaScript runtime for backend
- **TypeScript**: Strongly typed language for better reliability and maintainability
- **Electron IPC**: Communicate securely between the main process and the Vue renderer

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v14 or higher
- **npm**: v6 or higher (comes with Node.js)
- **Git**: For version control

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/music-library-app.git
   cd music-library-app
   ```

2. **Install Dependencies**

   All necessary dependencies are listed in `package.json`. Install them using:

   ```bash
   npm install
   ```

3. **Initialize Prisma**

   After installing dependencies, initialize Prisma (if not already done):

   ```bash
   npx prisma init
   ```

   > **Note:** This step may already be completed. Check if a `prisma` directory exists.

4. **Run Prisma Migration**

   To create and apply the initial database schema, run:

   ```bash
   npx prisma migrate dev --name init
   ```

   This command will create the SQLite database file and apply the initial migration based on your schema.

## Prisma Setup

Prisma is used as the ORM to manage the SQLite database.

1. **Define the Database Schema**

   The Prisma schema is located at `prisma/schema.prisma`. It defines the data models for `Artist`, `Album`, and `Song`.

   ```prisma:prisma/schema.prisma
   generator client {
     provider = "prisma-client-js"
   }
   
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   
   model Artist {
     id      Int     @id @default(autoincrement())
     name    String  @unique
     albums  Album[]
     songs   Song[]
   }
   
   model Album {
     id        Int     @id @default(autoincrement())
     title     String
     artist    Artist  @relation(fields: [artistId], references: [id])
     artistId  Int
     songs     Song[]
     releaseAt DateTime?
   }
   
   model Song {
     id        Int     @id @default(autoincrement())
     title     String
     artist    Artist  @relation(fields: [artistId], references: [id])
     artistId  Int
     album     Album?  @relation(fields: [albumId], references: [id])
     albumId   Int?
     duration  Int     // Duration in seconds
     year      Int
     filePath  String  @unique
   }
   ```

2. **Generate Prisma Client**

   After defining the schema, generate the Prisma Client to interact with the database.

   ```bash
   npx prisma generate
   ```

   > **Note:** Run this command whenever you make changes to the Prisma schema.

3. **Migrate the Database**

   Apply migrations to set up the SQLite database based on the schema.

   ```bash
   npx prisma migrate dev --name init
   ```

   This command creates the SQLite database file at `prisma/dev.db` and applies the initial migration.

## Seeding the Database

To populate the database with sample data, use the provided seed script.

1. **Run the Seed Script**

   ```bash
   npm run prisma:seed
   ```

   This command executes the seed script located at `prisma/seed/seed.ts`, adding sample artists, albums, and songs to the database.

   You should see the following output:

   ```
   Database has been seeded. 🌱
   ```

## Running the Application

1. **Start the Development Server**

   To run the application in development mode:

   ```bash
   npm run dev
   ```

   This command starts the Vite development server and launches the Electron application. The app should open as a blank window initially.

2. **Building the Application**

   To build the application for production:

   ```bash
   npm run build
   ```

   This command bundles the Vue frontend using Vite and packages the Electron application for the current platform.

3. **Packaging the Application**

   To create distributable binaries:

   ```bash
   npm run package
   ```

   > **Note:** Ensure you have configured the packaging settings as needed.

## Folder Structure

```plaintext
music-library-app/
├── prisma/
│   ├── schema.prisma         # Prisma schema definition
│   └── seed/
│       └── seed.ts           # Database seed script
├── src/
│   ├── main/                 # Electron main process
│   │   ├── main.ts           # Electron entry file
│   │   ├── preload.ts        # Preload script for secure IPC
│   │   └── utils/
│   │       └── prisma.ts     # Prisma Client instance
│   ├── renderer/             # Vue renderer process
│   │   ├── components/
│   │   │   ├── LeftNavigation.vue
│   │   │   ├── LibraryView.vue
│   │   │   └── NowPlaying.vue
│   │   ├── App.vue           # Vue root component
│   │   ├── app.ts            # Renderer entry file
│   │   └── index.html        # HTML template for the renderer
│   └── types/
│       └── electron.d.ts     # Type definitions for Electron API
├── package.json
├── tsconfig.json
├── vite.config.ts            # Vite configuration for Vue
└── Readme.md
```

## Scripts

The following scripts are available in `package.json`:

- **`npm run dev`**: Starts the Vite development server and launches the Electron app.
- **`npm run build`**: Builds the Vue frontend using Vite.
- **`npm run package`**: Packages the Electron application for distribution.
- **`npm run prisma:seed`**: Runs the Prisma seed script to populate the database with sample data.

> **Note:** Ensure that `ts-node` is installed as a development dependency to run TypeScript scripts.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

   Click the "Fork" button at the top-right corner of the repository page.

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your commit message"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Create a Pull Request**

   Go to the repository on GitHub and open a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out if you have any questions or need further assistance!
