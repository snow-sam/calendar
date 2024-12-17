"use server"

import db from "@/lib/db"


export const getBadges = async () => {
    const badges = await db.badge.findMany()
    return badges
}