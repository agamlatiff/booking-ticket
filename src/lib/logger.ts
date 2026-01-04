// ============================================
// LOGGER UTILITY
// ============================================

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Get minimum log level from env (default: info in production, debug in dev)
const MIN_LOG_LEVEL =
  (process.env.LOG_LEVEL as LogLevel) ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

const minLevel = LOG_LEVELS[MIN_LOG_LEVEL] || 1;

/**
 * Format log message with timestamp and context
 */
function formatLog(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

/**
 * Logger utility with levels
 */
export const logger = {
  debug(message: string, context?: LogContext) {
    if (LOG_LEVELS.debug >= minLevel) {
      console.log(formatLog("debug", message, context));
    }
  },

  info(message: string, context?: LogContext) {
    if (LOG_LEVELS.info >= minLevel) {
      console.log(formatLog("info", message, context));
    }
  },

  warn(message: string, context?: LogContext) {
    if (LOG_LEVELS.warn >= minLevel) {
      console.warn(formatLog("warn", message, context));
    }
  },

  error(message: string, error?: unknown, context?: LogContext) {
    if (LOG_LEVELS.error >= minLevel) {
      const errorContext = {
        ...context,
        ...(error instanceof Error && {
          errorName: error.name,
          errorMessage: error.message,
          stack: error.stack?.split("\n").slice(0, 3).join("\n"),
        }),
      };
      console.error(formatLog("error", message, errorContext));
    }
  },

  /**
   * Log API request (useful for debugging)
   */
  api(method: string, path: string, status: number, durationMs?: number) {
    this.info(`${method} ${path} → ${status}`, { durationMs });
  },

  /**
   * Log database query (for development)
   */
  query(query: string, durationMs?: number) {
    this.debug(`DB Query: ${query.substring(0, 100)}...`, { durationMs });
  },
};

export default logger;
