# 📝 Bun Todo API - Applicazione Todo Full-Stack

Una moderna applicazione Todo full-stack costruita con Bun, Fastify, Prisma e React. Questo progetto dimostra l'utilizzo del runtime Bun sia per il backend che per il frontend.

## 📋 Indice

- [Panoramica del Progetto](#panoramica-del-progetto)
- [Caratteristiche](#caratteristiche)
- [Stack Tecnologico](#stack-tecnologico)
- [Struttura del Progetto](#struttura-del-progetto)
- [Prerequisiti](#prerequisiti)
- [Installazione](#installazione)
- [Configurazione](#configurazione)
- [Esecuzione dell'Applicazione](#esecuzione-dellapplicazione)
- [Documentazione API](#documentazione-api)
- [Schema del Database](#schema-del-database)
- [Sviluppo](#sviluppo)
- [Licenza](#licenza)

## 🎯 Panoramica del Progetto

Questo repository contiene un'applicazione completa per la gestione di task todo, divisa in due parti principali:

- **todo-api**: Backend REST API costruito con Fastify e Prisma
- **todo-app**: Frontend React costruito con Bun e TailwindCSS

L'applicazione permette agli utenti di organizzare i propri task in gruppi, con supporto per priorità, stati e timestamp.

## ✨ Caratteristiche

### Backend (todo-api)
- 🚀 Server API RESTful costruito con Fastify
- 💾 Database SQLite con Prisma ORM
- 🔄 Sistema di auto-caricamento per plugin e route
- 🌐 Supporto CORS configurato
- 📊 Gestione completa CRUD per Todo e Gruppi
- ✅ Validazione degli input
- 🏷️ Sistema di priorità (LOW, MEDIUM, HIGH)
- 📈 Stati dei task (PENDING, IN_PROGRESS, COMPLETED)

### Frontend (todo-app)
- ⚛️ Interfaccia React moderna
- 🎨 Styled con TailwindCSS v4
- 🔍 Gestione dello stato con TanStack Query (React Query)
- 🎭 Componenti UI con Radix UI
- 📱 Design responsive
- ⚡ Hot Module Replacement (HMR)
- 🎯 TypeScript per type safety

## 🛠️ Stack Tecnologico

### Backend
- **Runtime**: Bun
- **Framework**: Fastify v5.6.2
- **ORM**: Prisma v7.2.0 con adapter LibSQL
- **Database**: SQLite
- **Linguaggio**: TypeScript

### Frontend
- **Runtime**: Bun
- **Framework UI**: React 19
- **Styling**: TailwindCSS v4
- **State Management**: TanStack Query v5
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Linguaggio**: TypeScript

## 📁 Struttura del Progetto

```
bun-todo-api/
├── todo-api/                  # Backend API
│   ├── index.ts              # Entry point del server
│   ├── prisma.config.ts      # Configurazione Prisma
│   ├── plugins/              # Plugin Fastify
│   │   ├── cors.ts          # Configurazione CORS
│   │   └── prisma.ts        # Plugin Prisma
│   ├── routes/              # Route API
│   │   └── v1/
│   │       ├── todo.ts      # Endpoint Todo
│   │       ├── group.ts     # Endpoint Gruppi
│   │       └── ping.ts      # Health check
│   ├── prisma/
│   │   ├── schema.prisma    # Schema database
│   │   └── migrations/      # Migrazioni database
│   └── generated/           # Codice generato da Prisma
│
└── todo-app/                 # Frontend React
    ├── src/
    │   ├── App.tsx          # Componente principale
    │   ├── index.ts         # Entry point
    │   ├── components/      # Componenti React
    │   │   ├── add-todo.tsx
    │   │   ├── add-group.tsx
    │   │   ├── task-item.tsx
    │   │   └── ui/          # Componenti UI riutilizzabili
    │   └── types/
    │       └── api.ts       # Type definitions API
    └── build.ts             # Script di build
```

## 📦 Prerequisiti

- [Bun](https://bun.sh/) v1.0.0 o superiore
- Node.js v18+ (opzionale, per compatibilità)

## 🚀 Installazione

### 1. Clona il repository

```bash
git clone <repository-url>
cd bun-todo-api
```

### 2. Installa le dipendenze del Backend

```bash
cd todo-api
bun install
```

### 3. Installa le dipendenze del Frontend

```bash
cd ../todo-app
bun install
```

## ⚙️ Configurazione

### Backend (todo-api)

1. Crea un file `.env` nella directory `todo-api`:

```env
DATABASE_URL="file:./todo-database.db"
```

2. Genera il Prisma Client:

```bash
cd todo-api
bunx prisma generate
```

3. Esegui le migrazioni del database:

```bash
bunx prisma migrate dev
```

### Frontend (todo-app)

Il frontend è configurato per connettersi all'API su `http://localhost:4000`. Se necessario, modifica l'URL dell'API in [src/App.tsx](todo-app/src/App.tsx).

## 🎮 Esecuzione dell'Applicazione

### Avvia il Backend

```bash
cd todo-api
bun run index.ts
```

Il server sarà disponibile su `http://localhost:4000`

### Avvia il Frontend

In un nuovo terminale:

```bash
cd todo-app
bun run dev
```

Il frontend sarà disponibile su `http://localhost:3000`

## 📚 Documentazione API

### Base URL
```
http://localhost:4000/v1
```

### Endpoints

#### 📋 Todos

##### GET /todos
Recupera tutti i todo

**Response:**
```json
{
  "success": true,
  "data": {
    "todos": [
      {
        "id": 1,
        "title": "Esempio Todo",
        "description": "Descrizione",
        "status": "PENDING",
        "priority": "MEDIUM",
        "groupId": 1,
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

##### POST /todos
Crea un nuovo todo

**Request Body:**
```json
{
  "title": "Nuovo Task",
  "description": "Descrizione del task",
  "group": 1,
  "priority": "HIGH"
}
```

**Note:** Il campo `group` (groupId) è obbligatorio.

##### PUT /todos/:id
Aggiorna un todo esistente

**Request Body:**
```json
{
  "title": "Titolo Aggiornato",
  "description": "Descrizione aggiornata",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

##### DELETE /todos/:id
Elimina un todo

**Response:**
```json
{
  "success": true
}
```

##### GET /todos/groups
Ottieni statistiche dei todo raggruppati per stato

**Response:**
```json
{
  "success": true,
  "data": {
    "groupedTodos": [
      {
        "status": "PENDING",
        "_count": { "id": 5 }
      }
    ]
  }
}
```

#### 📁 Groups

##### GET /groups
Recupera tutti i gruppi con i loro todo

**Response:**
```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": 1,
        "name": "Lavoro",
        "createdAt": "2026-01-01T00:00:00.000Z",
        "updatedAt": "2026-01-01T00:00:00.000Z",
        "todos": []
      }
    ]
  }
}
```

##### POST /groups
Crea un nuovo gruppo

**Request Body:**
```json
{
  "name": "Nuovo Gruppo"
}
```

##### PUT /groups/:id
Aggiorna un gruppo esistente

**Request Body:**
```json
{
  "name": "Nome Aggiornato"
}
```

##### DELETE /groups/:id
Elimina un gruppo

### Enums

#### Status
- `PENDING` - Task in attesa
- `IN_PROGRESS` - Task in corso
- `COMPLETED` - Task completato

#### Priority
- `LOW` - Bassa priorità
- `MEDIUM` - Media priorità
- `HIGH` - Alta priorità

## 🗃️ Schema del Database

### TodoGroup
| Campo     | Tipo     | Descrizione                    |
|-----------|----------|--------------------------------|
| id        | Int      | ID primario (auto-increment)   |
| name      | String   | Nome del gruppo                |
| createdAt | DateTime | Data di creazione              |
| updatedAt | DateTime | Data ultimo aggiornamento      |
| todos     | Todo[]   | Relazione con i Todo           |

### Todo
| Campo       | Tipo       | Descrizione                    |
|-------------|------------|--------------------------------|
| id          | Int        | ID primario (auto-increment)   |
| title       | String     | Titolo del todo                |
| description | String?    | Descrizione (opzionale)        |
| status      | Status     | Stato del task                 |
| priority    | Priority   | Priorità del task              |
| groupId     | Int?       | ID del gruppo (opzionale)      |
| createdAt   | DateTime   | Data di creazione              |
| updatedAt   | DateTime   | Data ultimo aggiornamento      |
| group       | TodoGroup? | Relazione con il gruppo        |

## 💻 Sviluppo

### Comandi Backend

```bash
# Avvia in modalità development
bun run index.ts

# Genera Prisma Client
bunx prisma generate

# Crea nuova migrazione
bunx prisma migrate dev --name migration_name

# Apri Prisma Studio (GUI del database)
bunx prisma studio

# Esegui seed del database
bunx prisma db seed
```

### Comandi Frontend

```bash
# Avvia development server con HMR
bun run dev

# Build per produzione
bun run build

# Avvia server produzione
bun run start
```

### Struttura dei Plugin Fastify

Il progetto utilizza il pattern di auto-caricamento di Fastify:

- **Plugins** (`todo-api/plugins/`): Vengono caricati automaticamente e configurano funzionalità come CORS e Prisma
- **Routes** (`todo-api/routes/`): Vengono caricati automaticamente e registrano gli endpoint API

### Convenzioni di Codice

- TypeScript strict mode abilitato
- Uso di async/await per operazioni asincrone
- Gestione errori con try/catch e response HTTP appropriati
- Validazione degli input nelle route API
- Componenti React funzionali con hooks

## 🏗️ Architettura

### Backend

L'API segue un'architettura modulare:

1. **Entry Point** ([index.ts](todo-api/index.ts)): Inizializza il server Fastify e carica plugin/route
2. **Plugins**: Configurano funzionalità cross-cutting (database, CORS)
3. **Routes**: Definiscono gli endpoint API organizzati per risorsa
4. **Prisma**: Gestisce l'accesso al database con un ORM type-safe

### Frontend

L'app React segue un'architettura component-based:

1. **App Component**: Root component che orchestra l'UI
2. **Componenti UI**: Componenti riutilizzabili basati su Radix UI
3. **Feature Components**: Componenti specifici dell'applicazione (AddTodo, TaskItem)
4. **API Layer**: TanStack Query gestisce fetch e cache dei dati

## 🔐 Sicurezza

- CORS configurato per accettare solo richieste da `http://localhost:3000`
- Input validation su tutte le route API
- SQL injection prevention tramite Prisma ORM
- TypeScript type safety su tutto il codebase

## 🐛 Troubleshooting

### Il server non si avvia

1. Verifica che Bun sia installato correttamente: `bun --version`
2. Controlla che la porta 4000 non sia già in uso
3. Verifica che il database sia stato migrato correttamente

### Il frontend non si connette all'API

1. Assicurati che il backend sia in esecuzione su `http://localhost:4000`
2. Controlla la console del browser per errori CORS
3. Verifica la configurazione CORS in [todo-api/plugins/cors.ts](todo-api/plugins/cors.ts)

### Errori Prisma

1. Rigenera il client: `bunx prisma generate`
2. Controlla lo schema: `bunx prisma validate`
3. Resetta il database: `bunx prisma migrate reset`

## 📄 Licenza

Questo progetto è distribuito sotto la licenza MIT. Vedi il file [LICENSE](LICENSE) per maggiori dettagli.

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di aprire issue o pull request.

## 📧 Contatti

Per domande o supporto, apri un'issue su GitHub.

---

Sviluppato con ❤️ usando Bun
