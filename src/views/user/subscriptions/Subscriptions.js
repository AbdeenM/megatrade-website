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
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'

import SubscriptionsCard from './components/SubscriptionsCard'
import { UserApi, MiscellaneousApi } from '../../../config/Api'

const userApi = new UserApi()
const miscellaneousApi = new MiscellaneousApi()

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

	const [showFreeDialog, setShowFreeDialog] = useState(false)
	const [subscriptionsState, setSubscriptionsState] = useState([])
	const [showPaymentDialog, setShowPaymentDialog] = useState(false)
	const [userMembershipState, setUserMembershipState] = useState('')
	const [userSubscriptionIdState, setUserSubscriptionIdState] = useState('')
	const [membershipSelectedState, setMembershipSelectedState] = useState({
		price: '',
		planId: ''
	})

	useEffect(() => { fetchSubscriptions() }, [])

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await userApi.fetchSubscriptions({ userId })
		if (fetchSubscriptionsResult.error)
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })

		setSubscriptionsState(fetchSubscriptionsResult.data.subscriptions)
		setUserMembershipState(fetchSubscriptionsResult.data.userMembership)
		setUserSubscriptionIdState(fetchSubscriptionsResult.data.userSubscriptionId)
	}

	const onGetMembership = membership => {
		if (membership.title === 'Free Membership') {
			setShowFreeDialog(true)
		} else {
			setMembershipSelectedState({
				price: membership.price,
				planId: membership.planId
			})

			setShowPaymentDialog(true)
		}
	}

	const onSuccessPayment = (details, actions) => {
		actions.subscription.get().then(async (data, action) => {
			enqueueSnackbar('Your payment and subscription completed successfully', { variant: 'success' })

			const createSubscriptionResult = await userApi.createSubscription({
				userId,
				planId: data.plan_id,
				orderId: details.orderID,
				startTime: data.start_time,
				subscriptionId: details.subscriptionID,
				nextBilling: data.billing_info.next_billing_time
			})

			if (createSubscriptionResult.error)
				enqueueSnackbar(createSubscriptionResult.message, { variant: 'error' })

			enqueueSnackbar(createSubscriptionResult.message, { variant: 'success' })
			window.location.reload()
		})
	}

	const onCancelSubscription = async () => {
		await miscellaneousApi.paypalCancelSubscription(userSubscriptionIdState)
		enqueueSnackbar('Your paypal subscription has been cancelled successfully', { variant: 'success' })

		const cancelSubscriptionResult = await userApi.cancelSubscription({ userId })

		if (cancelSubscriptionResult.error)
			enqueueSnackbar(cancelSubscriptionResult.message, { variant: 'error' })

		enqueueSnackbar(cancelSubscriptionResult.message, { variant: 'success' })
		window.location.reload()
	}

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
						createSubscription={(data, actions) => actions.subscription.create({ plan_id: membershipSelectedState.planId })}
						onCancel={() => enqueueSnackbar('Your payment attempt to the memebership has been cancelled', { variant: 'info' })}
						options={{ vault: true, clientId: 'AUqdMKQ9m1Mg5jz05jo1DL-j8vVPrzXOH7G_LgirWrADGRRJHgq__AMqLNpWhVBnZtGhJRUuf_mSQsoB' }} />
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