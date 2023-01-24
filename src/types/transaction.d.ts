export type TransactionItemType = {
	date: string
	merchant_code: string
	amount_cents: number
}

export type MerchantType = {
	[merchant_code: string]: number
}