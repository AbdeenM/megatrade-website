/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import moment from 'moment'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'
import DashboardData from './components/DasboardData'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const UserDashboard = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [isLoading, setIsLoading] = useState(false)
    const [weekdaysState, setWeekdaysState] = useState([])
    const [userDashboardState, setUserDashboardState] = useState({
        errors: {},
        values: {
            totalPips: '',
            totalUsers: '',
            tradeBudget: '',
            totalProfits: '',
            tradeFocus: {
                data: '',
                labels: '',
                backgroundColor: ''
            },
            latestAlerts: {
                thisYear: [],
                lastYear: []
            }
        },
        touched: {},
        isValid: false,
        isChanged: false
    })

    useEffect(() => {
        getWeekDays()
        fetchUserDashboard()
    }, [])

    const getWeekDays = () => {
        let weekDays = []
        const startOfWeek = moment().startOf('week')

        Array(7).fill().map((each, i) => weekDays.push(moment(startOfWeek).add(i, 'days')))

        const labels = []
        weekDays.forEach(weekday => {
            labels.push(moment(weekday).format('DD MMM'))
        })

        setWeekdaysState(labels)
    }

    const fetchUserDashboard = async () => {
        setIsLoading(true)
        const fetchUserDashboardResult = await adminApi.fetchUserDashboard({ adminId })
        if (fetchUserDashboardResult.error) {
            setIsLoading(false)
            return enqueueSnackbar(fetchUserDashboardResult.message, { variant: 'error' })
        }

        setUserDashboardState(userDashboardState => ({
            ...userDashboardState,
            values: {
                ...userDashboardState.values,
                ...fetchUserDashboardResult.data,
                tradeFocus: {
                    data: fetchUserDashboardResult.data.tradeFocus.data.join(', '),
                    labels: fetchUserDashboardResult.data.tradeFocus.labels.join(', '),
                    backgroundColor: fetchUserDashboardResult.data.tradeFocus.backgroundColor.join(', ')
                },
                latestAlerts: {
                    thisYear: fetchUserDashboardResult.data.latestAlerts.thisYear,
                    lastYear: fetchUserDashboardResult.data.latestAlerts.lastYear
                }
            }
        }))

        setIsLoading(false)
    }

    const reloadData = () => fetchUserDashboard()

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
                    <DashboardData
                        reloadData={reloadData}
                        weekdaysState={weekdaysState}
                        userDashboard={userDashboardState} />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserDashboard