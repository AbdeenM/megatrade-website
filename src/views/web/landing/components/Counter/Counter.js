/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import ReactWOW from 'react-wow'
import CountUp from 'react-countup'
import React, { useState } from 'react'
import { Typography, Grid, Container } from '@material-ui/core'

import useStyles from './counter-style'

import PipsIcon from '@material-ui/icons/TrendingUp'
import TradesIcon from '@material-ui/icons/SwapCalls'
import ExperienceIcon from '@material-ui/icons/Schedule'
import UsersIcon from '@material-ui/icons/SupervisorAccount'

const Counter = () => {
	const classes = useStyles()
	const [play, setPlay] = useState(false)

	const countup = (val, isPlay) => (
		<span>
			{isPlay ? <CountUp end={val} /> : 0}
		</span>
	)

	const handlePlay = () => {
		setTimeout(() => { setPlay(true) }, 500)
	}

	return (
		<div className={classes.counterWrap}>
			<Container fixed>
				<Grid container justify='center' alignItems='center' className={classes.root} spacing={6}>
					<Grid md={3} item>
						<ReactWOW animation='fadeIn' offset={300} callback={handlePlay}>
							<div className={classes.counterItem}>
								<UsersIcon />

								<div className={classes.text}>
									<Typography variant='h4'>
										{countup(200, play)}+
									</Typography>

									<Typography variant='h6'>
										Subscribers this month
                 					 </Typography>
								</div>
							</div>
						</ReactWOW>
					</Grid>

					<Grid md={3} item>
						<ReactWOW animation='fadeIn' offset={300} callback={handlePlay}>
							<div className={classes.counterItem}>
								<TradesIcon />

								<div className={classes.text}>
									<Typography variant='h4'>
										~{countup(9, play)}
									</Typography>

									<Typography variant='h6'>
										Trades per day
                				</Typography>
								</div>
							</div>
						</ReactWOW>
					</Grid>

					<Grid md={3} item>
						<ReactWOW animation='fadeIn' offset={300} callback={handlePlay}>
							<div className={classes.counterItem}>
								<PipsIcon />

								<div className={classes.text}>
									<Typography variant='h4'>
										~{countup(450, play)}
									</Typography>

									<Typography variant='h6'>
										Pips per month
                				</Typography>
								</div>
							</div>
						</ReactWOW>
					</Grid>

					<Grid md={3} item>
						<ReactWOW animation='fadeIn' offset={300} callback={handlePlay}>
							<div className={classes.counterItem}>
								<ExperienceIcon />

								<div className={classes.text}>
									<Typography variant='h4'>
										{countup(10, play)}+
								</Typography>

									<Typography variant='h6'>
										Years of Experience
                				</Typography>
								</div>
							</div>
						</ReactWOW>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Counter