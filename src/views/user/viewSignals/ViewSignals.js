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

import { UserApi } from '../../../config/Api'
import SignalsTable from './components/SignalsTable'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const ViewSignals = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const userId = localStorage.getItem('userId')

    const [signalsState, setSignalsState] = useState([])

    useEffect(() => { fetchSignals() }, [])

    const fetchSignals = async () => {
        const fetchSignalsResult = await userApi.fetchSignals({ userId })
        if (fetchSignalsResult.error)
            return enqueueSnackbar(fetchSignalsResult.message, { variant: 'error' })

        setSignalsState(fetchSignalsResult.data)
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
                    <SignalsTable
                        signals={signalsState}
                        onRefreshSignals={fetchSignals} />
                </Grid>
            </Grid>
        </div>
    )
}

export default ViewSignals