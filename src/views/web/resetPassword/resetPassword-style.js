/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { makeStyles } from '@material-ui/core/styles'
import { fade, darken } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
	errorWrap: {
		width: '100%',
		minHeight: '90vh',
		display: 'flex',
		alignItems: 'center'
	},
	flex: {
		display: 'flex',
		justifyContent: 'center'
	},
	deco: {
		position: 'relative',
		[theme.breakpoints.down('md')]: {
			height: 320,
		},
		'& h3': {
			fontFamily: 'Roboto Condensed',
			color: theme.palette.primary.main,
			fontSize: 106,
			textTransform: 'capitalize',
			fontWeight: 700,
			paddingTop: 40,
			paddingLeft: 20,
			position: 'relative',
			zIndex: 1,
		},
		'&:before': {
			content: '"',
			width: 210,
			height: 220,
			background: theme.palette.primary.main,
			borderRadius: 24,
			transform: 'rotate(45deg)',
			position: 'absolute',
			top: theme.spacing(-1),
			left: 0,
		}
	},
	input: {
		width: '100%',
		'& label': {
			left: theme.spacing(0.5),
		},
		'& > div': {
			overflow: 'hidden',
			'& input, textarea': {
				paddingLeft: theme.spacing(2),
				'&:focus': {
					background: theme.palette.background.default
				},
			}
		},
		'&$light': {
			'& label': {
				color: theme.palette.common.white,
			},
			'& > div': {
				border: `1px solid ${fade(theme.palette.primary.light, 0.5)}`,
				'& input': {
					color: theme.palette.common.white,
					'&:focus': {
						background: fade(theme.palette.text.hint, 0.2)
					},
					'&:hover': {
						background: fade(theme.palette.text.hint, 0.2)
					}
				},
			}
		}
	},
	text: {
		borderLeft: `1px solid ${theme.palette.divider}`,
		[theme.breakpoints.up('md')]: {
			paddingLeft: theme.spacing(5),
		},
		[theme.breakpoints.down('md')]: {
			textAlign: 'center'
		},
		'& h4': {
			fontWeight: theme.typography.fontWeightBold,
			marginBottom: theme.spacing(4)
		},
		'& p': {
			fontSize: 22,
			color: theme.palette.text.secondary
		}
	},
	button: {
		marginTop: theme.spacing(4)
	}
}))

export default useStyles
