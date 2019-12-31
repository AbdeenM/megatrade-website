/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Button, Hidden, Container } from '@material-ui/core'

import BannerVideo from './components/BannerVideo'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		backgroundSize: 'cover',
		backgroundColor: '#7fc7d9',
		backgroundPosition: 'center',
		justifyContent: 'space-around',
		color: theme.palette.common.white,
		backgroundImage: 'url(/images/banner-background.png)',
		[theme.breakpoints.up('sm')]: {
			height: '80vh',
			minHeight: 500,
			maxHeight: 1300
		}
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column'
	},
	button: {
		minWidth: 200
	},
	h4: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(5)
		}
	},
	more: {
		marginTop: theme.spacing(2)
	}
}))

const Banner = () => {
	const classes = useStyles()

	return (
		<section className={classes.root}>
			<Container className={classes.container}>
				<Hidden mdDown>
					<BannerVideo />
				</Hidden>
			</Container>

			<Container className={classes.container}>
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
					to='/sign-in'
					color='secondary'
					variant='contained'
					component={RouterLink}
					className={classes.button}>
					Subscribe Now!
				</Button>

				<Typography
					align='center'
					color='inherit'
					className={classes.more}>
					To get your unlimited trading signals
				</Typography>
			</Container>
		</section>
	)
}

export default Banner