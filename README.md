# RepoForge Logstream

Structured log helpers for RepoForge.

## RepoForge repositories

- [`repoforge-control`](https://github.com/CoolAlbert/repoforge-control) - control API and SSE endpoint
- [`repoforge-runner`](https://github.com/CoolAlbert/repoforge-runner) - worker that emits structured logs
- [`repoforge-logstream`](https://github.com/CoolAlbert/repoforge-logstream) - this package
- [`repoforge-ui`](https://github.com/CoolAlbert/repoforge-ui) - dashboard that consumes the SSE stream

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
