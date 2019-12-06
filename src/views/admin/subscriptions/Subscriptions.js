/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { AdminApi } from '../../../config/Api'
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

	useEffect(() => { fetchSubscriptions() }, [])

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await adminApi.fetchSubscriptions({ adminId })
		if (fetchSubscriptionsResult.error)
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })
	}

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
					<SubscriptionsList />
				</Grid>

				<Grid
					item
					lg={4}
					xl={4}
					md={12}
					xs={12}>
					<NewSubscription />
				</Grid>
			</Grid>
		</div>
	)
}

export default Subscriptions