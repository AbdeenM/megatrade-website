/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import ReactWOW from 'react-wow'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './feature-style'
import { useTextAlign } from 'theme/common'

const MainFeature = () => {
	const classes = useStyles()
	const align = useTextAlign()
	return (
		<div className={clsx(classes.featureMore)}>
			<Grid container spacing={6}>
				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
							<div className={classes.deco1} />
						</ReactWOW>

						<ReactWOW animation='fadeInLeft' delay='0.5s' duration='0.6s'>
							<figure className={classes.img}>
								<img src='/images/landing-trader.png' alt='img' />
							</figure>
						</ReactWOW>
					</div>
				</Grid>

				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='fadeInRight' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								About <Typography variant='h3' className={classes.title} display='inline' color='secondary'>Us</Typography>
							</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInRight' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' gutterBottom className={classes.text}>
								<Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> are a group of retail and proprietary traders with various experiences in stocks, currencies, commodities and forex. We strive to create a platform where every trader is able to find relevant trading information, as well as consistent and rpofitable trades.
							</Typography>

							<Typography variant='body1' gutterBottom className={classes.text}>
								<Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> works hard to ensure your trading journey is a joyful and profitable experience. We are committed to providing the best <Typography variant='h3' className={classes.text} display='inline' color='primary'>Trading Signals</Typography> as well as helping you achieve your trading goals. Become a member of <Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> and take your trading to the <Typography variant='h3' className={classes.text} display='inline' color='secondary'>Next Level</Typography>.
							</Typography>
						</ReactWOW>
					</div>
				</Grid>
			</Grid>

			<Grid container spacing={6}>
				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='fadeInLeft' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								How <Typography variant='h3' className={classes.title} display='inline' color='primary'>Mega Trade</Typography> Trading Signals <Typography variant='h3' className={classes.title} display='inline' color='secondary'>Work</Typography>
							</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInLeft' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' className={classes.text}>
								<Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> carefully analyse the trading markets all day every day to find the best trading opportunities. Once you have registered, and whenever a trade is entered on our accounts you will automatically recieve an email alert about the trade, as well as on your dashboard.
              				</Typography>

							<Typography variant='body1' className={classes.text}>
								<Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> ensures the execution of our trading alerts prior to providing them to you! <Typography variant='h3' className={classes.text} display='inline' color='secondary'>So you are not fooled</Typography>.
              				</Typography>
						</ReactWOW>
					</div>
				</Grid>

				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
							<div className={classes.deco1} />
						</ReactWOW>

						<ReactWOW animation='fadeInRight' delay='0.5s' duration='0.6s'>
							<figure className={classes.img}>
								<img src='/images/landing-works.png' alt='img' />
							</figure>
						</ReactWOW>
					</div>
				</Grid>
			</Grid>

			<Grid container spacing={6}>
				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
							<div className={classes.deco1} />
						</ReactWOW>

						<ReactWOW animation='fadeInLeft' delay='0.5s' duration='0.6s'>
							<figure className={classes.img}>
								<img src='/images/landing-action.png' alt='img' />
							</figure>
						</ReactWOW>
					</div>
				</Grid>

				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='fadeInRight' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								Trading <Typography variant='h3' className={classes.title} display='inline' color='secondary'>Actions</Typography>
							</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInRight' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' gutterBottom className={classes.text}>
								Making a successful trade is not always easy because a lot of things have to be considered for one to make the right decision.
							</Typography>

							<Typography variant='body1' gutterBottom className={classes.text}>
								The mistake many traders make is to trade emotionally and others find it hard to be flexible in their decisions. <Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> will ensure you make a good living trading in the markets, by wisely using the <Typography variant='h3' className={classes.text} display='inline' color='secondary'>Price Action Trading Strategy</Typography>.
							</Typography>
						</ReactWOW>
					</div>
				</Grid>
			</Grid>

			<Grid container spacing={6}>
				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='fadeInLeft' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								Trading <Typography variant='h3' className={classes.title} display='inline' color='secondary'>Strategy</Typography>
							</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInLeft' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' className={classes.text}>
								<Typography variant='h3' className={classes.text} display='inline' color='primary'>Mega Trade</Typography> traders use the price action strategy that allows them to study the market making subjective decisions on trading with respect to current and definite price movements.
              				</Typography>
						</ReactWOW>
					</div>
				</Grid>

				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
							<div className={classes.deco1} />
						</ReactWOW>

						<ReactWOW animation='fadeInRight' delay='0.5s' duration='0.6s'>
							<figure className={classes.img}>
								<img src='/images/landing-price.png' alt='img' />
							</figure>
						</ReactWOW>
					</div>
				</Grid>
			</Grid>

			<Grid container spacing={6}>
				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
							<div className={classes.deco1} />
						</ReactWOW>

						<ReactWOW animation='fadeInLeft' delay='0.5s' duration='0.6s'>
							<figure className={classes.img}>
								<img src='/images/landing-market.png' alt='img' />
							</figure>
						</ReactWOW>
					</div>
				</Grid>

				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='fadeInRight' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								<Typography variant='h3' className={classes.title} display='inline' color='primary'>Mega Trade</Typography> <Typography variant='h3' className={classes.title} display='inline' color='secondary'>Platfrom</Typography>
							</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInRight' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' gutterBottom className={classes.text}>
								A state of the art <Typography variant='h3' className={classes.text} display='inline' color='primary'>Dashboard</Typography> that includes <Typography variant='h3' className={classes.text} display='inline' color='secondary'>Latest Trade Charts, Trade Focus and Signal Alerts</Typography>.
							</Typography>

							<Typography variant='body1' gutterBottom className={classes.text}>
								Real time market information for <Typography variant='h3' className={classes.text} display='inline' color='secondary'>Forex, Stocks, Commodities and Cryptocurrencies</Typography>.
							</Typography>
						</ReactWOW>
					</div>
				</Grid>
			</Grid>

			<Grid container className={classes.root} spacing={6}>
				<Grid md={12} item>
					<div className={classes.featureMore}>
						<div className={clsx(align.textCenter, classes.featureItem, classes.last)}>
							<ReactWOW animation='fadeInUp' duration='0.6s'>
								<Typography variant='h3' className={classes.title}>
									Don't Hesitate! <Typography variant='h3' className={classes.title} display='inline' color='secondary'>Subscribe Now</Typography>
								</Typography>
							</ReactWOW>

							<ReactWOW animation='fadeInUp' delay='0.3s' duration='0.6s'>
								<Typography variant='body1' className={classes.text}>
									Become the money magnet you are destined to be
               				 	</Typography>
							</ReactWOW>

							<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
								<div className={classes.deco2} />
							</ReactWOW>

							<ReactWOW animation='fadeInUp' delay='0.5s' duration='0.6s'>
								<figure className={classes.imgFull}>
									<img src='/images/landing-money.png' alt='img' />
								</figure>
							</ReactWOW>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default MainFeature
