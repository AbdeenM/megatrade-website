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

import Password from '../account/components/Password'
import AccountDetails from './components/AccountDetails'
import AccountProfile from './components/AccountProfile'

import { AdminApi } from '../../../config/Api'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Account = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(true)
	const [profileState, setProfileState] = useState({
		city: '',
		email: '',
		avatar: '',
		number: '',
		country: '',
		lastName: '',
		firstName: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await adminApi.fetchAccount({ adminId })

		if (fetchAccountResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })
		}

		setProfileState(profileState => ({
			...profileState,
			city: fetchAccountResult.data.city || '',
			email: fetchAccountResult.data.email || '',
			avatar: fetchAccountResult.data.avatar || '',
			number: fetchAccountResult.data.number || '',
			country: fetchAccountResult.data.country || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || ''
		}))

		setIsLoading(false)
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
					lg={8}
					xl={5}
					md={12}
					xs={12}>
					<AccountProfile profile={{
						city: profileState.city,
						avatar: profileState.avatar,
						country: profileState.country,
						lastName: profileState.lastName,
						firstName: profileState.firstName
					}} />
				</Grid>

				<Grid
					item
					lg={4}
					md={6}
					xl={7}
					xs={12}>
					<AccountDetails profile={{
						city: profileState.city,
						email: profileState.email,
						number: profileState.number,
						country: profileState.country,
						lastName: profileState.lastName,
						firstName: profileState.firstName
					}} />
				</Grid>

				<Grid
					item
					lg={8}
					xl={5}
					md={12}
					xs={12}>
					<Password />
				</Grid>
			</Grid>
		</div>
	)
}

export default Account