export function toConsistentCase(str) {
	if (str.length) {
		const source = str.slice(-1)
		return convertToCase(str, source)
	}
	else {
		return ''
	}
}

export function convertToCase(value, source) {
	const isLower = source.length ? isLowerCase(source.slice(-1)) : false
	return isLower ? value.toLowerCase() : value.toUpperCase()
}

export function isLowerCase(str) {
	return str === str.toLowerCase()
}