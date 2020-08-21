import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'
import UsersTable from './components/UsersTable'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Users = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(true)
	const [usersListState, setUsersListState] = useState([])
	const [subscriptionsState, setSubscriptionsState] = useState([])

	useEffect(() => {
		fetchUsersList()
		fetchSubscriptions()
	}, [])

	const fetchUsersList = async () => {
		const fetchUsersListResult = await adminApi.fetchUsersList({ adminId })
		if (fetchUsersListResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchUsersListResult.message, { variant: 'error' })
		}

		setUsersListState(fetchUsersListResult.data)
		setIsLoading(false)
	}

	const fetchSubscriptions = async () => {
		const fetchSubscriptionsResult = await adminApi.fetchSubscriptions({ adminId })
		if (fetchSubscriptionsResult.error) {
			return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })
		}

		setSubscriptionsState(fetchSubscriptionsResult.data)
	}

	const reloadData = () => {
		fetchUsersList()
		fetchSubscriptions()
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
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<UsersTable
						users={usersListState}
						reloadData={reloadData}
						subscriptions={subscriptionsState} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Users