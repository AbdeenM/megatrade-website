import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import HomeIcon from 'react-ionicons/lib/IosHomeOutline'
import { IconButton, Hidden, Paper, Typography, Container, Grid } from '@material-ui/core'

import useStyles from '../../form-style'

const AuthFrame = props => {
	const classes = useStyles()
	const { children, title, subtitle } = props

	return (
		<div className={classes.pageWrap}>
			<Hidden mdUp>
				<div className={clsx(classes.logo, classes.logoHeader)}>
					<a href='/'>
						<img src='/images/sidebar-logo.png' alt='logo' />

						<Typography variant='h3'>
							Mega Trade
						</Typography>
					</a>
				</div>
			</Hidden>

			<Container maxWidth='lg' className={classes.innerWrap}>
				<Paper className={clsx(classes.formBox, 'fragment-fadeUp')}>
					<IconButton href='/' className={classes.backtohome}>
						<HomeIcon />
					</IconButton>

					<div className={classes.authFrame}>
						<Grid container spacing={0}>
							<Grid item md={5} xs={12}>
								<Hidden smDown>
									<div className={classes.greeting}>
										<div className={classes.logo}>
											<img src='/images/sidebar-logo.png' alt='logo' />

											<Typography variant='h3'>
												Mega Trade
											</Typography>
										</div>

										<Typography gutterBottom variant='h4'>
											{title}
										</Typography>

										<Typography variant='h6'>
											{subtitle}
										</Typography>
									</div>
								</Hidden>
							</Grid>

							<Grid item md={7} xs={12}>
								<div className={classes.formWrap}>
									{children}
								</div>
							</Grid>
						</Grid>
					</div>
				</Paper>
			</Container>
		</div>
	)
}

AuthFrame.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
}

AuthFrame.defaultProps = {
	subtitle: '',
}

export default AuthFrame
