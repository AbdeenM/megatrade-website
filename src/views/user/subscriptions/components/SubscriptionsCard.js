/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import MoneyIcon from '@material-ui/icons/AttachMoney'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { Card, Grid, Divider, Typography, CardContent, CardActions, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core'

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
	const { className, subscription, onGetMembership, onCancelSubscription, ...rest } = props

	const classes = useStyles()

	const [showCancelDialog, setCancelDialog] = useState(false)

	return (
		<div>
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
							{
								props.membership === subscription.title
									? <Button
										color='secondary'
										variant='contained'
										onClick={() => setCancelDialog(true)}
										disabled={props.membership === 'Free Membership'}>
										{props.membership === 'Free Membership' ? 'CURRENT MEMBERSHIP' : 'CANCEL MEMBERSHIP'}
									</Button>
									: <Button
										color='primary'
										variant='contained'
										onClick={onGetMembership}>
										GET MEMBERSHIP
								</Button>
							}
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
			</Card>

			<Dialog
				open={showCancelDialog}
				onClose={() => setCancelDialog(false)}>
				<DialogTitle>Are you sure you want cancel your current membership?</DialogTitle>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setCancelDialog(false)}>
						NO
					</Button>

					<Button
						color='primary'
						variant='contained'
						onClick={() => {
							onCancelSubscription()
							setCancelDialog(false)
						}}>
						YES
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

SubscriptionsCard.propTypes = {
	className: PropTypes.string,
	subscription: PropTypes.object.isRequired
}

export default SubscriptionsCard