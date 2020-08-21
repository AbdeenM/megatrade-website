import { makeStyles } from '@material-ui/core/styles'

const subscribeStyles = makeStyles(theme => ({
	subscribeWrap: {
		maxWidth: 600,
		margin: theme.spacing(0, 2),
		[theme.breakpoints.up('md')]: {
			margin: '0 auto -32px',
		},
		zIndex: 10,
		position: 'relative'
	},
	paper: {
		padding: theme.spacing(4)
	},
	textField: {
		marginTop: theme.spacing(3)
	},
	rightIcon: {
		marginLeft: theme.spacing(2)
	}
}))

export default subscribeStyles
