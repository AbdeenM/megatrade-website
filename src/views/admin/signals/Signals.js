import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'
import SignalsTable from './components/SignalsTable'
import FreeSignalsTable from './components/FreeSignalsTable'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Signals = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(true)
	const [signalsState, setSignalsState] = useState([])
	const [freeSignalsState, setFreeSignalsState] = useState([])

	useEffect(() => {
		fetchSignalsList()
		fetchFreeSignalsList()
	}, [])

	const fetchFreeSignalsList = async () => {
		const fetchFreeSignalsListResult = await adminApi.fetchFreeSignals({ adminId })
		if (fetchFreeSignalsListResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchFreeSignalsListResult.message, { variant: 'error' })
		}

		setFreeSignalsState(fetchFreeSignalsListResult.data)
		setIsLoading(false)
	}

	const fetchSignalsList = async () => {
		const fetchSignalsListResult = await adminApi.fetchSignals({ adminId })
		if (fetchSignalsListResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchSignalsListResult.message, { variant: 'error' })
		}

		setSignalsState(fetchSignalsListResult.data)
		setIsLoading(false)
	}

	const reloadData = () => {
		fetchSignalsList()
		fetchFreeSignalsList()
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
				spacing={10}>
				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<SignalsTable
						signals={signalsState}
						reloadData={reloadData} />
				</Grid>

				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<FreeSignalsTable
						reloadData={reloadData}
						signals={freeSignalsState} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Signals