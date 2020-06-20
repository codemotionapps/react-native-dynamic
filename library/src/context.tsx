import React, { createContext, useContext, ReactNode } from 'react'
import { useColorScheme } from 'react-native'

import { Mode } from './types'

type ContextType = ReturnType<typeof useColorScheme>
export const ColorSchemeContext = createContext<ContextType>(null)
ColorSchemeContext.displayName = 'ColorSchemeContext'

export const DarkModeContext = ColorSchemeContext

interface IProps {
	mode?: Mode
	children: ReactNode
}

export function ColorSchemeProvider({ children, mode }: IProps) {
	const currentMode = useColorScheme()
	return <ColorSchemeContext.Provider value={mode || currentMode || 'light'}>{children}</ColorSchemeContext.Provider>
}

export const DarkModeProvider = ColorSchemeProvider

export function useColorSchemeContext(): Mode {
	const context = useContext(ColorSchemeContext)

	if (context) return context

	return useColorScheme() || 'light'
}

export const useDarkModeContext = useColorSchemeContext
