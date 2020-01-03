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
						<ReactWOW animation='fadeInLeft' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								Lorem ipsum dolor
            		  		</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInLeft' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' className={classes.text}>
								Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.
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
								<img src='http://via.placeholder.com/1280x640/01579B/FFFFFF/' alt='img' />
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
								<img src='http://via.placeholder.com/1280x640/01579B/FFFFFF/' alt='img' />
							</figure>
						</ReactWOW>
					</div>
				</Grid>

				<Grid md={6} item>
					<div className={classes.featureItem}>
						<ReactWOW animation='fadeInRight' duration='0.6s'>
							<Typography variant='h3' className={classes.title}>
								Lorem ipsum dolor
          			    	</Typography>
						</ReactWOW>

						<ReactWOW animation='fadeInRight' delay='0.3s' duration='0.6s'>
							<Typography variant='body1' className={classes.text}>
								Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.
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
									Lorem ipsum dolor
                				</Typography>
							</ReactWOW>

							<ReactWOW animation='fadeInUp' delay='0.3s' duration='0.6s'>
								<Typography variant='body1' className={classes.text}>
									Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus.
               				 	</Typography>
							</ReactWOW>

							<ReactWOW animation='zoomIn' delay='0.3s' duration='0.6s'>
								<div className={classes.deco2} />
							</ReactWOW>

							<ReactWOW animation='fadeInUp' delay='0.5s' duration='0.6s'>
								<figure className={classes.imgFull}>
									<img src='http://via.placeholder.com/1280x640/01579B/FFFFFF/' alt='img' />
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
