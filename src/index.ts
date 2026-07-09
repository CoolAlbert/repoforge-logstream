export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogStreamName = "system" | "stdout" | "stderr" | "pi" | "git" | "test";

export interface LogEvent {
  ts: string;
  projectId: string;
  runId: string;
  stream: LogStreamName;
  level: LogLevel;
  msg: string;
  step?: string;
  meta?: Record<string, unknown>;
}

export interface LogCursor {
  runId: string;
  offset: number;
}

export function createLogEvent(input: Omit<LogEvent, "ts"> & { ts?: string }): LogEvent {
  return {
    ts: input.ts ?? new Date().toISOString(),
    projectId: input.projectId,
    runId: input.runId,
    stream: input.stream,
    level: input.level,
    msg: input.msg,
    step: input.step,
    meta: input.meta
  };
}

export function encodeNdjson(event: LogEvent): string {
  return `${JSON.stringify(event)}\n`;
}

export function decodeNdjson(chunk: string): LogEvent[] {
  return chunk
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line) as LogEvent);
}

export function encodeSse(event: LogEvent, id?: string | number): string {
  const prefix = id === undefined ? "" : `id: ${id}\n`;
  return `${prefix}event: log\ndata: ${JSON.stringify(event)}\n\n`;
}

export class LogBuffer {
  private readonly events: LogEvent[] = [];

  append(event: LogEvent): LogCursor {
    this.events.push(event);
    return { runId: event.runId, offset: this.events.length - 1 };
  }

  since(offset = 0): Array<{ offset: number; event: LogEvent }> {
    return this.events.slice(offset).map((event, index) => ({
      offset: offset + index,
      event
    }));
  }

  all(): LogEvent[] {
    return [...this.events];
  }
}

export interface WebTailBridgeOptions {
  command?: string;
  args?: string[];
  env?: Record<string, string>;
}

export function webTailBridgeCommand(options: WebTailBridgeOptions = {}): {
  command: string;
  args: string[];
  env: Record<string, string>;
} {
  return {
    command: options.command ?? process.env.WEB_TAIL_COMMAND ?? "web-tail",
    args: options.args ?? [],
    env: options.env ?? {}
  };
}
