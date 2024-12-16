import { getBadges } from "@/actions/badges"
import { Badge } from "@prisma/client"
import { useEffect, useState } from "react"

export const useBadges = () => {
    const [badges, setBadges] = useState<Badge[]>([])
    useEffect(() => {
        const fetchBadges = async () => {
            const data = await getBadges()
            setBadges(data)
        }
        fetchBadges()
    }, [])

    return badges
}