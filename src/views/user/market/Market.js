/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { makeStyles } from '@material-ui/styles'
import React, { useRef, useEffect } from 'react'
import { Grid, useTheme } from '@material-ui/core'
import TradingViewWidget from 'react-tradingview-widget'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	}
}))

const Market = () => {
	const classes = useStyles()
	const theme = useTheme()

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
		script.innerHTML = JSON.stringify({
			'locale': 'en',
			'colorTheme': theme.palette.type,
			'isTransparent': false,
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
					'description': 'Germany 30',
					'proName': 'OANDA:DE30EUR'
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
				}
			]
		})
		tickers.current.appendChild(script)
	})

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
		script.innerHTML = JSON.stringify({
			'height': 600,
			'locale': 'en',
			'width': '100%',
			'colorTheme': theme.palette.type,
			'isTransparent': false,
			'importanceFilter': '-1,0,1',
			'currencyFilter': 'GBP,AUD,CNY,DEM,ITL,EUR,JPY,CAD,FRF,USD,NZD,SGD,HKD,TWD,CHF'
		})

		calender.current.appendChild(script)
	})

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify({
			'height': 600,
			'locale': 'en',
			'width': '100%',
			'showChart': true,
			'dateRange': '12m',
			'largeChartUrl': '',
			'colorTheme': theme.palette.type,
			'isTransparent': false,
			'gridLineColor': 'rgba(233, 233, 234, 1)',
			'scaleFontColor': 'rgba(120, 123, 134, 1)',
			'symbolActiveColor': 'rgba(33, 150, 243, 0.12)',
			'plotLineColorGrowing': 'rgba(33, 150, 243, 1)',
			'plotLineColorFalling': 'rgba(33, 150, 243, 1)',
			'belowLineFillColorGrowing': 'rgba(33, 150, 243, 0.12)',
			'belowLineFillColorFalling': 'rgba(33, 150, 243, 0.12)',
			'tabs': [
				{
					'title': 'Indices',
					'originalTitle': 'Indices',
					'symbols': [
						{
							's': 'OANDA:SPX500USD',
							'd': 'S&P 500'
						},
						{
							's': 'OANDA:NAS100USD',
							'd': 'Nasdaq 100'
						},
						{
							's': 'FOREXCOM:DJI',
							'd': 'Dow 30'
						},
						{
							's': 'INDEX:NKY',
							'd': 'Nikkei 225'
						},
						{
							's': 'INDEX:DEU30',
							'd': 'DAX Index'
						},
						{
							's': 'OANDA:UK100GBP',
							'd': 'FTSE 100'
						},
						{
							's': 'XETR:DAX',
							'd': 'Germany 30'
						},
						{
							's': 'OANDA:FR40EUR',
							'd': 'France 40'
						},
						{
							's': 'FOREXCOM:EU50',
							'd': 'EU STOCKS 50'
						}
					]
				},
				{
					'title': 'Commodities',
					'originalTitle': 'Commodities',
					'symbols': [
						{
							's': 'CME_MINI:ES1!',
							'd': 'E-Mini S&P'
						},
						{
							's': 'COMEX:GC1!',
							'd': 'Gold'
						},
						{
							's': 'NYMEX:CL1!',
							'd': 'Crude Oil'
						},
						{
							's': 'NYMEX:NG1!',
							'd': 'Natural Gas'
						},
						{
							's': 'CBOT:ZC1!',
							'd': 'Corn'
						},
						{
							's': 'OANDA:XAGUSD',
							'd': 'Silver'
						},
						{
							's': 'TVC:PLATINUM',
							'd': 'Platinum'
						},
						{
							's': 'TVC:PALLADIUM',
							'd': 'Palladium'
						}
					]
				},
				{
					'title': 'Bonds',
					'originalTitle': 'Bonds',
					'symbols': [
						{
							's': 'CME:GE1!',
							'd': 'Euro Dollar'
						},
						{
							's': 'CBOT:ZB1!',
							'd': 'T-Bond'
						},
						{
							's': 'CBOT:UB1!',
							'd': 'Ultra T-Bond'
						},
						{
							's': 'EUREX:FGBL1!',
							'd': 'Euro Bund'
						},
						{
							's': 'EUREX:FBTP1!',
							'd': 'Euro BTP'
						},
						{
							's': 'EUREX:FGBM1!',
							'd': 'Euro BOBL'
						}
					]
				},
				{
					'title': 'Forex',
					'originalTitle': 'Forex',
					'symbols': [
						{
							's': 'FX:EURUSD'
						},
						{
							's': 'FX:GBPUSD'
						},
						{
							's': 'FX:USDJPY'
						},
						{
							's': 'FX:USDCHF'
						},
						{
							's': 'FX:AUDUSD'
						},
						{
							's': 'FX:USDCAD'
						},
						{
							's': 'OANDA:GBPJPY',
							'd': 'GBP/JPY'
						},
						{
							's': 'OANDA:EURGBP',
							'd': 'EUR/GBP'
						},
						{
							's': 'OANDA:GBPAUD',
							'd': 'GBP/AUD'
						},
						{
							's': 'OANDA:EURJPY',
							'd': 'EUR/JPY'
						},
						{
							's': 'TVC:DXY',
							'd': 'DXY'
						}
					]
				},
				{
					'title': 'Crypto',
					'symbols': [
						{
							's': 'BITSTAMP:BTCUSD',
							'd': 'BTC/USD'
						},
						{
							's': 'BITSTAMP:XRPUSD',
							'd': 'XRP/USD'
						},
						{
							's': 'BITSTAMP:ETHUSD',
							'd': 'ETH/USD'
						},
						{
							's': 'BITSTAMP:LTCUSD',
							'd': 'LTC/USD'
						}
					]
				}
			]
		})
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'

		overview.current.appendChild(script)
	})

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify({
			'height': 600,
			'locale': 'en',
			'width': '100%',
			'colorTheme': theme.palette.type,
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
			]
		})
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js'

		heatMap.current.appendChild(script)
	})

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify({
			'height': 600,
			'locale': 'en',
			'width': '100%',
			'colorTheme': theme.palette.type,
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
			]
		})
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js'

		forexRates.current.appendChild(script)
	})

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.innerHTML = JSON.stringify({
			'height': 600,
			'locale': 'en',
			'width': '100%',
			'colorTheme': theme.palette.type,
			'displayCurrency': 'USD',
			'defaultColumn': 'overview',
			'screener_type': 'crypto_mkt'
		})
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'

		screener.current.appendChild(script)
	})

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
						locale='en'
						width='auto'
						height={600}
						interval='D'
						theme={theme.palette.type}
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
					<div ref={screener} />
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
			</Grid>
		</div>
	)
}

export default Market