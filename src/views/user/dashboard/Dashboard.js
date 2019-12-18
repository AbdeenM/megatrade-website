/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState, useRef } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import Budget from './components/Budget'
import TradePie from './components/TradePie'
import TotalPips from './components/TotalPips'
import TotalUsers from './components/TotalUsers'
import LatestAlerts from './components/LatestAlerts'
import SignalAlerts from './components/SignalAlerts'
import TotalProfits from './components/TotalProfits'

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

	const userId = localStorage.getItem('userId')

	const tickerTape = useRef(null)
	const [isLoading, setIsLoading] = useState(true)
	const [signalsState, setSignalsState] = useState([])
	const [isTaperLoaded, setIsTaperLoaded] = useState(false)
	const [dashboardState, setDashboardState] = useState({
		totalPips: '',
		totalUsers: '',
		tradeBudget: '',
		totalProfits: '',
		tradeFocus: {
			data: [],
			labels: [],
			backgroundColor: []
		},
		latestAlerts: {
			thisYear: [],
			lastYear: []
		}
	})

	useEffect(() => {
		fetchSignals()
		fetchStatistics()
	}, [])

	useEffect(() => {
		if (!isLoading && !isTaperLoaded) {
			const script = document.createElement('script')
			script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
			script.async = true
			script.innerHTML = JSON.stringify({
				'locale': 'en',
				'colorTheme': 'light',
				'isTransparent': false,
				'displayMode': 'adaptive',
				'symbols': [
					{
						'proName': 'OANDA:SPX500USD',
						'title': 'S&P 500'
					},
					{
						'proName': 'FX_IDC:EURUSD',
						'title': 'EUR/USD'
					},
					{
						'proName': 'BITSTAMP:BTCUSD',
						'title': 'BTC/USD'
					},
					{
						'description': 'Wall Street',
						'proName': 'OANDA:US30USD'
					},
					{
						'description': 'GBP/USD',
						'proName': 'OANDA:GBPUSD'
					},
					{
						'description': 'XAU/USD',
						'proName': 'OANDA:XAUUSD'
					},
					{
						'description': 'WTI CRUDE',
						'proName': 'TVC:USOIL'
					},
					{
						'description': 'US TECH 100',
						'proName': 'FOREXCOM:NSXUSD'
					},
					{
						'description': 'AMAZON',
						'proName': 'NASDAQ:AMZN'
					}
				]
			})

			tickerTape.current.appendChild(script)
			setIsTaperLoaded(true)
		}
	})

	const fetchStatistics = async () => {
		const fetchStatisticsResult = await userApi.fetchStatistics({ userId })
		if (fetchStatisticsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchStatisticsResult.message, { variant: 'error' })
		}

		setDashboardState(dashboardState => ({
			...dashboardState,
			totalPips: fetchStatisticsResult.data.totalPips,
			totalUsers: fetchStatisticsResult.data.totalUsers,
			tradeBudget: fetchStatisticsResult.data.tradeBudget,
			totalProfits: fetchStatisticsResult.data.totalProfits,
			tradeFocus: {
				data: fetchStatisticsResult.data.tradeFocus.data,
				labels: fetchStatisticsResult.data.tradeFocus.labels,
				backgroundColor: fetchStatisticsResult.data.tradeFocus.backgroundColor
			},
			latestAlerts: {
				thisYear: fetchStatisticsResult.data.latestAlerts.thisYear,
				lastYear: fetchStatisticsResult.data.latestAlerts.lastYear
			}
		}))

		setIsLoading(false)
	}

	const fetchSignals = async () => {
		const fetchSignalsResult = await userApi.fetchSignals({ userId })
		if (fetchSignalsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchSignalsResult.message, { variant: 'error' })
		}

		setSignalsState(fetchSignalsResult.data)
		setIsLoading(false)
	}

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
				<Grid
					item
					lg={12}
					sm={12}
					xl={12}
					xs={12}>
					<div ref={tickerTape} />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<Budget budget={dashboardState.tradeBudget} />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalUsers users={dashboardState.totalUsers} />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalPips pips={dashboardState.totalPips} />
				</Grid>

				<Grid
					item
					lg={3}
					sm={6}
					xl={3}
					xs={12}>
					<TotalProfits profits={dashboardState.totalProfits} />
				</Grid>

				<Grid
					item
					lg={8}
					xl={7}
					md={12}
					xs={12}>
					<LatestAlerts alerts={dashboardState.latestAlerts} />
				</Grid>

				<Grid
					item
					lg={4}
					xl={5}
					md={12}
					xs={12}>
					<TradePie focus={dashboardState.tradeFocus} />
				</Grid>

				<Grid
					item
					lg={12}
					xl={12}
					md={12}
					xs={12}>
					<SignalAlerts
						signals={signalsState}
						onRefreshSignals={fetchSignals} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Dashboard