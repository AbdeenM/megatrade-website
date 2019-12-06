/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'

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
	pagination: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(3)
	}
}))

const SubscriptionsList = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [userPackageState, setUserPackageState] = useState('')
	const [subscriptionsState, setSubscriptionsState] = useState([])

	useEffect(() => { fetchSubscriptions() }, [])

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await userApi.fetchSubscriptions({ userId })
		if (fetchSubscriptionsResult.error)
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })

		setUserPackageState(fetchSubscriptionsResult.data.userPackage)
		setSubscriptionsState(fetchSubscriptionsResult.data.subscriptions)
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
									package={userPackageState}
									subscription={subscription} />
							</Grid>
						))
					}
				</Grid>
			</div>
		</div>
	)
}

export default SubscriptionsList