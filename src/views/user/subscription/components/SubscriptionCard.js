/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import GetAppIcon from '@material-ui/icons/GetApp'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import {
	Card,
	Grid,
	Divider,
	Typography,
	CardContent,
	CardActions
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {},
	imageContainer: {
		width: 64,
		height: 64,
		display: 'flex',
		margin: '0 auto',
		overflow: 'hidden',
		borderRadius: '5px',
		alignItems: 'center',
		justifyContent: 'center',
		border: `1px solid ${theme.palette.divider}`
	},
	image: {
		width: '100%'
	},
	statsItem: {
		display: 'flex',
		alignItems: 'center'
	},
	statsIcon: {
		color: theme.palette.icon,
		marginRight: theme.spacing(1)
	}
}))

const SubscriptionCard = props => {
	const { className, subscription, ...rest } = props

	const classes = useStyles()

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardContent>
				<div className={classes.imageContainer}>
					<img
						alt='Subscription'
						className={classes.image}
						src={subscription.imageUrl} />
				</div>

				<Typography
					variant='h4'
					gutterBottom
					align='center'>
					{subscription.title}
				</Typography>

				<Typography
					align='center'
					variant='body1'>
					{subscription.description}
				</Typography>
			</CardContent>

			<Divider />

			<CardActions>
				<Grid
					container
					justify='space-between'>
					<Grid
						item
						className={classes.statsItem}>
						<AccessTimeIcon className={classes.statsIcon} />

						<Typography
							variant='body2'
							display='inline'>
							Updated 2hr ago
            			</Typography>
					</Grid>

					<Grid
						item
						className={classes.statsItem}>
						<GetAppIcon className={classes.statsIcon} />

						<Typography
							variant='body2'
							display='inline'>
							{subscription.totalDownloads} Downloads
            			</Typography>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	)
}

SubscriptionCard.propTypes = {
	className: PropTypes.string,
	subscription: PropTypes.object.isRequired
}

export default SubscriptionCard