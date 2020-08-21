import React from 'react'
import PropTypes from 'prop-types'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, CardActions, TextField, InputAdornment, IconButton, Paper, colors } from '@material-ui/core'

import ComingSoon from './ComingSoon'

const useStyles = makeStyles(theme => ({
	root: {},
	paperUpgrade: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: window.innerHeight * 0.7,
		backgroundColor: theme.palette.background.default
	},
	paper: {
		width: '100%',
		height: window.innerHeight * 0.7,
		backgroundColor: theme.palette.background.default
	},
	content: {
		width: '100%',
		padding: '2%',
		overflow: 'auto',
		position: 'relative',
		maxHeight: window.innerHeight * 0.7
	},
	avatar: {
		marginRight: theme.spacing(2),
		backgroundColor: colors.blue[500]
	}
}))

const SupportLive = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<Card
			{...rest}
			className={classes.root}>
			<CardContent>
				<Paper className={classes.paperUpgrade}>
					<ComingSoon />
				</Paper>
			</CardContent>

			<CardActions>
				<TextField
					disabled
					fullWidth
					name='message'
					label='Message'
					margin='normal'
					variant='outlined'
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton
								disabled
								edge='end'
								color='primary'>
								<SendIcon />
							</IconButton>
						</InputAdornment>
					}} />
			</CardActions>
		</Card>
	)
}

SupportLive.propTypes = {
	className: PropTypes.string
}

export default SupportLive