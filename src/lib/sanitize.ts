// ============================================
// HTML SANITIZER
// Sanitize user input to prevent XSS attacks
// ============================================

/**
 * Basic HTML entities to escape
 */
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(input: string): string {
  return input.replace(/[&<>"'`=\/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Strip all HTML tags from input
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/**
 * Sanitize content for safe storage
 * - Strips dangerous HTML tags (script, style, iframe, etc.)
 * - Keeps basic text formatting
 */
export function sanitizeContent(input: string): string {
  // Remove dangerous tags completely
  const dangerousTags = [
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "form",
    "input",
    "button",
    "link",
    "meta",
    "base",
  ];

  let sanitized = input;

  // Remove dangerous tags and their content
  for (const tag of dangerousTags) {
    const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, "gis");
    sanitized = sanitized.replace(regex, "");
    // Also remove self-closing versions
    const selfClosing = new RegExp(`<${tag}[^>]*\\/?>`, "gi");
    sanitized = sanitized.replace(selfClosing, "");
  }

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "");

  // Remove javascript: and data: URLs
  sanitized = sanitized.replace(/javascript:/gi, "");
  sanitized = sanitized.replace(/data:/gi, "");
  sanitized = sanitized.replace(/vbscript:/gi, "");

  return sanitized.trim();
}

/**
 * Sanitize plain text input (for names, subjects, etc.)
 */
export function sanitizeText(input: string): string {
  return stripHtml(input).trim();
}

/**
 * Sanitize message/content that may contain basic formatting
 */
export function sanitizeMessage(input: string): string {
  return sanitizeContent(input);
}
