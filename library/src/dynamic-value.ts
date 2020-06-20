import { useColorSchemeContext } from './context'

export class DynamicValue<T> {
	constructor(public readonly light: T, public readonly dark: T) {}
}

export function useDynamicValue<T>(dynamic: DynamicValue<T>): T
export function useDynamicValue<T>(light: T, dark: T): T
export function useDynamicValue<T>(light: T | DynamicValue<T>, dark?: T): T {
	const mode = useColorSchemeContext()
	if (light instanceof DynamicValue) {
		return light[mode]
	} else {
		return mode === 'dark' ? dark! : light
	}
}
