type searchResultMeta = {
  total: number;
  perPage: number;
  currentPage: number;
  pageCount: number;
};

export class SearchResult<E> {
  constructor(readonly items: E[], readonly meta: searchResultMeta) {
    this.items = items;
    this.meta = meta;
  }
}
