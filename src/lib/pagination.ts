/**
 * Cursor-based pagination utility for efficient large dataset navigation
 * @module lib/pagination
 */

/**
 * Cursor pagination parameters
 */
export interface CursorPaginationParams {
  /** Cursor for the next page (usually last item's ID) */
  cursor?: string | null;
  /** Number of items per page */
  limit?: number;
  /** Sort direction */
  direction?: "asc" | "desc";
}

/**
 * Cursor pagination result
 */
export interface CursorPaginationResult<T> {
  /** Array of items */
  items: T[];
  /** Cursor for the next page (null if no more pages) */
  nextCursor: string | null;
  /** Whether there are more items */
  hasMore: boolean;
  /** Total count (optional, expensive for large datasets) */
  totalCount?: number;
}

/**
 * Default pagination limits
 */
export const PAGINATION_DEFAULTS = {
  /** Default items per page */
  DEFAULT_LIMIT: 10,
  /** Maximum allowed items per page */
  MAX_LIMIT: 100,
  /** Minimum allowed items per page */
  MIN_LIMIT: 1,
} as const;

/**
 * Validates and normalizes limit parameter
 * @param limit - Requested limit
 * @returns Normalized limit within bounds
 * @example
 * normalizeLimit(undefined) // 10 (default)
 * normalizeLimit(500) // 100 (max)
 * normalizeLimit(-5) // 1 (min)
 */
export function normalizeLimit(limit?: number): number {
  if (!limit || limit < PAGINATION_DEFAULTS.MIN_LIMIT) {
    return PAGINATION_DEFAULTS.DEFAULT_LIMIT;
  }
  if (limit > PAGINATION_DEFAULTS.MAX_LIMIT) {
    return PAGINATION_DEFAULTS.MAX_LIMIT;
  }
  return limit;
}

/**
 * Creates Prisma cursor pagination arguments
 * @param params - Cursor pagination parameters
 * @returns Prisma-compatible pagination args
 * @example
 * const paginationArgs = createCursorArgs({ cursor: "abc123", limit: 20 });
 * const items = await prisma.booking.findMany({
 *   ...paginationArgs,
 *   where: { ... }
 * });
 */
export function createCursorArgs<IdField extends string = "id">(
  params: CursorPaginationParams,
  idField: IdField = "id" as IdField
): {
  take: number;
  skip?: number;
  cursor?: { [K in IdField]: string };
  orderBy: { [K in IdField]: "asc" | "desc" };
} {
  const limit = normalizeLimit(params.limit);
  const direction = params.direction || "desc";

  // Take one extra to check if there are more items
  const take = limit + 1;

  const result: {
    take: number;
    skip?: number;
    cursor?: { [K in IdField]: string };
    orderBy: { [K in IdField]: "asc" | "desc" };
  } = {
    take,
    orderBy: { [idField]: direction } as { [K in IdField]: "asc" | "desc" },
  };

  if (params.cursor) {
    result.cursor = { [idField]: params.cursor } as { [K in IdField]: string };
    result.skip = 1; // Skip the cursor item itself
  }

  return result;
}

/**
 * Processes query results into cursor pagination response
 * @param items - Query results (should have limit+1 items if more exist)
 * @param limit - Original limit
 * @param getItemId - Function to extract ID from item
 * @returns Formatted pagination result
 * @example
 * const items = await prisma.booking.findMany({ take: limit + 1, ... });
 * const result = processCursorResult(items, limit, (item) => item.id);
 */
export function processCursorResult<T>(
  items: T[],
  limit: number,
  getItemId: (item: T) => string
): CursorPaginationResult<T> {
  const normalizedLimit = normalizeLimit(limit);
  const hasMore = items.length > normalizedLimit;

  // Remove the extra item we fetched to check for more
  const paginatedItems = hasMore ? items.slice(0, normalizedLimit) : items;

  // Get cursor from last item
  const lastItem = paginatedItems[paginatedItems.length - 1];
  const nextCursor = hasMore && lastItem ? getItemId(lastItem) : null;

  return {
    items: paginatedItems,
    nextCursor,
    hasMore,
  };
}

/**
 * Parses cursor from URL search params
 * @param searchParams - URL search params
 * @returns Parsed cursor pagination params
 */
export function parseCursorParams(
  searchParams: URLSearchParams
): CursorPaginationParams {
  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");
  const direction = searchParams.get("direction");

  return {
    cursor: cursor || null,
    limit: limit ? parseInt(limit, 10) : undefined,
    direction: direction === "asc" ? "asc" : "desc",
  };
}
