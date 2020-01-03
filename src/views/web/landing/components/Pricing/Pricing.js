/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import StarIcon from '@material-ui/icons/StarBorder'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, Container } from '@material-ui/core'

import useStyles from './pricing-style'

const tiers = [
	{
		price: '0',
		durartion: '/mo',
		title: 'Free Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: 'Have a free membership for a life time with limited trading signals'
	},
	{
		price: '39.99',
		durartion: '/mo',
		title: 'Basic Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: 'Have a bronze membership for a month with unlimited trading signals'
	},
	{
		price: '39.99',
		durartion: '/mo',
		title: 'Bronze Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: 'Have a bronze membership for a month with unlimited trading signals'
	},
	{
		price: '99.99',
		durartion: '/3 mo',
		title: 'Silver Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: 'Have a silver membership for 3 month with unlimited trading signals'
	},
	{
		price: '169.99',
		durartion: '/6 mo',
		title: 'Gold Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: 'Have a gold membership for 6 month with unlimited trading signals'
	},
	{
		price: '299.99',
		durartion: '/yr',
		buttonVariant: 'contained',
		title: 'Platinum Membership',
		buttonText: 'Sign up for free',
		description: 'Have a platinum membership for a year with unlimited trading signals'
	}
]

export default function Pricing() {
	const classes = useStyles()

	return (
		<Container maxWidth='md' component='main'>
			<Typography gutterBottom variant='h3' align='center' display='block'>
				Pricing and Plan
     		 </Typography>

			<Typography gutterBottom variant='body1' align='center' display='block'>
				We provide various membership packages for all your needs, you can start with our <Typography color='primary' variant='h6' display='inline'>FREE</Typography> membership simply by signing up and upgrading anytime you feel like it!
      		</Typography>

			<div className={classes.pricingWrap}>
				<Grid container spacing={5} alignItems='flex-end'>
					{tiers.map(tier => (
						<Grid item key={tier.title} xs={12} sm={6} md={4}>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									className={classes.cardHeader}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									action={tier.title === 'Bronze Membership' ? <StarIcon /> : null} />

								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component='h2' variant='h3' color='textPrimary'>
											$ {tier.price}
										</Typography>

										<Typography variant='h6' color='textSecondary'>
											{tier.durartion}
										</Typography>
									</div>

									<Typography component='li' variant='subtitle1' align='center'>
										{tier.description}
									</Typography>
								</CardContent>

								<CardActions>
									<Button fullWidth variant={tier.buttonVariant} color='primary'>
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</Container>
	)
}
