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

    const [isLoading, setIsLoading] = useState(true)
    const [signalsState, setSignalsState] = useState([])

    useEffect(() => { fetchSignals() }, [])

    const fetchSignals = async () => {
        const fetchSignalsResult = await userApi.fetchSignals({ userId })
        if (fetchSignalsResult.error) {
            setIsLoading(false)
            return enqueueSnackbar(fetchSignalsResult.message, { variant: 'error' })
        }

        setSignalsState(fetchSignalsResult.data)
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