import clsx from 'clsx'
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import RefreshIcon from '@material-ui/icons/Refresh'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { Card, CardHeader, CardContent, Divider, Table, TableBody, TableCell, TableHead, TableRow, IconButton, CardActions, Button } from '@material-ui/core'

import UpgradePlan from './UpgradePlan'

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 800
	},
	actions: {
		justifyContent: 'flex-end'
	}
}))

const SignalAlerts = props => {
	const { className, signals, onRefreshSignals, ...rest } = props

	const classes = useStyles()

	const statusColors = {
		buy: 'lightgreen',
		hold: 'lightblue',
		close: 'lightgrey',
		sell: 'lightcoral',
		'stop loss': 'red',
		'break even': 'lightyellow',
		'take profit': 'lightseagreen'
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardHeader
				title='Signal Alerts'
				subheader='List of all our latest signals including time and date published'
				action={
					<IconButton
						size='small'
						onClick={onRefreshSignals}>
						<RefreshIcon />
					</IconButton>
				} />

			<Divider />

			<CardContent className={classes.content}>
				{signals.length > 0
					? <PerfectScrollbar>
						<div className={classes.inner}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Signal</TableCell>

										<TableCell>Status</TableCell>

										<TableCell>Time</TableCell>

										<TableCell>Date</TableCell>

										<TableCell>Entry Price</TableCell>

										<TableCell>Stop Loss</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{signals.slice(0, 10).map((signal, i) => (
										<TableRow
											hover
											key={i}>
											<TableCell>{signal.name}</TableCell>

											<TableCell>
												{signal.status
													? <Button
														variant='contained'
														style={{ backgroundColor: statusColors[signal.status.toLowerCase()] }}>
														{signal.status}
													</Button>
													: <Button
														color='primary'
														component={Link}
														to='/subscriptions'
														variant='contained'>
														SUBSCRIBE NOW
													</Button>}
											</TableCell>

											<TableCell>
												{moment(signal.createdAt).format('HH:mm')}
											</TableCell>

											<TableCell>
												{moment(signal.createdAt).format('DD/MM/YYYY')}
											</TableCell>

											<TableCell>
												{signal.entryPrice || 'PREMIUM SIGNAL'}
											</TableCell>

											<TableCell>
												{signal.stopLoss || 'PREMIUM SIGNAL'}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</PerfectScrollbar>
					: <UpgradePlan />}
			</CardContent>

			<Divider />

			<CardActions className={classes.actions}>
				<Link to='/view-signals'>
					<Button
						size='small'
						variant='text'
						color='primary'>
						View all <ArrowRightIcon />
					</Button>
				</Link>
			</CardActions>
		</Card>
	)
}

SignalAlerts.propTypes = {
	className: PropTypes.string
}

export default SignalAlerts