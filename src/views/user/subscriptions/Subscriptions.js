/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@material-ui/core'

import { UserApi } from 'config/Api'
import SubscriptionsCard from './components/SubscriptionsCard'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	row: {
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1)
	},
	content: {
		marginTop: theme.spacing(2)
	},
	dialog: {
		width: 'auto',
		height: 'auto'
	}
}))

const SubscriptionsList = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [isLoading, setIsLoading] = useState(true)
	const [showFreeDialog, setShowFreeDialog] = useState(false)
	const [subscriptionsState, setSubscriptionsState] = useState([])
	const [showPaymentDialog, setShowPaymentDialog] = useState(false)
	const [userMembershipState, setUserMembershipState] = useState('')
	const [subscriptionIdState, setSubscriptionIdState] = useState('')

	useEffect(() => { fetchSubscriptions() }, [])

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await userApi.fetchSubscriptions({ userId })
		if (fetchSubscriptionsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })
		}

		setSubscriptionsState(fetchSubscriptionsResult.data.subscriptions)
		setUserMembershipState(fetchSubscriptionsResult.data.userMembership)

		setIsLoading(false)
	}

	const onGetMembership = async membership => {
		if (membership.title === 'Free Membership') {
			setShowFreeDialog(true)
		} else {
			setSubscriptionIdState({
				price: membership.price,
				planId: membership.planId
			})

			setShowPaymentDialog(true)
		}
	}

	const onSuccessPayment = (details, actions) => {
		actions.subscription.get().then(async (data, action) => {
			enqueueSnackbar('Your payment and subscription completed successfully', { variant: 'success' })

			setIsLoading(true)
			const createSubscriptionResult = await userApi.createSubscription({
				userId,
				planId: data.plan_id,
				orderId: details.orderID,
				startTime: data.start_time,
				subscriptionId: details.subscriptionID,
				nextBilling: data.billing_info.next_billing_time
			})

			if (createSubscriptionResult.error) {
				setIsLoading(false)
				enqueueSnackbar(createSubscriptionResult.message, { variant: 'error' })
			} else {
				setIsLoading(false)
				setShowPaymentDialog(false)
				enqueueSnackbar(createSubscriptionResult.message, { variant: 'success' })
				window.location.reload()
			}
		})
	}

	const onCancelSubscription = async () => {
		setIsLoading(true)
		const cancelSubscriptionResult = await userApi.cancelSubscription({ userId })
		if (cancelSubscriptionResult.error) {
			setIsLoading(false)
			enqueueSnackbar(cancelSubscriptionResult.message, { variant: 'error' })
		} else {
			setIsLoading(false)
			setShowPaymentDialog(false)
			enqueueSnackbar(cancelSubscriptionResult.message, { variant: 'success' })
			window.location.reload()
		}
	}

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<Grid
					container
					spacing={3}>
					{
						subscriptionsState.map((subscription, i) => (
							<Grid
								item
								lg={4}
								md={6}
								xs={12}
								key={i}>
								<SubscriptionsCard
									subscription={subscription}
									membership={userMembershipState}
									onCancelSubscription={onCancelSubscription}
									onGetMembership={() => onGetMembership(subscription)} />
							</Grid>
						))
					}
				</Grid>
			</div>

			<Dialog
				open={showPaymentDialog}
				onClose={() => setShowPaymentDialog(false)}>
				<DialogTitle>Choose a payment method</DialogTitle>

				<DialogContent className={classes.dialog}>
					<PayPalButton
						onApprove={(data, actions) => onSuccessPayment(data, actions)}
						onError={(error) => enqueueSnackbar(error, { variant: 'error' })}
						catchError={(error) => enqueueSnackbar(error, { variant: 'error' })}
						createSubscription={(data, actions) => actions.subscription.create({ plan_id: subscriptionIdState })}
						onCancel={() => enqueueSnackbar('Your payment attempt to the memebership has been cancelled', { variant: 'info' })}
						options={{ vault: true, clientId: 'AbdyiURLOyYae9UpkDC0VETP2_tEe9LdoIaHCfKMq67pPMrGYmd0qEsEe4kiMqYsabAACETo9bJWWWhJ' }} />
				</DialogContent>
			</Dialog>

			<Dialog
				open={showFreeDialog}
				onClose={() => setShowFreeDialog(false)}>
				<DialogTitle>Are you sure you want opt to the free membership?</DialogTitle>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setShowFreeDialog(false)}>
						NO
					</Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCancelSubscription}>
						YES
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default SubscriptionsList