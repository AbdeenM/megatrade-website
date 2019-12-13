/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import { Grid, Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

import { UserApi } from '../../../config/Api'
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
		width: 500,
		height: '100%'
	}
}))

const SubscriptionsList = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [subscriptionsState, setSubscriptionsState] = useState([])
	const [showPaymentDialog, setShowPaymentDialog] = useState(false)
	const [userMembershipState, setUserMembershipState] = useState('')
	const [membershipSelectedState, setMembershipSelectedState] = useState({
		price: '',
		planId: ''
	})

	useEffect(() => { fetchSubscriptions() }, [])

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await userApi.fetchSubscriptions({ userId })
		if (fetchSubscriptionsResult.error)
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })

		setUserMembershipState(fetchSubscriptionsResult.data.userMembership)
		setSubscriptionsState(fetchSubscriptionsResult.data.subscriptions)

		console.log('============================ SUBSCRIPTIONS ============================')
		console.log(fetchSubscriptionsResult.data.subscriptions)
	}

	const onGetMembership = membership => {
		setMembershipSelectedState({
			price: membership.price,
			planId: membership.planId
		})

		setShowPaymentDialog(true)
	}

	const onSuccessPayment = (details, actions) => {
		console.log('============================== SUCCESS PAYMENT FIRST DETAILS ==========================')
		console.log(details)

		return actions.subscription.get().then(async (data, details) => {
			enqueueSnackbar('Your payment and subscription completed successfully', { variant: 'success' })


			console.log('============================== SUCCESS PAYMENT DATA ==========================')
			console.log(data)

			console.log('============================== SUCCESS PAYMENT DETAILS ==========================')
			console.log(details)
		})
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
						options={{ vault: true, clientId: 'Aa2rJcWmC_XykxcxM05acV61xmdV_g3Iqtjv2MiOAXKOi74Ynl1VtSMh0e9tLmWyEU-4ZVnGY1b875lX' }}
						onApprove={(data, actions) => onSuccessPayment(data, actions)}
						onError={(error) => enqueueSnackbar(error, { variant: 'error' })}
						catchError={(error) => enqueueSnackbar(error, { variant: 'error' })}
						createSubscription={(data, actions) => actions.subscription.create({ plan_id: membershipSelectedState.planId })}
						onCancel={() => enqueueSnackbar('Your payment attempt to the memebership has been cancelled', { variant: 'info' })} />
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default SubscriptionsList