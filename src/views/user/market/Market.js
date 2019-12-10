/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect } from 'react'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	}
}))

const Market = () => {
	const classes = useStyles()

	const heatMap = useRef(null)
	const tickers = useRef(null)
	const analysis = useRef(null)
	const calender = useRef(null)
	const overview = useRef(null)
	const screener = useRef(null)
	const forexRates = useRef(null)

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
		script.async = true
		script.innerHTML = tickers.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js'
		script.innerHTML = JSON.stringify({
			'width': '100%',
			'height': '900',
			'currencies': [
				'EUR',
				'USD',
				'JPY',
				'GBP',
				'CHF',
				'AUD',
				'CAD',
				'NZD',
				'CNY'
			],
			'locale': 'en'
		})

		heatMap.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js'
		script.innerHTML = JSON.stringify({
			'width': '100%',
			'height': '900',
			'currencies': [
				'EUR',
				'USD',
				'JPY',
				'GBP',
				'CHF',
				'AUD',
				'CAD',
				'NZD',
				'CNY'
			],
			'locale': 'en'
		})

		forexRates.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
		script.innerHTML = JSON.stringify({
			'locale': 'en',
			'width': '100%',
			'height': '900',
			'colorTheme': 'light',
			'displayCurrency': 'USD',
			'defaultColumn': 'overview',
			'screener_type': 'crypto_mkt'
		})

		screener.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
		script.async = true
		script.innerHTML = overview.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
		script.async = true
		script.innerHTML = calender.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
		script.async = true
		script.innerHTML = analysis.current.appendChild(script)
	}, [])

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}>
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
					<div ref={overview} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={analysis} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Market