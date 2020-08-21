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