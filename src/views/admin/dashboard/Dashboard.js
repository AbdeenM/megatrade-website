import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import TotalUsers from './components/TotalUsers'
import TotalLogins from './components/TotalLogins'
import TotalSignals from './components/TotalSignals'
import TotalFreeSignals from './components/TotalFreeSignals'
import TotalPayingUsers from './components/TotalPayingUsers'
import TotalSponsoredUsers from './components/TotalSponsoredUsers'

import { AdminApi } from 'config/Api'

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

    const [isLoading, setIsLoading] = useState(true)
    const [dashboardState, setDashboardState] = useState({
        totalUsers: '',
        totalLogins: '',
        totalSignals: '',
        totalFreeSignals: '',
        totalPayingUsers: '',
        totalSponsoredUsers: ''
    })

    useEffect(() => {
        fetchStatistics()
    }, [])

    const fetchStatistics = async () => {
        const fetchStatisticsResult = await adminApi.fetchStatistics({ adminId })
        if (fetchStatisticsResult.error) {
            setIsLoading(false)
            return enqueueSnackbar(fetchStatisticsResult.message, { variant: 'error' })
        }

        setDashboardState(dashboardState => ({
            ...dashboardState,
            totalUsers: fetchStatisticsResult.data.totalUsers,
            totalLogins: fetchStatisticsResult.data.totalLogins,
            totalSignals: fetchStatisticsResult.data.totalSignals,
            totalFreeSignals: fetchStatisticsResult.data.totalFreeSignals,
            totalPayingUsers: fetchStatisticsResult.data.totalPayingUsers,
            totalSponsoredUsers: fetchStatisticsResult.data.totalSponsoredUsers
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
                    <TotalSponsoredUsers sponsoredUsers={dashboardState.totalSponsoredUsers} />
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