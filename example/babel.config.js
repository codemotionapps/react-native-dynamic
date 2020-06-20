module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				alias: {
					'react-native-dynamic': '../library/src',
					react: './node_modules/react',
					'react-native': './node_modules/react-native',
				},
			},
		],
	],
}
