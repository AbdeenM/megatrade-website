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
import LogsTable from './components/LogsTable'

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
	const [logsState, setLogsState] = useState([])

	useEffect(() => { fetchLogs() }, [])

	const fetchLogs = async () => {
		const fetchLogsResult = await adminApi.fetchLogs({ adminId })
		if (fetchLogsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchLogsResult.message, { variant: 'error' })
		}

		setLogsState(fetchLogsResult.data)
		setIsLoading(false)
	}

	const reloadData = () => fetchLogs()

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
					<LogsTable
						logs={logsState}
						reloadData={reloadData}
						onRefreshLogs={fetchLogs} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Subscriptions