/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Container, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Link, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: {},
	content: {
		padding: theme.spacing(8, 0, 6)
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

const FAQ = () => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Container
				className={classes.content}>
				<Typography gutterBottom variant='h3' align='center' display='block'>
					FAQ
				</Typography>

				<Typography gutterBottom variant='body1' align='center' display='block'>
					Here are the most frequently asked questions we get
		        </Typography>
			</Container>

			<Container>
				<Grid
					container
					spacing={4}>
					<Grid
						item
						lg={6}
						sm={6}
						xl={6}
						xs={6}>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									variant='h6'
									color='primary'>
									How do i get a free account?
								</Typography>
							</ExpansionPanelSummary>

							<ExpansionPanelDetails>
								<Typography
									variant='body1'>
									By creating an account you automatically get a free membership for a life time, simply go click on Login and sign up or follow this{' '}
									<Link
										variant='body1'
										to='/sign-up'
										component={RouterLink}>
										link
                  					</Link>
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>

					<Grid
						item
						lg={6}
						sm={6}
						xl={6}
						xs={6}>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									variant='h6'
									color='primary'>
									I am not recieving the signals via email, is it a bug?
								</Typography>
							</ExpansionPanelSummary>

							<ExpansionPanelDetails>
								<Typography
									variant='body1'>
									No it is not a bug, please check that you have the correct email associated with mega trade. (You can login and go to your account section from the dashboard).
									If it is the correct email, check your Junk folder as your email account maybe forwarding the alerts to your junk folder.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={4}>
					<Grid
						item
						lg={6}
						sm={6}
						xl={6}
						xs={6}>
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography
									variant='h6'
									color='primary'>
									How do i renew my account?
								</Typography>
							</ExpansionPanelSummary>

							<ExpansionPanelDetails>
								<Typography
									variant='body1'>
									You can easily subscribe to any of our memebership packages from your personal dashboard navigate to subscriptions and get a membership.
								</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default FAQ 