# RepoForge Logstream

Structured log helpers for RepoForge.

This package intentionally keeps the first version small:

- NDJSON encoding for runner output
- SSE encoding for the control API
- an in-memory cursor buffer for live UI sessions
- a bridge configuration point for Denis Mishankov's [`web-tail`](https://github.com/mishankov/web-tail)

`web-tail` is not vendored here. The bridge is command-based so the control plane can use an installed `web-tail` binary or a future adapter without forcing RepoForge to own log monitoring code.

## Build

```bash
npm install
npm run build
```
