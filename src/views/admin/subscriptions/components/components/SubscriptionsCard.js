/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { Card, Grid, Divider, Typography, CardContent, CardActions, Button } from '@material-ui/core'

import { AdminApi } from '../../../../../config/Api'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {},
	imageContainer: {
		width: 150,
		height: 150,
		display: 'flex',
		margin: '0 auto',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: theme.spacing(5)
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

const SubscriptionsCard = props => {
	const { className, subscription, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const onRemoveMembership = async () => {
		const removeResult = await adminApi.removeSubscriptions({
			adminId,
			subscriptionId: subscription._id
		})

		if (removeResult.error)
			return enqueueSnackbar(removeResult.message, { variant: 'error' })

		enqueueSnackbar(removeResult.message, { variant: 'success' })
		window.location.reload()
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardContent>
				<div className={classes.imageContainer}>
					<img
						alt='subscription'
						src={subscription.image}
						className={classes.image} />
				</div>

				<Typography
					variant='h2'
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
						<MoneyIcon className={classes.statsIcon} />

						<Typography
							variant='body1'
							display='inline'>
							{subscription.price}
						</Typography>
					</Grid>

					<Grid
						item
						className={classes.statsItem}>
						<Button
							color='secondary'
							variant='contained'
							onClick={onRemoveMembership}>
							REMOVE
						</Button>
					</Grid>

					<Grid
						item
						className={classes.statsItem}>
						<AccessTimeIcon className={classes.statsIcon} />

						<Typography
							variant='body2'
							display='inline'>
							{subscription.validity}
						</Typography>
					</Grid>
				</Grid>
			</CardActions>
		</Card >
	)
}

SubscriptionsCard.propTypes = {
	className: PropTypes.string,
	subscription: PropTypes.object.isRequired
}

export default SubscriptionsCard