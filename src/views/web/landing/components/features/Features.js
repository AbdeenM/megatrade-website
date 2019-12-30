/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		overflow: 'hidden',
		backgroundColor: theme.palette.secondary.white
	},
	container: {
		display: 'flex',
		position: 'relative',
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	item: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		padding: theme.spacing(0, 5)
	},
	image: {
		height: 55
	},
	title: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},
	curvyLines: {
		top: -180,
		position: 'absolute',
		pointerEvents: 'none'
	}
}))

const Features = () => {
	const classes = useStyles()

	return (
		<section className={classes.root}>
			<Container className={classes.container}>
				<img
					alt='curvy lines'
					className={classes.curvyLines}
					src='/images/features-curvylines.png' />

				<Grid
					container
					spacing={5}>
					<Grid
						item
						md={4}
						xs={12}>
						<div className={classes.item}>
							<img
								alt='signals'
								className={classes.image}
								src='/images/features-signal.svg' />

							<Typography
								variant='h4'
								className={classes.title}>
								TRADING SIGNALS
			              	</Typography>

							<Typography variant='h5'>
								{'Recieve world class signals real-time from your personal dashboard, emails, SMS and any method you prefer.'}
							</Typography>
						</div>
					</Grid>

					<Grid
						item
						md={4}
						xs={12}>
						<div className={classes.item}>
							<img
								alt='news'
								className={classes.image}
								src='/images/features-news.svg' />

							<Typography
								variant='h4'
								className={classes.title}>
								TRADING NEWS
			              	</Typography>

							<Typography variant='h5'>
								{'Keep up with the latest trends with our economic calendar that shows traders and investors all the important events which affect financial markets. It will help understand and forecast the right trading choices.'}
							</Typography>
						</div>
					</Grid>

					<Grid
						item
						md={4}
						xs={12}>
						<div className={classes.item}>
							<img
								alt='academy'
								className={classes.image}
								src='/images/features-academy.svg' />

							<Typography
								variant='h4'
								className={classes.title}>
								TRADING ACADEMY
              				</Typography>

							<Typography variant='h5'>
								{'We provide Step by step guides and tutorials that help everyone learn the tricks of the trade, weither you are a beginner or an expret at the trade we have something for all levels to help them make profitable trades.'}
							</Typography>
						</div>
					</Grid>

					<Grid
						item
						md={4}
						xs={12}>
						<div className={classes.item}>
							<img
								alt='brokers'
								className={classes.image}
								src='/images/features-broker.svg' />

							<Typography
								variant='h4'
								className={classes.title}>
								BROKERS
              				</Typography>

							<Typography variant='h5'>
								{'Weither you know brokers or don’t, worry not we got you! We have access to various elite brokers helping you choose reliable trading services provider as it is crucial for your tradering success.'}
							</Typography>
						</div>
					</Grid>

					<Grid
						item
						md={4}
						xs={12}>
						<div className={classes.item}>
							<img
								alt='support'
								className={classes.image}
								src='/images/features-support.svg' />

							<Typography
								variant='h4'
								className={classes.title}>
								360 CUSTOMER SUPPORT
              				</Typography>

							<Typography variant='h5'>
								{'We believe your success is our success so put you above all, our friendly customer support team would be more than happy to answer all your questions at any time, if you require technical or trading help let us know and we will put you in touch with an expert.'}
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Container>
		</section>
	)
}

export default Features