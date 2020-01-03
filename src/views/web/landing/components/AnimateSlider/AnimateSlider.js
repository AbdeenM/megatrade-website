/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import Slider from 'react-animated-slider'
import { Typography, Button, Grid } from '@material-ui/core'

import useStyles from './slider-style'

import 'vendors/animate-slider.css'
import 'react-animated-slider/build/horizontal.css'

const AnimateSlider = () => {
	const classes = useStyles()

	return (
		<div className={classes.heroContent}>
			<Slider className='slider-wrapper'>
				<div
					className='slider-content'
					style={{ background: 'url(/images/banner-main.jpeg) no-repeat center center' }}>
					<div className='inner'>
						<Typography variant='h1'>World Class Trading Signals</Typography>
						<Typography variant='body1'>99% Successful signal trades. We provide all you need to make the right trades.</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify='center'>
								<Grid item>
									<Button variant='contained' color='secondary'>
										Main call to action
                    					</Button>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	)
}

AnimateSlider.getInitialProps = async () => ({
	namespacesRequired: ['common', 'starter-landing']
})

export default AnimateSlider
