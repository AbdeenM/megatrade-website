/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { UserApi } from '../../../config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Dashboard = () => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar()

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}>
            </Grid>
        </div>
    )
}

export default Dashboard