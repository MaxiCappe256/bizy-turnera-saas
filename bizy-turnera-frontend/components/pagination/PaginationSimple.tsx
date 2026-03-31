import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

export function PaginationSimple({
  limit,
  offset,
  totalPages,
  query,
}: {
  limit: number;
  offset: number;
  totalPages: number;
  query?: Record<string, string | number | undefined>;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const activePage = Math.floor(offset / limit) + 1;

  function buildHref(nextOffset: number) {
    const params = new URLSearchParams();
    params.set("limit", String(limit));
    params.set("offset", String(nextOffset));

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined) continue;
        params.set(key, String(value));
      }
    }

    return `?${params.toString()}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={buildHref((page - 1) * limit)}
              isActive={page === activePage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
