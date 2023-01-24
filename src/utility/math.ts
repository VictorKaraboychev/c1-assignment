
export const round = (value: number, decimals?: number) => {
	return Math.round(value * 10**(decimals || 0)) / 10**(decimals || 0)
}

export const countDecimals = (num: number) => {
    if (Math.floor(num.valueOf()) === num.valueOf()) return 0
    return num.toString().split('.')[1].length || 0
}
