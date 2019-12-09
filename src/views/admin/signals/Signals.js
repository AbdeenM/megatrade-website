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

	const [signalsState, setSignalsState] = useState([])
	const [freeSignalsState, setFreeSignalsState] = useState([])

	useEffect(() => {
		fetchSignalsList()
		fetchFreeSignalsList()
	}, [])

	const fetchFreeSignalsList = async () => {
		const fetchFreeSignalsListResult = await adminApi.fetchFreeSignals({ adminId })
		if (fetchFreeSignalsListResult.error)
			return enqueueSnackbar(fetchFreeSignalsListResult.message, { variant: 'error' })

		setFreeSignalsState(fetchFreeSignalsListResult.data)
	}

	const fetchSignalsList = async () => {
		const fetchSignalsListResult = await adminApi.fetchSignals({ adminId })
		if (fetchSignalsListResult.error)
			return enqueueSnackbar(fetchSignalsListResult.message, { variant: 'error' })

		setSignalsState(fetchSignalsListResult.data)
	}

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
					<SignalsTable signals={signalsState} />
				</Grid>

				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<FreeSignalsTable signals={freeSignalsState} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Signals