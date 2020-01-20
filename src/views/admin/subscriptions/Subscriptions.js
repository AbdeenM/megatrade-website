/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'
import NewSubscription from './components/NewSubscription'
import SubscriptionsList from './components/SubscriptionsList'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Subscriptions = () => {
	const classes = useStyles()

	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(true)
	const [subscriptionsState, setSubscriptionsState] = useState([])

	useEffect(() => { fetchSubscriptions() }, [])

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await adminApi.fetchSubscriptions({ adminId })
		if (fetchSubscriptionsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })
		}

		setSubscriptionsState(fetchSubscriptionsResult.data)
		setIsLoading(false)
	}

	const reloadData = () => fetchSubscriptions()

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
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={8}
					xl={8}
					md={12}
					xs={12}>
					<SubscriptionsList
						reloadData={reloadData}
						subscriptionsState={subscriptionsState} />
				</Grid>

				<Grid
					item
					lg={4}
					xl={4}
					md={12}
					xs={12}>
					<NewSubscription
						reloadData={reloadData} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Subscriptions