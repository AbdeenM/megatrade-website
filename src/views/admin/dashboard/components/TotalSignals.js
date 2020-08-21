import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import SignalsIcon from '@material-ui/icons/TrendingUp'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%'
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        width: 56,
        height: 56,
        backgroundColor: 'gold'
    },
    icon: {
        height: 32,
        width: 32
    }
}))

const TotalUsers = props => {
    const { className, signals, ...rest } = props

    const classes = useStyles()

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}>
            <CardContent>
                <Grid
                    container
                    justify='space-between'>
                    <Grid item>
                        <Typography
                            gutterBottom
                            variant='body2'
                            color='textSecondary'
                            className={classes.title}>
                            TOTAL SIGNALS
            			</Typography>

                        <Typography variant='h3'>{signals}</Typography>
                    </Grid>

                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <SignalsIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

TotalUsers.propTypes = {
    className: PropTypes.string
}

export default TotalUsers