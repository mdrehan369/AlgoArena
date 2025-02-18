"use server"

import { prismaClient } from "@/utils/prismaClient"
import { Topic } from "@prisma/client"


export const getAllProblems = async ({ topics, page=1, limit=10 }: { topics?: Topic[], page?: number, limit?: number }) => {
    if(page < 0 || limit < 0) {
        page = 1
        limit = 20
    }
    try {
        if(!topics?.length) return prismaClient.problem.findMany({
            skip: (page-1)*limit,
            take: limit
        })
    
        console.log(topics)
    
        return prismaClient.problem.findMany({
            where: {
                topics: {
                    hasSome: topics
                }
            },
            skip: (page-1)*limit,
            take: limit
        })
    } catch (error) {
        console.log(error)
        return null
    }
}