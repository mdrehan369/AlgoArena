import { PrismaClient } from "@repo/db";

export class RunnerRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }


}
