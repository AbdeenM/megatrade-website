/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import AnalogClock from 'react-clock'
import DigitalClock from 'react-live-clock'
import { makeStyles } from '@material-ui/styles'
import TradingViewWidget from 'react-tradingview-widget'
import React, { useRef, useEffect, useState } from 'react'
import { Grid, useTheme, Button, ButtonGroup, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	analogClock: {
		margin: 10
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
	const [selectedState, setSelectedState] = useState('Clocks')
	const [clockState, setClockState] = useState({
		'New York': '',
		'London': '',
		'Tokyo': '',
		'Sydney': ''
	})

	const countryState = [
		{
			country: 'New York',
			timezone: 'America/New_York'
		},
		{
			country: 'London',
			timezone: 'Europe/London'
		},
		{
			country: 'Tokyo',
			timezone: 'Asia/Tokyo'
		},
		{
			country: 'Sydney',
			timezone: 'Australia/Sydney'
		}]

	useEffect(() => {
		const script = document.createElement('script')
		script.async = true
		script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js'
		script.innerHTML = JSON.stringify({
			'locale': 'en',
			'isTransparent': false,
			'colorTheme': theme.palette.type,
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
	}, [])

	useEffect(() => {
		if (selectedState === 'Calender') {
			const script = document.createElement('script')
			script.async = true
			script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js'
			script.innerHTML = JSON.stringify({
				'locale': 'en',
				'width': '100%',
				'height': '700',
				'isTransparent': false,
				'importanceFilter': '-1,0,1',
				'colorTheme': theme.palette.type,
				'currencyFilter': 'GBP,AUD,CNY,DEM,ITL,EUR,JPY,CAD,FRF,USD,NZD,SGD,HKD,TWD,CHF'
			})

			calender.current.appendChild(script)
		} else if (selectedState === 'Overview') {
			const script = document.createElement('script')
			script.async = true
			script.innerHTML = JSON.stringify({
				'locale': 'en',
				'width': '100%',
				'height': '700',
				'showChart': true,
				'dateRange': '12m',
				'largeChartUrl': '',
				'isTransparent': false,
				'colorTheme': theme.palette.type,
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
		} else if (selectedState === 'Screener') {
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
		} else if (selectedState === 'Heat Map') {
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
		} else if (selectedState === 'Forex Rates') {
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
		}
	}, [selectedState])

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

				<ButtonGroup
					fullWidth
					size='large'
					color='primary'
					className={classes.root}>
					<Button
						onClick={() => setSelectedState('Clocks')}
						variant={selectedState === 'Clocks' ? 'contained' : 'outlined'}>Clocks</Button>

					<Button
						onClick={() => setSelectedState('Calender')}
						variant={selectedState === 'Calender' ? 'contained' : 'outlined'}>Calender</Button>

					<Button
						onClick={() => setSelectedState('Real Time Chart')}
						variant={selectedState === 'Real Time Chart' ? 'contained' : 'outlined'}>Real Time Chart</Button>

					<Button
						onClick={() => setSelectedState('Overview')}
						variant={selectedState === 'Overview' ? 'contained' : 'outlined'}>Overview</Button>

					<Button
						onClick={() => setSelectedState('Screener')}
						variant={selectedState === 'Screener' ? 'contained' : 'outlined'}>Screener</Button>

					<Button
						onClick={() => setSelectedState('Heat Map')}
						variant={selectedState === 'Heat Map' ? 'contained' : 'outlined'}>Heat Map</Button>

					<Button
						onClick={() => setSelectedState('Forex Rates')}
						variant={selectedState === 'Forex Rates' ? 'contained' : 'outlined'}>Forex Rates</Button>
				</ButtonGroup>

				{selectedState === 'Clocks'
					?
					<Grid
						container
						spacing={7}>
						{countryState.map((clock, i) => (
							<Grid
								item
								xl={6}
								xs={12}
								lg={12}
								md={12}
								key={i}>
								<Typography
									variant='h6'
									align='center'
									display='block'>{clock.country}</Typography>

								<div className={classes.item}>
									<AnalogClock
										size={200}
										renderNumbers={true}
										className={classes.analogClock}
										value={clockState[clock.country]} />

									<DigitalClock
										ticking={true}
										timezone={clock.timezone}
										format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
										onChange={({ moment }) => setClockState(clockState => ({
											...clockState,
											[clock.country]: moment._d
										}))} />
								</div>
							</Grid>
						))}
					</Grid>
					: <React.Fragment />}

				{selectedState === 'Calender'
					? <Grid
						item
						xs={12}
						lg={12}
						xl={12}
						md={12}>
						<div ref={calender} />
					</Grid>
					: <React.Fragment />}

				{selectedState === 'Real Time Chart'
					? <Grid
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
					: <React.Fragment />}

				{selectedState === 'Overview'
					? <Grid
						item
						xs={12}
						lg={12}
						xl={12}
						md={12}>
						<div ref={overview} />
					</Grid>
					: <React.Fragment />}

				{selectedState === 'Screener'
					? <Grid
						item
						xs={12}
						lg={12}
						xl={12}
						md={12}>
						<div ref={screener} />
					</Grid>
					: <React.Fragment />}

				{selectedState === 'Heat Map'
					? <Grid
						item
						xs={12}
						lg={12}
						xl={12}
						md={12}>
						<div ref={heatMap} />
					</Grid>
					: <React.Fragment />}

				{selectedState === 'Forex Rates'
					? <Grid
						item
						xs={12}
						lg={12}
						xl={12}
						md={12}>
						<div ref={forexRates} />
					</Grid>
					: <React.Fragment />}
			</Grid>
		</div>
	)
}

export default Market