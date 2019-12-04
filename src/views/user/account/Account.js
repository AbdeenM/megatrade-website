/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'

import Alerts from '../account/components/Alerts'
import Password from '../account/components/Password'
import AccountDetails from './components/AccountDetails'
import AccountProfile from './components/AccountProfile'

import { UserApi } from '../../../config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Account = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [profileState, setProfileState] = useState({
		city: '',
		email: '',
		avatar: '',
		number: '',
		status: '',
		country: '',
		lastName: '',
		firstName: '',
		membership: '',
		membershipAmount: '',
		notifications: {
			alerts: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			},
			promotions: {
				email: false,
				dashboard: false,
				phoneCalls: false,
				textMessages: false
			}
		}
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })

		if (fetchAccountResult.error)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

		setProfileState(profileState => ({
			...profileState,
			city: fetchAccountResult.data.city || '',
			email: fetchAccountResult.data.email || '',
			avatar: fetchAccountResult.data.avatar || '',
			number: fetchAccountResult.data.number || '',
			status: fetchAccountResult.data.status || '',
			country: fetchAccountResult.data.country || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || '',
			membership: fetchAccountResult.data.membership || '',
			membershipAmount: fetchAccountResult.data.membershipAmount || '',
			notifications: {
				alerts: {
					email: fetchAccountResult.data.notifications.alerts.email || false,
					dashboard: fetchAccountResult.data.notifications.alerts.dashboard || false,
					phoneCalls: fetchAccountResult.data.notifications.alerts.phoneCalls || false,
					textMessages: fetchAccountResult.data.notifications.alerts.textMessages || false
				},
				promotions: {
					email: fetchAccountResult.data.notifications.promotions.email || false,
					dashboard: fetchAccountResult.data.notifications.promotions.dashboard || false,
					phoneCalls: fetchAccountResult.data.notifications.promotions.phoneCalls || false,
					textMessages: fetchAccountResult.data.notifications.promotions.textMessages || false
				}
			}
		}))
	}

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={4}
					md={6}
					xl={7}
					xs={12}>
					<Alerts notifications={profileState.notifications} />
				</Grid>

				<Grid
					item
					lg={8}
					xl={5}
					md={12}
					xs={12}>
					<AccountProfile profile={{
						city: profileState.city,
						avatar: profileState.avatar,
						status: profileState.status,
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
						firstName: profileState.firstName,
						membership: profileState.membership,
						membershipAmount: profileState.membershipAmount
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