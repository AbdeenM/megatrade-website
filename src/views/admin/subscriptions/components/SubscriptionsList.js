/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from '../../../../config/Api'
import SubscriptionsCard from './components/SubscriptionsCard'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
    root: {},
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

    const adminId = localStorage.getItem('adminId')

    const [isLoading, setIsLoading] = useState(true)
    const [subscriptionsState, setSubscriptionsState] = useState([])

    useEffect(() => { fetchSubscriptions() }, [])

    const fetchSubscriptions = async () => {
        const fetchSubscriptionsResult = await adminApi.fetchSubscriptions({ adminId })
        if (fetchSubscriptionsResult.error) {
            setIsLoading(false)
            return enqueueSnackbar(fetchSubscriptionsResult.message, { variant: 'error' })
        }

        setSubscriptionsState(fetchSubscriptionsResult.data)
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