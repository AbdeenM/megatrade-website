import React from 'react'
import StarIcon from '@material-ui/icons/StarBorder'
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography, Container } from '@material-ui/core'

import useStyles from './pricing-style'

const tiers = [
	{
		price: '0',
		durartion: '/wk',
		title: 'Free Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: ['Unlimited Trading Tools', 'Real Time Market News & Calendar']
	},
	{
		price: '2.99',
		durartion: '/wk',
		title: 'Basic Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: ['Unlimited Trading Tools', 'Real Time Market News & Calendar', 'Unlimited Trading Signals']
	},
	{
		price: '9.99',
		durartion: '/wk',
		title: 'Premium Membership',
		buttonVariant: 'contained',
		buttonText: 'Sign up for free',
		description: ['Unlimited Trading Tools', 'Real Time Market News & Calendar', 'Unlimited Trading Signals', 'Unlimited Community Chat Access']
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
									action={tier.title === 'Basic Membership' ? <StarIcon /> : null} />

								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component='h4' variant='h4' color='textPrimary'>
											$ {tier.price}
										</Typography>

										<Typography variant='h6' color='textSecondary'>
											{tier.durartion}
										</Typography>
									</div>

									{tier.description.map((item, i) => (
										<Typography component='li' variant='subtitle1' align='center'>
											{item}
										</Typography>))}
								</CardContent>

								<CardActions>
									<Button href='/login' fullWidth variant={tier.buttonVariant} color='primary'>
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
