/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import MoneyIcon from '@material-ui/icons/Money'
import { makeStyles } from '@material-ui/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
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
		backgroundColor: theme.palette.error.main
	},
	icon: {
		width: 32,
		height: 32
	},
	difference: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(2)
	},
	differenceIcon: {
		color: theme.palette.error.dark
	},
	differenceValue: {
		marginRight: theme.spacing(1),
		color: theme.palette.error.dark
	}
}))

const Budget = props => {
	const { className, ...rest } = props

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
							BUDGET
            			</Typography>

						<Typography variant='h3'>$24,000</Typography>
					</Grid>

					<Grid item>
						<Avatar className={classes.avatar}>
							<MoneyIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>

				<div className={classes.difference}>
					<ArrowDownwardIcon className={classes.differenceIcon} />
					<Typography
						variant='body2'
						className={classes.differenceValue}>
						12%
          			</Typography>

					<Typography
						variant='caption'
						className={classes.caption}>
						Since last month
          			</Typography>
				</div>
			</CardContent>
		</Card>
	)
}

Budget.propTypes = {
	className: PropTypes.string
}

export default Budget