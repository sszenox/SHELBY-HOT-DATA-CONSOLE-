const state = {
  objects: [],
  reads: [],
  filter: "all",
};

const seedPayloads = [
  {
    type: "AI Pipeline",
    owner: "0xA17...Shelby",
    policy: "owner-gated",
    payload: { model: "vision-indexer", frame: 1242, embeddingWindow: "30s", confidence: 0.94 },
  },
  {
    type: "Analytics Dashboard",
    owner: "0xD45...Metrics",
    policy: "public-metered",
    payload: { metric: "swap_volume", chain: "Aptos", interval: "1s", value: 584002 },
  },
  {
    type: "Media Platform",
    owner: "0xF11...Studio",
    policy: "token-gated",
    payload: { stream: "live-concert", segment: 982, bitrate: "4k", drm: "wallet-access" },
  },
  {
    type: "DePIN Feed",
    owner: "0x9BE...Sensor",
    policy: "owner-gated",
    payload: { sensor: "edge-23", temperature: 22.8, humidity: 0.41, ts: "now" },
  },
];

const dom = {
  workload: document.querySelector("#workload"),
  owner: document.querySelector("#owner"),
  policy: document.querySelector("#policy"),
  payload: document.querySelector("#payload"),
  publishBtn: document.querySelector("#publishBtn"),
  burstBtn: document.querySelector("#burstBtn"),
  objectGrid: document.querySelector("#objectGrid"),
  template: document.querySelector("#objectCardTemplate"),
  storedCount: document.querySelector("#storedCount"),
  avgLatency: document.querySelector("#avgLatency"),
  readCount: document.querySelector("#readCount"),
  ownerCount: document.querySelector("#ownerCount"),
  chart: document.querySelector("#latencyChart"),
  filters: document.querySelectorAll(".segmented button"),
};

class ShelbyHotStorageAdapter {
  constructor() {
    this.memory = new Map();
  }

  async upload({ type, owner, policy, payload }) {
    const encoded = JSON.stringify({ type, owner, policy, payload, timestamp: Date.now() });
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(encoded));
    const id = `shby://${Array.from(new Uint8Array(digest))
      .slice(0, 12)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")}`;

    const object = {
      id,
      type,
      owner,
      policy,
      payload,
      reads: 0,
      createdAt: new Date(),
    };

    this.memory.set(id, object);
    return object;
  }

  async read(id) {
    const started = performance.now();
    const baseLatency = 38 + Math.random() * 92;
    await new Promise((resolve) => setTimeout(resolve, baseLatency));
    const object = this.memory.get(id);
    const latency = Math.round(performance.now() - started);

    if (!object) {
      throw new Error("Object not found in hot storage");
    }

    object.reads += 1;
    state.reads.push(latency);
    return { object, latency };
  }
}

const shelby = new ShelbyHotStorageAdapter();

function normalizePayload(rawPayload) {
  try {
    return JSON.parse(rawPayload);
  } catch {
    return { content: rawPayload };
  }
}

async function publishObject(overrides = {}) {
  const object = await shelby.upload({
    type: overrides.type || dom.workload.value,
    owner: overrides.owner || dom.owner.value.trim() || "0xOwner",
    policy: overrides.policy || dom.policy.value,
    payload: overrides.payload || normalizePayload(dom.payload.value),
  });

  state.objects.unshift(object);
  render();
}

async function burstPublish() {
  const burst = Array.from({ length: 12 }, (_, index) => {
    const seed = seedPayloads[index % seedPayloads.length];
    return publishObject({
      ...seed,
      payload: {
        ...seed.payload,
        sequence: state.objects.length + index + 1,
        sampleRate: `${60 + Math.round(Math.random() * 180)}Hz`,
      },
    });
  });

  await Promise.all(burst);
}

async function readObject(id) {
  const button = document.querySelector(`[data-read-id="${id}"]`);
  if (button) {
    button.textContent = "Reading";
    button.disabled = true;
  }

  await shelby.read(id);
  render();
}

function filteredObjects() {
  if (state.filter === "all") {
    return state.objects;
  }

  return state.objects.filter((object) => object.type === state.filter);
}

function render() {
  dom.objectGrid.replaceChildren();

  for (const object of filteredObjects()) {
    const card = dom.template.content.firstElementChild.cloneNode(true);
    card.querySelector(".type-pill").textContent = object.type;
    card.querySelector("h3").textContent = `${object.type} packet`;
    card.querySelector(".payload-preview").textContent = JSON.stringify(object.payload).slice(0, 96);
    card.querySelector(".owner-value").textContent = object.owner;
    card.querySelector(".policy-value").textContent = object.policy;
    card.querySelector(".cid-value").textContent = object.id;
    card.querySelector(".reads-value").textContent = String(object.reads);

    const readButton = card.querySelector(".read-button");
    readButton.dataset.readId = object.id;
    readButton.addEventListener("click", () => readObject(object.id));
    dom.objectGrid.append(card);
  }

  const owners = new Set(state.objects.map((object) => object.owner));
  const avgLatency = state.reads.length
    ? Math.round(state.reads.reduce((sum, latency) => sum + latency, 0) / state.reads.length)
    : 0;

  dom.storedCount.textContent = String(state.objects.length);
  dom.avgLatency.textContent = `${avgLatency} ms`;
  dom.readCount.textContent = String(state.reads.length);
  dom.ownerCount.textContent = String(owners.size);

  drawChart();
}

function drawChart() {
  const ctx = dom.chart.getContext("2d");
  const width = dom.chart.width;
  const height = dom.chart.height;
  const reads = state.reads.slice(-24);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#15171b";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(245, 241, 232, 0.12)";
  ctx.lineWidth = 1;
  for (let index = 1; index < 5; index += 1) {
    const y = (height / 5) * index;
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(width - 24, y);
    ctx.stroke();
  }

  if (!reads.length) {
    ctx.fillStyle = "#aeb6c3";
    ctx.font = "16px Inter, sans-serif";
    ctx.fillText("Click Read on a hot object to plot retrieval latency.", 28, height / 2);
    return;
  }

  const maxLatency = Math.max(160, ...reads);
  const step = (width - 56) / Math.max(reads.length - 1, 1);

  ctx.beginPath();
  reads.forEach((latency, index) => {
    const x = 28 + index * step;
    const y = height - 28 - (latency / maxLatency) * (height - 62);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "#57c7ff";
  ctx.lineWidth = 3;
  ctx.stroke();

  reads.forEach((latency, index) => {
    const x = 28 + index * step;
    const y = height - 28 - (latency / maxLatency) * (height - 62);
    ctx.fillStyle = latency < 100 ? "#58d68d" : "#f5ba4b";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

dom.publishBtn.addEventListener("click", () => publishObject());
dom.burstBtn.addEventListener("click", burstPublish);
dom.filters.forEach((button) => {
  button.addEventListener("click", () => {
    dom.filters.forEach((filterButton) => filterButton.classList.remove("active"));
    button.classList.add("active");
    state.filter = button.dataset.filter;
    render();
  });
});

Promise.all(seedPayloads.map((payload) => publishObject(payload))).then(() => {
  const firstObjects = state.objects.slice(0, 3).map((object) => shelby.read(object.id));
  return Promise.all(firstObjects);
}).then(render);
