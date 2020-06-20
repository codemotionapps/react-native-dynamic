import { useColorSchemeContext } from './context'

interface IDynamicValue<T> {
	light: T
	dark: T
}

export class DynamicValue<T> implements IDynamicValue<T> {
	constructor(public readonly light: T, public readonly dark: T) {}
}

export function useDynamicValue<T>(dynamic: IDynamicValue<T>): T
export function useDynamicValue<T>(light: T, dark: T): T
export function useDynamicValue<T>(light: T | IDynamicValue<T>, dark?: T): T {
	const mode = useColorSchemeContext()
	if (arguments.length > 1) {
		return mode === 'dark' ? dark! : (light as T)
	} else {
		return (light as IDynamicValue<T>)[mode]
	}
}
