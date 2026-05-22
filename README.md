# Shelby Hot Data Console By sszenox

A Web3 data application built by **sszenox** to demonstrate how Shelby’s decentralized hot-storage layer can support fast read access for high-frequency content.

This project is focused on real-time Web3 data use cases such as AI data pipelines, analytics dashboards, DePIN feeds, and media platforms where applications need quick retrieval, user ownership, and decentralized content serving.

## Live Demo

Access the hosted app here:

https://sszenox.github.io/SHELBY-HOT-DATA-CONSOLE-/

## Repository

GitHub repository:

https://github.com/sszenox/SHELBY-HOT-DATA-CONSOLE-

## About This Project

Shelby Hot Data Console is a browser-based prototype that simulates how developers can store and retrieve hot data objects using a Shelby-style decentralized storage flow.

The app lets users publish high-frequency data packets, attach ownership metadata, choose access policies, and read content through a fast hot-object explorer. It also tracks read latency, verified reads, active owners, and stored objects.

The main goal is to show how Shelby can be used as a hot-storage layer for decentralized applications that require real-time data retrieval.

## Why I Built This

Many decentralized storage systems are mainly used for long-term storage. That is useful, but modern Web3 applications also need fast access to frequently used data.

Examples include:

- AI agents reading fresh embeddings or inference logs.
- Analytics dashboards loading live metrics.
- Media platforms serving live content segments.
- DePIN networks publishing sensor or device data.
- Web3 apps keeping ownership and access rules attached to content.

Shelby’s hot-storage idea fits this problem because it focuses on fast reads while still supporting decentralization and user-owned content.

## Key Features

- Publish hot data objects directly from the browser.
- Simulate Shelby-style decentralized hot storage.
- Generate Shelby-style content IDs for stored objects.
- Store owner wallet metadata with every object.
- Support access policies such as owner-gated, token-gated, and public-metered content.
- Read hot objects with simulated low latency.
- Track average read latency.
- Count verified reads and active owners.
- Filter content by workload type.
- Display a live latency chart.
- Include a clean adapter layer for future Shelby SDK integration.

## Supported Workloads

### AI Pipeline

Used for high-frequency AI data such as:

- embeddings
- model outputs
- frame analysis
- agent memory updates
- inference events

### Analytics Dashboard

Used for fast-changing Web3 metrics such as:

- transaction activity
- swap volume
- wallet behavior
- protocol activity
- real-time chain data

### Media Platform

Used for content that needs fast access, such as:

- video segments
- livestream manifests
- creator-owned files
- gated media content

### DePIN Feed

Used for continuous machine or device data such as:

- sensor readings
- location updates
- hardware telemetry
- edge network events

## How It Works

The current app uses an in-memory Shelby-compatible adapter. This makes the project easy to run in the browser while keeping the code ready for real Shelby SDK integration later.

Flow:

1. User selects a workload type.
2. User enters an owner wallet.
3. User selects an access policy.
4. User publishes a content payload.
5. The app creates a simulated Shelby content ID.
6. The object appears in the hot object explorer.
7. User clicks read to simulate fast retrieval.
8. The app updates latency and read telemetry.

## Shelby Integration Plan

The project is structured so the current adapter can be replaced with the Shelby SDK.

Example direction:

```js
import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

const shelby = new ShelbyClient({
  network: Network.TESTNET,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY,
});
```

Future adapter methods can map to Shelby storage calls:

```js
await shelby.storage.upload(file, { metadata });
await shelby.storage.download(contentId);
```

This means the frontend experience can stay the same while the storage backend is upgraded from simulation to Shelby testnet or production.

## Access Policy Model

The prototype includes three access policy examples:

- `owner-gated`: content belongs to and is controlled by the owner wallet.
- `token-gated`: access can be limited to token holders or approved users.
- `public-metered`: content can be public while still tracking read activity.

This shows how Shelby-powered apps can combine fast access with ownership-aware serving.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- GitHub Pages
- Shelby-compatible hot-storage adapter

## Project Structure

```text
.
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Run Locally

Clone the repository:

```bash
git clone https://github.com/sszenox/SHELBY-HOT-DATA-CONSOLE-.git
cd SHELBY-HOT-DATA-CONSOLE-
```

Serve the project:

```bash
python -m http.server 4173
```

Open in browser:

```text
http://127.0.0.1:4173/
```

## Future Improvements

- Connect directly to Shelby testnet.
- Add wallet connection.
- Add real file upload support.
- Add media segment storage examples.
- Add signed access requests.
- Add persistent object history.
- Add real-time ingestion.
- Add dashboard analytics for read frequency and owner activity.
- Add AI pipeline examples using embeddings and inference logs.

## Built By

Built by **sszenox** as a Shelby hot-storage Web3 data application prototype.

## Conclusion

Shelby Hot Data Console shows how decentralized hot storage can support applications that need real-time content retrieval without giving up ownership and decentralization.

The project demonstrates a practical direction for using Shelby in AI pipelines, analytics dashboards, media apps, and DePIN systems.
