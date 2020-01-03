/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, CardHeader, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    Input: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.background.paper
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    actions: {
        justifyContent: 'flex-end'
    }
}))

const History = props => {
    const { className, subscriptions, ...rest } = props

    const classes = useStyles()

    const [allMemberships, setAllMemberships] = useState([])

    useEffect(() => { setAllMemberships(subscriptions) }, [subscriptions])

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}>
            <CardHeader
                title='Membership History'
                subheader='List of your previous membership packages and their details.' />

            <Divider />

            <CardContent className={classes.content}>

                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Membership Package</TableCell>

                                    <TableCell>Amount Paid</TableCell>

                                    <TableCell>Subscription ID</TableCell>

                                    <TableCell>Membership Date</TableCell>

                                    <TableCell>Next Billing</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    allMemberships.reverse().map((membership, i) => (
                                        <TableRow
                                            hover
                                            key={i}>
                                            <TableCell>{membership.package}</TableCell>

                                            <TableCell>{membership.price}</TableCell>

                                            <TableCell>{membership.subscriptionId}</TableCell>

                                            <TableCell>
                                                {moment(membership.startTime).format('DD/MM/YYYY')}
                                            </TableCell>

                                            <TableCell>
                                                {moment(membership.nextBilling).format('DD/MM/YYYY')}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    )
}

History.propTypes = {
    className: PropTypes.string,
    subscriptions: PropTypes.array.isRequired
}

export default History