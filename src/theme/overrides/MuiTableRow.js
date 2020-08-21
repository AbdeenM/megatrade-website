import Palette from '../Palette'

export default {
	root: {
		'&$selected': {
			backgroundColor: Palette.background.default
		},
		'&$hover': {
			'&:hover': {
				backgroundColor: Palette.background.default
			}
		}
	}
}