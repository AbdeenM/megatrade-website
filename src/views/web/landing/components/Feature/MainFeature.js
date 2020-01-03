/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './feature-style'

const MainFeature = () => {
	const classes = useStyles()

	return (
		<div className={classes.pageSection}>
			<Grid container className={classes.root} spacing={6}>
				<Grid md={4} item>
					<div className={classes.featureList}>
						<img
							alt='signals'
							className={classes.image}
							src='/images/features-signal.svg' />

						<Typography variant='h5'>
							TRADING SIGNALS
            			</Typography>

						<Typography variant='body1'>
							Recieve world class signals real-time from your personal dashboard, emails, SMS and any method you prefer.
            			</Typography>
					</div>
				</Grid>

				<Grid md={4} item>
					<div className={classes.featureList}>
						<img
							alt='news'
							className={classes.image}
							src='/images/features-news.svg' />

						<Typography variant='h5'>
							TRADING NEWS
        			    </Typography>

						<Typography variant='body1'>
							Keep up with the latest trends with our economic calendar that shows traders and investors all the important events which affect financial markets. It will help understand and forecast the right trading choices.
            			</Typography>
					</div>
				</Grid>

				<Grid md={4} item>
					<div className={classes.featureList}>
						<img
							alt='academy'
							className={classes.image}
							src='/images/features-academy.svg' />

						<Typography variant='h5'>
							TRADING ACADEMY
         			   </Typography>

						<Typography variant='body1'>
							We provide Step by step guides and tutorials that help everyone learn the tricks of the trade, weither you are a beginner or an expret at the trade we have something for all levels to help them make profitable trades.
						</Typography>
					</div>
				</Grid>

				<Grid md={4} item>
					<div className={classes.featureList}>
						<img
							alt='academy'
							className={classes.image}
							src='/images/features-broker.svg' />

						<Typography variant='h5'>
							TRADING ACADEMY
         			   </Typography>

						<Typography variant='body1'>
							Weither you know brokers or don’t, worry not we got you! We have access to various elite brokers helping you choose reliable trading services provider as it is crucial for your tradering success.
						</Typography>
					</div>
				</Grid>

				<Grid md={4} item>
					<div className={classes.featureList}>
						<img
							alt='academy'
							className={classes.image}
							src='/images/features-support.svg' />

						<Typography variant='h5'>
							360 CUSTOMER SUPPORT
         			   </Typography>

						<Typography variant='body1'>
							We believe your success is our success so put you above all, our friendly customer support team would be more than happy to answer all your questions at any time, if you require technical or trading help let us know and we will put you in touch with an expert.
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default MainFeature
