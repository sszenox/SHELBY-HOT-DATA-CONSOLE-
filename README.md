# Shelby Hot Data Console

A Web3 data application prototype that demonstrates how Shelby’s decentralized hot-storage layer can be used to store and serve high-frequency content with fast read access.

The goal of this project is to show how scalable applications such as AI data pipelines, analytics dashboards, DePIN networks, and media platforms can retrieve real-time data quickly while still preserving decentralization, user ownership, and access-aware content delivery.

## Live Demo

Access the hosted app here:

https://sszenox.github.io/SHELBY-HOT-DATA-CONSOLE-/

## Project Overview

Modern Web3 applications increasingly depend on fast-moving data. AI agents need fresh model outputs and embeddings, analytics dashboards need near real-time metrics, and media platforms need quick access to live content segments.

Traditional decentralized storage is often optimized for long-term persistence, but many applications also need a hot-storage layer where frequently accessed content can be retrieved quickly.

Shelby Hot Data Console explores this idea by simulating a decentralized hot-data console where users can:

- Publish high-frequency data objects.
- Attach ownership and access-policy metadata.
- Retrieve hot content with low-latency reads.
- Monitor live read performance.
- Organize content by real-world Web3 workload types.

## Why Shelby

Shelby is designed around decentralized hot storage, making it useful for applications that need faster reads than cold archival storage while still keeping data ownership and decentralized infrastructure in mind.

This project focuses on the kind of developer experience Shelby can enable:

- Fast retrieval for frequently accessed content.
- Storage flows that preserve owner metadata.
- Access-aware serving for gated or metered content.
- A simple application layer that can later connect to Shelby SDK methods.
- Real-time dashboards for monitoring content activity.

## Key Features

- Publish AI pipeline events, analytics packets, media manifests, and DePIN feed samples.
- Store owner wallet metadata for each hot object.
- Support owner-gated, token-gated, and public-metered access policies.
- Simulate Shelby-style fast read access.
- Track average read latency in real time.
- Count verified reads, active owners, and stored hot objects.
- Filter stored content by workload type.
- Display a live latency chart for content retrieval behavior.
- Provide a clean adapter layer that can be replaced with Shelby SDK calls.

## Supported Workloads

### AI Data Pipelines

AI systems often produce high-frequency data such as embeddings, inference outputs, frame analysis, model events, and agent memory updates. Shelby-style hot storage can help these systems retrieve fresh data quickly without depending only on centralized infrastructure.

### Analytics Dashboards

Web3 dashboards need fast access to changing metrics such as transaction activity, swap volume, wallet behavior, DeFi liquidity, and chain-level events. A hot-storage layer can make these dashboards more responsive.

### Media Platforms

Media applications need quick access to manifests, video segments, creator content, and user-owned media. Shelby can support fast serving while keeping content ownership and access rules attached.

### DePIN Networks

DePIN applications generate continuous streams of device, sensor, and location data. Hot storage can help make this data immediately useful for dashboards, automation systems, and AI agents.

## How The App Works

The current prototype uses a Shelby-compatible in-memory adapter. This lets the app run directly in the browser while keeping the architecture ready for Shelby SDK integration.

The app flow is:

1. A user selects a workload type.
2. The user enters an owner wallet and access policy.
3. The app publishes a hot data object.
4. The object receives a simulated Shelby-style content ID.
5. The object appears in the hot object explorer.
6. Reads are simulated with low-latency retrieval.
7. The dashboard updates read count and latency metrics.

## Shelby Integration Plan

The current demo uses an in-memory adapter inside `app.js`. To connect it to Shelby testnet or production, the adapter can be replaced with Shelby SDK calls.

Example integration direction:

```js
import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

const shelby = new ShelbyClient({
  network: Network.TESTNET,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY,
});
```

The current adapter methods can then be mapped to Shelby storage operations:

```js
await shelby.storage.upload(file, { metadata });
await shelby.storage.download(contentId);
```

The UI is intentionally structured so the storage logic can be upgraded without rewriting the whole frontend.

## Access Policy Model

The prototype includes three example access policies:

- `owner-gated`: content is controlled by the owner wallet.
- `token-gated`: content can be served only to users with the required token or permission.
- `public-metered`: content can be publicly accessed while still tracking usage.

These policies demonstrate how Shelby-based applications can combine fast retrieval with ownership-aware content serving.

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

Serve the project with any static file server:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Future Improvements

- Connect the adapter directly to Shelby testnet.
- Add wallet connection for real owner identity.
- Add upload support for files, media segments, and structured datasets.
- Add signed access requests for gated content.
- Add persistent object history.
- Add real-time stream ingestion.
- Add analytics for read frequency, owner activity, and content popularity.
- Add AI pipeline examples using embeddings or inference logs.

## Conclusion

Shelby Hot Data Console demonstrates how decentralized hot storage can support real-time Web3 applications that need both speed and ownership. By combining fast read access, metadata-rich content objects, and access-aware serving, the project shows how Shelby can power the next generation of AI, analytics, media, and DePIN applications.
