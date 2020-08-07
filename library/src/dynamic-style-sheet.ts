import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { IndexedObject, ValueOf } from 'toolkit.ts'

import { DynamicValue, useDynamicValue } from './dynamic-value'
import { Mode } from './types'

declare const process: {
	env: {
		NODE_ENV: string
	}
}

type Style = ViewStyle | TextStyle | ImageStyle

type DynamicStyle<T extends Style> = { [Key in keyof T]: T[Key] | DynamicValue<T[Key]> }
type DynamicStyles<T> = { [P in keyof T]: DynamicStyle<Style> }

type NormalizeStyle<T> = T extends DynamicStyle<infer R> ? R : T
export type NormalizeStyles<T extends DynamicStyles<T>> = { [Key in keyof T]: NormalizeStyle<T[Key]> }

export type DynamicViewStyle = DynamicStyle<ViewStyle>
export type DynamicTextStyle = DynamicStyle<TextStyle>
export type DynamicImageStyle = DynamicStyle<ImageStyle>

function parseStylesFor<T extends DynamicStyles<T>>(styles: T, mode: Mode): NormalizeStyles<T> {
	const newStyles: IndexedObject<IndexedObject<ValueOf<ValueOf<T>>>> = {}

	let containsDynamicValues = false

	for (const i in styles) {
		const style = styles[i]
		type Value = ValueOf<ValueOf<T>>
		const newStyle: IndexedObject<Value> = {}
		for (const i in style) {
			const value = style[i]

			if (value instanceof DynamicValue) {
				containsDynamicValues = true
				newStyle[i] = value[mode]
			} else {
				newStyle[i] = value as Value
			}
		}
		newStyles[i] = newStyle
	}

	if (!containsDynamicValues && process.env.NODE_ENV !== 'production') {
		console.warn(
			'A DynamicStyleSheet was used without any DynamicValues. Consider replacing with a regular StyleSheet.',
		)
	}

	return (newStyles as unknown) as NormalizeStyles<T>
}

export class DynamicStyleSheet<T extends DynamicStyles<T>> {
	public readonly dark: NormalizeStyles<T>
	public readonly light: NormalizeStyles<T>

	constructor(styles: T) {
		this.dark = StyleSheet.create(parseStylesFor(styles, 'dark')) as NormalizeStyles<T>
		this.light = StyleSheet.create(parseStylesFor(styles, 'light')) as NormalizeStyles<T>
	}
}

export const useDynamicStyleSheet = useDynamicValue
