/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import StarIcon from '@material-ui/icons/StarBorder'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Card, CardHeader, CardActions, CardContent, Grid, Typography, Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	content: {
		padding: theme.spacing(8, 0, 6)
	},
	cardHeader: {
		backgroundColor: theme.palette.primary.light
	},
	cardPricing: {
		display: 'flex',
		alignItems: 'baseline',
		justifyContent: 'center',
		marginBottom: theme.spacing(2)
	}
}))

const tiers = [
	{
		price: '0',
		period: '/mo',
		title: 'Free Membership',
		buttonText: 'Get Started',
		buttonVariant: 'contained',
		description: 'Have a free membership for a life time with limited trading signals'
	},
	{
		period: '/wk',
		price: '14.99',
		title: 'Basic Membership',
		buttonText: 'Get Started',
		buttonVariant: 'contained',
		description: 'Have a basic membership for a week with unlimited trading signals'
	},
	{
		period: '/mo',
		price: '39.99',
		subheader: 'Most popular',
		buttonText: 'Get Started',
		title: 'Bronze Membership',
		buttonVariant: 'contained',
		description: 'Have a bronze membership for a month with unlimited trading signals'
	},
	{
		period: '/3 mo',
		price: '99.99',
		title: 'Silver Membership',
		buttonText: 'Get Started',
		buttonVariant: 'contained',
		description: 'Have a silver membership for 3 month with unlimited trading signals'
	},
	{
		period: '/6 mo',
		price: '169.99',
		title: 'Gold Membership',
		buttonText: 'Get Started',
		buttonVariant: 'contained',
		description: 'Have a gold membership for 6 month with unlimited trading signals'
	},
	{
		period: '/yr',
		price: '299.99',
		buttonText: 'Get Started',
		buttonVariant: 'contained',
		title: 'Platinum Membership',
		description: 'Have a platinum membership for a year with unlimited trading signals'
	}
]

const Pricing = () => {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			<Container
				component='main'
				className={classes.content}>
				<Typography
					gutterBottom
					variant='h1'
					align='center'
					component='h1'
					color='textPrimary'>
					Pricing
				</Typography>

				<Typography
					variant='h5'
					component='p'
					align='center'
					color='textSecondary'>
					We provide various membership packages for all your needs.
		        </Typography>
			</Container>

			<Container component='main'>
				<Grid
					container
					spacing={5}
					alignItems='flex-end'>
					{
						tiers.map((tier, i) => (
							<Grid
								item
								md={4}
								xs={12}
								key={i}
								sm={tier.title === 'Bronze Membership' ? 12 : 6}>
								<Card>
									<CardHeader
										title={tier.title}
										subheader={tier.subheader}
										className={classes.cardHeader}
										titleTypographyProps={{ align: 'center' }}
										subheaderTypographyProps={{ align: 'center' }}
										action={tier.title === 'Bronze Membership' ? <StarIcon color='primary' /> : null} />

									<CardContent>
										<div className={classes.cardPricing}>
											<Typography
												variant='h3'
												component='h2'
												color='textPrimary'>
												${tier.price}
											</Typography>

											<Typography
												variant='h6'
												color='textSecondary'>
												{tier.period}
											</Typography>
										</div>

										<Typography
											align='center'
											component='li'
											variant='subtitle1'>
											{tier.description}
										</Typography>
									</CardContent>

									<CardActions>
										<Button
											fullWidth
											to='/sign-up'
											component={RouterLink}
											variant={tier.buttonVariant}
											color={tier.title === 'Bronze Membership' ? 'secondary' : 'primary'}>
											{tier.buttonText}
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))
					}
				</Grid>
			</Container>
		</div>
	)
}

export default Pricing