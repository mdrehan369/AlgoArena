import { PrismaClient } from "../generated/prisma/index.js";
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const prisma: PrismaClient<import("./index.js").Prisma.PrismaClientOptions, never, import("../generated/prisma/runtime/library.js").DefaultArgs>;
