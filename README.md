# react-native-dynamic

[![npm version](https://img.shields.io/npm/v/react-native-dynamic.svg)](https://www.npmjs.com/package/react-native-dynamic)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<p align="center"><img src="https://raw.githubusercontent.com/codemotionapps/react-native-dynamic/master/showcase.ios.gif" alt="Showcase iOS" width="200" height="433">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://raw.githubusercontent.com/codemotionapps/react-native-dynamic/master/showcase.android.gif" alt="Showcase Android" width="234" height="433"></p>

## Installation

```sh
npm install react-native-dynamic
```

## Usage

### `useDarkMode`

Returns a boolean. `true` when dark mode is on.

```javascript
import { useDarkMode } from 'react-native-dynamic'

function Component() {
	const isDarkMode = useDarkMode()
	return <View style={{ backgroundColor: isDarkMode ? 'black' : 'white' }} />
}
```

### `DynamicValue`

A helper class meant to be used with [`DynamicStyleSheet`](#DynamicStyleSheet) and [`useDynamicValue`](#useDynamicValue). The first argument is the value to be used with a light color scheme, the second argument is the value to be used with a dark color scheme.

```javascript
import { DynamicValue } from 'react-native-dynamic'

const backgroundColor = new DynamicValue('white', 'black')
```

### `DynamicStyleSheet`

Just like [`StyleSheet`](https://reactnative.dev/docs/stylesheet) but with support for dynamic values.

```javascript
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic'

const dynamicStyles = new DynamicStyleSheet({
	container: {
		backgroundColor: new DynamicValue('white', 'black'),
		flex: 1,
	},
	text: {
		color: new DynamicValue('black', 'white'),
		textAlign: 'center',
	},
})

function Component() {
	const styles = useDynamicValue(dynamicStyles)

	return (
		<View style={styles.container}>
			<Text style={styles.text}>My text</Text>
		</View>
	)
}
```

### `ColorSchemeProvider`

Allows you to set a specific mode for children.

```javascript
import { ColorSchemeProvider } from 'react-native-dynamic'

function MyScreen() {
	return (
		<>
			{/* will be rendered using dark theme */}
			<ColorSchemeProvider mode="dark">
				<Component />
			</ColorSchemeProvider>

			{/* will be rendered using light theme */}
			<ColorSchemeProvider mode="light">
				<Component />
			</ColorSchemeProvider>

			{/* will be rendered using current theme */}
			<Component />
		</>
	)
}
```

It is recommended to wrap your application in a `ColorSchemeProvider` without a `mode` prop to observe a performance improvement.

```javascript
function App() {
	return (
		<ColorSchemeProvider>
			{/* ... */}
		</ColorSchemeProvider>
	)
}
```

### `useDynamicValue`

Returns the appropriate value depending on the theme. You can either pass a `DynamicValue`, an object containing `dark` and `light` properties, or just two arguments.

```javascript
import { DynamicValue, useDynamicValue } from 'react-native-dynamic'
const lightLogo = require('./light.png')
const darkLogo = require('./dark.png')
const logoUri = new DynamicValue(lightLogo, darkLogo)

function Logo() {
	const source = useDynamicValue(logoUri)
	return <Image source={source} />
}
```

```javascript
import { useDynamicValue } from 'react-native-dynamic'

function Input() {
	const placeholderColor = useDynamicValue('black', 'white')
	return <TextInput placeholderTextColor={placeholderColor} />
}
```

```javascript
import { useDynamicValue } from 'react-native-dynamic'

const datePickerConfig = {
	light: {
		backgroundColor: 'white',
		color: 'black',
	},
	dark: {
		backgroundColor: 'black',
		color: 'white',
	},
}

function CustomDatePicker() {
	const config = useDynamicValue(datePickerConfig)
	return <DatePicker config={config} />
}
```

### `useColorSchemeContext`

Returns `dark` or `light` but reads value from context.

```javascript
import { useColorSchemeContext } from 'react-native-dynamic'

const backgroundColors = {
	light: 'white',
	dark: 'black',
}

function Component() {
	const mode = useColorSchemeContext()
	const backgroundColor = backgroundColors[mode]
	return <View style={{ backgroundColor }} />
}
```

## Requirements

- React Native 0.62
