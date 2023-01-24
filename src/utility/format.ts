
export const fCurrency = (value: number, currency?: string) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency ?? 'USD',
	}).format(value)
}

export const fDate = (date: Date) => {
	return date.toLocaleString(undefined, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
}