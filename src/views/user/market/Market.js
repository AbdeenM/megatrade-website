/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect } from 'react'
import TradingViewWidget from 'react-tradingview-widget'

import { dataTickers, dataForexRates, dataHeatMap, dataScreener, dataOverview, dataCalender } from './components/Settings'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	}
}))

const Market = () => {
	const classes = useStyles()

	const heatMap = useRef(null)
	const tickers = useRef(null)
	const calender = useRef(null)
	const overview = useRef(null)
	const screener = useRef(null)
	const forexRates = useRef(null)

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
		script.innerHTML = JSON.stringify(dataTickers)
		tickers.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
		script.innerHTML = JSON.stringify(dataCalender)

		calender.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify(dataOverview)
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'

		overview.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify(dataHeatMap)
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js'

		heatMap.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify(dataForexRates)
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js'

		forexRates.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify(dataScreener)
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'

		screener.current.appendChild(script)
	}, [])

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={7}>
				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={tickers} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={calender} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<TradingViewWidget
						style='1'
						locale='en'
						width='100%'
						height='900'
						interval='D'
						theme='light'
						timezone='Etc/UTC'
						toolbar_bg='#f1f3f6'
						symbol='FX_IDC:USDEUR'
						enable_publishing={false}
						allow_symbol_change={true}
						container_id='tradingview_97fe0' />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={overview} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={heatMap} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={forexRates} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={screener} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Market