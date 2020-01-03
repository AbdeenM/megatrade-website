/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import PropTypes from 'prop-types'
import React, { useState } from 'react'
import LangIcon from '@material-ui/icons/Language'
import { useTheme } from '@material-ui/core/styles'
import TwitterIcon from 'react-ionicons/lib/LogoTwitter'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FacebookIcon from 'react-ionicons/lib/LogoFacebook'
import InstagramIcon from 'react-ionicons/lib/LogoInstagram'
import { IconButton, Select, Link, MenuItem, Container, Grid, ExpansionPanel, ExpansionPanelDetails, useMediaQuery, ExpansionPanelSummary, InputAdornment, OutlinedInput, Typography } from '@material-ui/core'

import useStyles from './footer-style'

const company = {
	title: 'Company',
	description: ['Features', 'Testimonials', 'Pricing', 'Contact Us'],
	link: ['#feature', '#testimonials', '#pricing', '#contact']
}

const legal = {
	title: 'Legal',
	description: ['Privacy policy', 'Terms of use'],
	link: ['/policy', '/terms'],
}

const Footer = props => {
	// Theme breakpoints
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const classes = useStyles()
	const [values, setValues] = useState({
		lang: 'en'
	})

	// useEffect(() => {
	// 	setValues({ lang: i18n.language })
	// }, [])

	// 	if (event.target.value === 'ar') {
	// 		i18n.changeLanguage('ar')
	// 		props.toggleDir('rtl')
	// 	} else {
	// 		i18n.changeLanguage(event.target.value)
	// 		props.toggleDir('ltr')
	// 	}
	// }

	const handleChange = event => {
		setValues(oldValues => ({
			...oldValues,
			[event.target.name]: event.target.value,
		}))
	}

	return (
		<Container maxWidth='lg' component='footer' className={classes.footer}>
			<Grid container spacing={4}>
				<Grid item xs={12} md={3}>
					<div className={classes.logo}>
						<img src='images/sidebar-logo.png' alt='logo' />
					</div>

					<Typography className={classes.title} color='textPrimary' gutterBottom>
						Mega Trade Inc.
					</Typography>

					<Typography color='textPrimary' className={classes.footerDesc} gutterBottom>
						World Class Trading Signals
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Grid container spacing={4} justify='space-evenly'>
						<Grid item xs={12} md={3} className={classes.siteMapItem}>
							{isDesktop && (
								<div>
									<Typography variant='h6' className={classes.title} color='textPrimary' gutterBottom>
										{company.title}
									</Typography>
									<ul>
										{company.description.map((item, index) => (
											<li key={item}>
												<Link href={company.link[index]} variant='subtitle1' color='textSecondary'>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</div>
							)}

							{isMobile && (
								<ExpansionPanel
									square
									classes={{
										root: classes.accordionRoot,
									}}>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
										id='panel1a-header'
										aria-controls='panel1a-content'
										classes={{
											content: classes.accordionContent,
										}}>
										<strong>
											{company.title}
										</strong>
									</ExpansionPanelSummary>

									<ExpansionPanelDetails>
										<ul>
											{company.description.map((item, index) => (
												<li key={item}>
													<Link href={company.link[index]} variant='subtitle1' color='textSecondary'>
														{item}
													</Link>
												</li>
											))}
										</ul>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							)}
						</Grid>


						<Grid item xs={12} md={3} className={classes.siteMapItem}>
							{isDesktop && (
								<div>
									<Typography variant='h6' className={classes.title} color='textPrimary' gutterBottom>
										{legal.title}
									</Typography>
									<ul>
										{legal.description.map((item, index) => (
											<li key={item}>
												<Link rel='noopener noreferrer' target='_blank' href={legal.link[index]} variant='subtitle1' color='textSecondary'>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</div>
							)}

							{isMobile && (
								<ExpansionPanel
									square
									classes={{
										root: classes.accordionRoot,
									}}>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
										id='panel1a-header'
										aria-controls='panel1a-content'
										classes={{
											content: classes.accordionContent,
										}}>
										<strong>
											{legal.title}
										</strong>
									</ExpansionPanelSummary>

									<ExpansionPanelDetails>
										<ul>
											{legal.description.map((item, index) => (
												<li key={item}>
													<Link rel='noopener noreferrer' target='_blank' href={legal.link[index]} variant='subtitle1' color='textSecondary'>
														{item}
													</Link>
												</li>
											))}
										</ul>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							)}
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} md={3}>
					<div className={classes.socmed}>
						<Link rel='noopener noreferrer' target='_blank' href='https://facebook.com/megatrade.world'>
							<IconButton aria-label='Delete' className={classes.margin} size='small'>
								<FacebookIcon fontSize='64' />
							</IconButton>
						</Link>

						<Link rel='noopener noreferrer' target='_blank' href='https://twitter.com/Mega%20TradeWorld'>
							<IconButton aria-label='Delete' className={classes.margin} size='small'>
								<TwitterIcon fontSize='64px' />
							</IconButton>
						</Link>

						<Link rel='noopener noreferrer' target='_blank' href='https://instagram.com/megatrade.world'>
							<IconButton aria-label='Delete' className={classes.margin} size='small'>
								<InstagramIcon fontSize='64px' />
							</IconButton>
						</Link>
					</div>

					<Select
						value={values.lang}
						onChange={handleChange}
						startAdornment={(
							<InputAdornment className={classes.icon} position='start'>
								<LangIcon />
							</InputAdornment>
						)}
						className={classes.selectLang}
						input={<OutlinedInput labelWidth={200} name='lang' id='outlined-lang-simple' />}>
						<MenuItem value='en'>English</MenuItem>
						<MenuItem value='de'>Deutsch</MenuItem>
						<MenuItem value='ar'>العربيّة</MenuItem>
						<MenuItem value='id'>Bahasa Indonesia</MenuItem>
						<MenuItem value='pt'>Português</MenuItem>
						<MenuItem value='zh'>简体中文</MenuItem>
					</Select>
				</Grid>
			</Grid>
		</Container>
	)
}

Footer.propTypes = {
	toggleDir: PropTypes.func
}

Footer.defaultProps = {
	toggleDir: () => { }
}

export default Footer
