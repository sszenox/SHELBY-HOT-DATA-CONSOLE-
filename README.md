# Shelby Hot Data Console

A Web3 data application prototype for high-frequency content workflows on Shelby-style decentralized hot storage.

## Overview

Shelby Hot Data Console demonstrates how apps can store and retrieve real-time data while preserving decentralization, ownership, and access control. It is designed for use cases like AI data pipelines, analytics dashboards, media platforms, and DePIN feeds.

## Features

- Publish AI pipeline events, analytics packets, media manifests, and DePIN feed samples.
- Store owner wallet metadata for each hot object.
- Support owner-gated, token-gated, and public-metered access policies.
- Simulate fast Shelby-style read access with live latency telemetry.
- Explore stored objects by workload type.
- Track hot object count, verified reads, active owners, and average read latency.

## Use Cases

- AI pipelines that need fast access to fresh embeddings, frames, or inference outputs.
- Analytics dashboards that consume high-frequency Web3 metrics.
- Media apps that serve live stream segments or user-owned content.
- DePIN networks that publish sensor or device data in real time.

## Run Locally

Serve the project with any static file server:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/
```

## Shelby Integration

The current demo uses an in-memory Shelby-compatible adapter. To connect it to Shelby testnet, replace the adapter internals with the Shelby SDK:

```js
import { ShelbyClient } from "@shelby-protocol/sdk/browser";
import { Network } from "@aptos-labs/ts-sdk";

const shelby = new ShelbyClient({
  network: Network.TESTNET,
  apiKey: import.meta.env.VITE_SHELBY_API_KEY,
});
```

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Shelby-style decentralized hot-storage adapter
