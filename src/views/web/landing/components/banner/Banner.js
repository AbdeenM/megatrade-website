/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Button } from '@material-ui/core'

import BannerLayout from './components/BannerLayout'

const useStyles = makeStyles(theme => ({
	background: {
		backgroundColor: '#7fc7d9', // Average color of the background image.
		backgroundPosition: 'center',
		backgroundImage: `url(/images/banner-background.png)`
	},
	button: {
		minWidth: 200
	},
	h4: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(10)
		}
	},
	more: {
		marginTop: theme.spacing(2)
	}
}))

const Banner = () => {
	const classes = useStyles()

	return (
		<BannerLayout backgroundClassName={classes.background}>
			<img
				alt='increase priority'
				style={{ display: 'none' }}
				src='/images/banner-background.png' />

			<Typography
				variant='h1'
				align='center'
				color='inherit'
				marked='center'>
				World Class Trading Signals
      		</Typography>

			<Typography
				variant='h4'
				align='center'
				color='inherit'
				className={classes.h4}>
				99% Successful signal trades. We provide all you need to make the right trades.
      		</Typography>

			<Button
				size='large'
				color='secondary'
				variant='contained'
				component={RouterLink}
				to='/subscription-plans'
				className={classes.button}>
				Subscribe Now!
      		</Button>

			<Typography
				color='inherit'
				variant='caption'
				className={classes.more}>
				Discover the experience
      		</Typography>
		</BannerLayout>
	)
}

export default Banner