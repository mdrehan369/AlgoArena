import { CustomTestCase, PrismaClient } from "@repo/db";

export class RunnerRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async generateCustomTestCases(customInputs: CustomTestCase[]) {
    try {
      await this.prisma.customTestCase.createMany({
        data: customInputs,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCustomTestCases(customInputs: CustomTestCase[]) {
    try {
      await this.prisma.customTestCase.deleteMany({
        where: {
          id: {
            in: customInputs.map((ip) => ip.id),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
