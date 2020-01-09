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
import SponsorsTable from './components/SponsorsTable'

const adminApi = new AdminApi()

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Sponsors = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    const adminId = localStorage.getItem('adminId')

    const [isLoading, setIsLoading] = useState(true)
    const [sponsorsState, setSponsorsState] = useState([])

    useEffect(() => {
        fetchSponsorsList()
    }, [])

    const fetchSponsorsList = async () => {
        const fetchSponsorsListResult = await adminApi.fetchSponsors({ adminId })
        if (fetchSponsorsListResult.error) {
            setIsLoading(false)
            return enqueueSnackbar(fetchSponsorsListResult.message, { variant: 'error' })
        }

        setSponsorsState(fetchSponsorsListResult.data)
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
                spacing={10}>
                <Grid
                    item
                    lg={12}
                    xl={12}
                    md={12}
                    xs={12}>
                    <SponsorsTable sponsors={sponsorsState} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Sponsors