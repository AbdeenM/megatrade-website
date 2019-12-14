/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Post from './components/Post'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Social = () => {
    const classes = useStyles()

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
                    <Post />
                </Grid>
            </Grid>
        </div>
    )
}

export default Social