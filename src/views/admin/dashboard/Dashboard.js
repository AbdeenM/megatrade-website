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

import TotalUsers from './components/TotalUsers'
import TotalLogins from './components/TotalLogins'
import TotalSignals from './components/TotalSignals'
import TotalFreeSignals from './components/TotalFreeSignals'
import TotalPayingUsers from './components/TotalPayingUsers'

import { AdminApi } from '../../../config/Api'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Dashboard = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [dashboardState, setDashboardState] = useState({
        totalUsers: '',
        totalLogins: '',
        totalSignals: '',
        totalFreeSignals: '',
        totalPayingUsers: ''
    })

    useEffect(() => {
        fetchStatistics()
    }, [])

    const fetchStatistics = async () => {
        const fetchStatisticsResult = await adminApi.fetchStatistics({ adminId })
        if (fetchStatisticsResult.error)
            return enqueueSnackbar(fetchStatisticsResult.message, { variant: 'error' })

        setDashboardState(dashboardState => ({
            ...dashboardState,
            totalUsers: fetchStatisticsResult.data.totalUsers,
            totalLogins: fetchStatisticsResult.data.totalLogins,
            totalSignals: fetchStatisticsResult.data.totalSignals,
            totalFreeSignals: fetchStatisticsResult.data.totalFreeSignals,
            totalPayingUsers: fetchStatisticsResult.data.totalPayingUsers
        }))
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <TotalUsers users={dashboardState.totalUsers} />
                </Grid>

                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <TotalFreeSignals freeSignals={dashboardState.totalFreeSignals} />
                </Grid>

                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <TotalSignals signals={dashboardState.totalSignals} />
                </Grid>

                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <TotalPayingUsers payingUsers={dashboardState.totalPayingUsers} />
                </Grid>

                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}>
                    <TotalLogins logins={dashboardState.totalLogins} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard