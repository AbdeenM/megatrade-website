import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import PeopleIcon from '@material-ui/icons/PeopleOutlined'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%'
	},
	content: {
		display: 'flex',
		alignItems: 'center'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		width: 56,
		height: 56,
		backgroundColor: theme.palette.success.main
	},
	icon: {
		height: 32,
		width: 32
	}
}))

const TotalUsers = props => {
	const { className, users, ...rest } = props

	const classes = useStyles()

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardContent>
				<Grid
					container
					justify='space-between'>
					<Grid item>
						<Typography
							gutterBottom
							variant='body2'
							color='textSecondary'
							className={classes.title}>
							TOTAL USERS
            			</Typography>

						<Typography variant='h3'>{users}</Typography>
					</Grid>

					<Grid item>
						<Avatar className={classes.avatar}>
							<PeopleIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

TotalUsers.propTypes = {
	className: PropTypes.string
}

export default TotalUsers