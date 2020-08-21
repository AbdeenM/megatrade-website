import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import SubscriptionsCard from './components/SubscriptionsCard'

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

const SubscriptionsList = props => {
    const { reloadData, subscriptionsState } = props

    const classes = useStyles()

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
                                    reloadData={reloadData}
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