import { PrismaClient } from "@prisma/client";
import { SearchParams } from "../../../domain";

export class BasePrismaRepository {
  protected prisma = new PrismaClient();

  protected toPagintationParams(params: SearchParams<any, any>) {
    return {
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      orderBy: { [params.order.field]: params.order.direction },
    };
  }

  protected getPaginationMeta(
    params: SearchParams<any, any>,
    totalCount: number
  ) {
    return {
      total: totalCount,
      pageCount: Math.ceil(totalCount / params.limit),
      currentPage: params.page,
      perPage: params.limit,
    };
  }
}
