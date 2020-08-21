import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const Support = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
                justify='center'>
            </Grid>
        </div>
    )
}

export default Support