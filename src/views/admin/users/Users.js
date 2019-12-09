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

import { AdminApi } from '../../../config/Api'
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

	const [usersListState, setUsersListState] = useState([])

	useEffect(() => { fetchUsersList() }, [])

	const fetchUsersList = async () => {
		const fetchUsersListResult = await adminApi.fetchUsersList({ adminId })
		if (fetchUsersListResult.error)
			return enqueueSnackbar(fetchUsersListResult.message, { variant: 'error' })

		setUsersListState(fetchUsersListResult.data)
	}

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
					<UsersTable users={usersListState} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Users