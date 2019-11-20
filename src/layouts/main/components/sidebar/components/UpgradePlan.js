/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Typography, Button, colors } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: colors.grey[50]
	},
	media: {
		height: 80,
		textAlign: 'center',
		paddingTop: theme.spacing(2),
		'& > img': {
			width: 'auto',
			height: '100%'
		}
	},
	content: {
		padding: theme.spacing(1, 2)
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(1, 2)
	}
}))

const UpgradePlan = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<div className={classes.media}>
				<img
					alt='Upgrade from FREE'
					src='/images/upgrade.svg' />
			</div>

			<div className={classes.content}>
				<Typography
					variant='h6'
					gutterBottom
					align='center'>
					Upgrade Subscription
        		</Typography>

				<Typography
					align='center'
					variant='body2'>
					Upgrade your Subscription to recieve all signals
        		</Typography>
			</div>

			<div className={classes.actions}>
				<Button
					color='primary'
					component={Link}
					to='/subscription'
					variant='contained'>
					Upgrade
        		</Button>
			</div>
		</div>
	)
}

UpgradePlan.propTypes = {
	className: PropTypes.string
}

export default UpgradePlan