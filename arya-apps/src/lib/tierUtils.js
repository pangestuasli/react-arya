/**
 * Tier utility functions for member loyalty system
 */

/**
 * Calculate tier based on points
 * @param {number} points
 * @returns {string} tier name
 */
export function calculateTier(points) {
    if (points >= 1000) return 'platinum'
    if (points >= 500) return 'gold'
    if (points >= 100) return 'silver'
    return 'bronze'
}

/**
 * Get discount percentage based on tier
 * @param {string} tier
 * @returns {number} discount percentage (e.g. 5 for 5%)
 */
export function calculateDiscount(tier) {
    const discounts = {
        bronze: 5,
        silver: 10,
        gold: 15,
        platinum: 20,
    }
    return discounts[tier] || 5
}

/**
 * Calculate points earned from a completed order
 * Every Rp 10.000 of final_amount = 1 point
 * @param {number} finalAmount
 * @returns {number} points earned
 */
export function calculatePointsEarned(finalAmount) {
    return Math.floor(finalAmount / 10000)
}
