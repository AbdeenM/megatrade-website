/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		backgroundColor: theme.palette.background.default
	},
	container: {
		display: 'flex',
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	iconsWrapper: {
		height: 120,
	},
	icons: {
		display: 'flex',
	},
	icon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: theme.spacing(1),
		backgroundColor: 'transperent',
		'&:hover': {
			backgroundColor: theme.palette.primary.light
		}
	},
	list: {
		margin: 0,
		paddingLeft: 0,
		listStyle: 'none'
	},
	listItem: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5)
	},
	language: {
		width: 150,
		marginTop: theme.spacing(1)
	}
}))

const LANGUAGES = [
	{
		code: 'en-US',
		name: 'English'
	}
]

const Footer = () => {
	const classes = useStyles()

	return (
		<Typography
			component='footer'
			className={classes.root}>
			<Container className={classes.container}>
				<Grid container spacing={5}>
					<Grid
						item
						xs={6}
						sm={4}
						md={3}>
						<Grid
							container
							spacing={2}
							justify='flex-end'
							direction='column'
							className={classes.iconsWrapper}>
							<Grid item className={classes.icons}>
								<a
									target='_blank'
									className={classes.icon}
									rel='noopener noreferrer'
									href='https://facebook.com/megatrade.world'>
									<img
										alt='facebook'
										src='/images/footer-facebook.png' />
								</a>

								<a
									target='_blank'
									className={classes.icon}
									rel='noopener noreferrer'
									href='https://twitter.com/MegaTradeWorld'>
									<img
										alt='twitter'
										src='/images/footer-twitter.png' />
								</a>

								<a
									target='_blank'
									className={classes.icon}
									rel='noopener noreferrer'
									href='https://instagram.com/megatrade.world'>
									<img
										alt='instagram'
										src='/images/footer-instagram.png' />
								</a>
							</Grid>
						</Grid>
					</Grid>

					<Grid
						item
						xs={6}
						sm={4}
						md={2}>
						<Typography
							variant='h6'
							marked='left'
							gutterBottom>
							Account
            			</Typography>

						<ul className={classes.list}>
							<li className={classes.listItem}>
								<Link href='/sign-in'>Login</Link>
							</li>

							<li className={classes.listItem}>
								<Link href='/sign-up'>Register</Link>
							</li>
						</ul>
					</Grid>

					<Grid
						item
						xs={6}
						sm={4}
						md={2}>
						<Typography
							variant='h6'
							marked='left'
							gutterBottom>
							Legal
            			</Typography>

						<ul className={classes.list}>
							<li className={classes.listItem}>
								<Link href='/terms'>Terms of Service</Link>
							</li>

							<li className={classes.listItem}>
								<Link href='/privacy'>Privacy Policy</Link>
							</li>
						</ul>
					</Grid>

					<Grid
						item
						xs={6}
						sm={8}
						md={4}>
						<Typography
							variant='h6'
							marked='left'
							gutterBottom>
							Language
            			</Typography>

						<TextField
							select
							className={classes.language}
							SelectProps={{ native: true }}>
							{
								LANGUAGES.map(language => (
									<option
										key={language.code}
										value={language.code}>
										{language.name}
									</option>
								))
							}
						</TextField>
					</Grid>
				</Grid>
			</Container>
		</Typography>
	)
}

export default Footer