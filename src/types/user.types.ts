import { Prisma } from "@prisma/client";

export interface CreateUserPayload {
    name: string;
    email: string;
    username: string;
    password: string;
    image: Prisma.ImageCreateInput
}
