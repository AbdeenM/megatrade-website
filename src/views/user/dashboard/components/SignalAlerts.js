/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import RefreshIcon from '@material-ui/icons/Refresh'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { Card, CardHeader, CardContent, Divider, Table, TableBody, TableCell, TableHead, TableRow, IconButton, CardActions, Button } from '@material-ui/core'

import mockData from './components/DataSignal'
import StatusBullet from '../../../../components/StatusBullet'

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 800
	},
	statusContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	status: {
		marginRight: theme.spacing(1)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}))

const statusColors = {
	hold: 'info',
	buy: 'success',
	sell: 'danger'
}

const SignalAlerts = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	const [orders] = useState(mockData)

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardHeader
				title='Signal Alerts'
				action={
					<IconButton
						size='small'>
						<RefreshIcon />
					</IconButton>
				} />

			<Divider />

			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Ref</TableCell>

									<TableCell>Signal</TableCell>

									<TableCell>Time</TableCell>

									<TableCell>Date</TableCell>

									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{
									orders.map(order => (
										<TableRow
											hover
											key={order.id}>
											<TableCell>{order.ref}</TableCell>

											<TableCell>{order.customer.name}</TableCell>

											<TableCell>
												{moment(order.createdAt).format('HH:mm')}
											</TableCell>

											<TableCell>
												{moment(order.createdAt).format('DD/MM/YYYY')}
											</TableCell>

											<TableCell>
												<div className={classes.statusContainer}>
													<StatusBullet
														size='md'
														className={classes.status}
														color={statusColors[order.status]} />

													{order.status}
												</div>
											</TableCell>
										</TableRow>
									))
								}
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>

			<Divider />

			<CardActions className={classes.actions}>
				<Button
					size='small'
					variant='text'
					color='primary'>
					View all <ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	)
}

SignalAlerts.propTypes = {
	className: PropTypes.string
}

export default SignalAlerts