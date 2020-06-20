import { useColorSchemeContext } from './context'

export function useDarkMode() {
	return useColorSchemeContext() === 'dark'
}
