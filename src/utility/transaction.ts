import { MerchantType, TransactionItemType } from "../types/transaction"
import testTransactions from '../data/data.json'
import { PROMOTIONS } from "../config/promotions"

export const TEST_TRANSACTIONS = testTransactions as TransactionItemType[]

export const getPoints = (transactions: TransactionItemType[]) => {
	let points = 0
	let promotions: { [key: string]: number } = {}
	const merchants: MerchantType = {}

	// Sum up all the transactions for each merchant
	transactions.forEach((transaction) => {
		const { amount_cents, merchant_code } = transaction
		merchants[merchant_code] = amount_cents + (merchants[merchant_code] ?? 0)
	})

	// Calculate points for each promotion
	while (true) {
		let promotionFound = false

		// Check each promotion
		for (const promotion of PROMOTIONS) {
			if (promotion.merchants.every(({ merchant_code, amount_cents }) => merchants[merchant_code] >= amount_cents)) {
				promotionFound = true
				points += promotion.points
				promotion.merchants.forEach(({ merchant_code, amount_cents }) => {
					merchants[merchant_code] -= amount_cents
				})
				promotions[promotion.id] = (promotions[promotion.id] ?? 0) + 1
				break
			}
		}

		// If no promotion was found, calculate excess points for each merchant
		if (!promotionFound) {
			let remainingPoints = 0
			for (const merchant in merchants) {
				const p = Math.floor(merchants[merchant] / 100)
				remainingPoints += p
				points += p
			}
			promotions[7] = remainingPoints
			break
		}
	}

	return { points, promotions }
}

