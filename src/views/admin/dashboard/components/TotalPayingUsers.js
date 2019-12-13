/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
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
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.white
    },
    icon: {
        width: 32,
        height: 32
    }
}))

const TotalProfit = props => {
    const { className, payingUsers, ...rest } = props

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
                            color='inherit'
                            variant='body2'
                            className={classes.title}>
                            TOTAL PAYING USERS
            			</Typography>

                        <Typography
                            variant='h3'
                            color='inherit'>
                            {payingUsers}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <AttachMoneyIcon className={classes.icon} />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

TotalProfit.propTypes = {
    className: PropTypes.string
}

export default TotalProfit