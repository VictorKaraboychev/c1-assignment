export const contrast = (color: string) => {
	const rgb = color.replace(/^#/, '').match(/.{2}/g)?.map((x) => parseInt(x, 16)) ?? [0, 0, 0]
	const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
	return yiq >= 128 ? '#000000' : '#ffffff'
}

export const stringToColor = (string = '') => {
	let hash = 0
	let i

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash)
	}

	let color = '#'

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff
		color += `00${value.toString(16)}`.slice(-2)
	}

	return color
}