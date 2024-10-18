type Filter = Record<string, string | boolean | number | null | undefined>;

type OrderDirection = "asc" | "desc";

type Order<Field extends string> = {
  field: "createdAt" | Field;
  direction: OrderDirection;
};

export class SearchParams<F extends Filter, O extends string = "createdAt "> {
  readonly page: number;
  readonly limit: number;
  readonly filter: F;
  readonly order: Order<O>;

  constructor(props: Partial<SearchParams<F, O>> = {}) {
    this.page = props.page || 1;
    this.limit = props.limit || 15;
    this.filter = props.filter as F;
    this.order =
      props.order || ({ field: "createdAt", direction: "desc" } as Order<O>);
  }
}
