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

	const quotes = useRef(null)
	const tickers = useRef(null)
	const analysis = useRef(null)
	const calender = useRef(null)
	const hotlists = useRef(null)
	const overview = useRef(null)
	const screener = useRef(null)
	const miniChart = useRef(null)
	const forexRates = useRef(null)
	const symbolInfo = useRef(null)
	const tickerSingle = useRef(null)

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
		script.async = true
		script.innerHTML = tickers.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
		script.async = true
		script.innerHTML = overview.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js'
		script.async = true
		script.innerHTML = quotes.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js'
		script.async = true
		script.innerHTML = hotlists.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
		script.async = true
		script.innerHTML = calender.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js'
		script.async = true
		script.innerHTML = tickerSingle.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
		script.async = true
		script.innerHTML = miniChart.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js'
		script.async = true
		script.innerHTML = analysis.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js'
		script.async = true
		script.innerHTML = symbolInfo.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js'
		script.async = true
		script.innerHTML = forexRates.current.appendChild(script)
	}, [])

	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
		script.async = true
		script.innerHTML = screener.current.appendChild(script)
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
					xs={4}
					lg={4}
					xl={4}
					md={4}>
					<div ref={calender} />
				</Grid>

				<Grid
					item
					xs={4}
					lg={4}
					xl={4}
					md={4}>
					<div ref={hotlists} />
				</Grid>

				<Grid
					item
					xs={4}
					lg={4}
					xl={4}
					md={4}>
					<div ref={overview} />
				</Grid>

				<Grid
					item
					xs={4}
					lg={4}
					xl={4}
					md={4}>
					<div ref={tickerSingle} />
				</Grid>

				<Grid
					item
					xs={4}
					lg={4}
					xl={4}
					md={4}>
					<div ref={miniChart} />
				</Grid>

				<Grid
					item
					xs={4}
					lg={4}
					xl={4}
					md={4}>
					<div ref={analysis} />
				</Grid>

				<Grid
					item
					xs={12}
					lg={12}
					xl={12}
					md={12}>
					<div ref={symbolInfo} />
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
					xs={6}
					lg={6}
					xl={6}
					md={6}>
					<div ref={forexRates} />
				</Grid>

				<Grid
					item
					xs={6}
					lg={6}
					xl={6}
					md={6}>
					<div ref={quotes} />
				</Grid>
			</Grid>
		</div>
	)
}

export default Market