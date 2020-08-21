import clsx from 'clsx'
import Scrollspy from 'react-scrollspy'
import { useTheme } from '@material-ui/core/styles'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import React, { useState, useEffect, Fragment } from 'react'
import { useMediaQuery, AppBar, Button, IconButton, Container, Grid, Typography, Switch } from '@material-ui/core'

import navMenu from './menu'
import MobileMenu from './MobileMenu'
import useStyles from './header-style'

import 'vendors/hamburger-menu.css'

let counter = 0
function createData(name, url) {
	counter += 1
	return {
		id: counter,
		name,
		url,
	}
}

const Header = props => {
	const [fixed, setFixed] = useState(false)

	const userId = localStorage.getItem('userId')

	let flagFixed = false
	const handleScroll = () => {
		const doc = document.documentElement
		const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
		const newFlagFixed = (scroll > 80)
		if (flagFixed !== newFlagFixed) {
			setFixed(newFlagFixed)
			flagFixed = newFlagFixed
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
	}, [])

	const classes = useStyles()
	const theme = useTheme()
	const [isDark, setDark] = useState(theme.palette.type === 'dark' ? true : false)

	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
	const isMobile = useMediaQuery(theme.breakpoints.down('md'))
	const [menuList] = useState([
		createData(navMenu[0], '#' + navMenu[0]),
		createData(navMenu[1], '#' + navMenu[1]),
		createData(navMenu[2], '#' + navMenu[2]),
		createData(navMenu[3], '#' + navMenu[3]),
		createData(navMenu[4], '#' + navMenu[4]),
		createData(navMenu[5], '#' + navMenu[5])
	])

	const [openDrawer, setOpenDrawer] = useState(false)
	const handleOpenDrawer = () => {
		setOpenDrawer(!openDrawer)
	}

	const handleChangeMode = () => {
		setDark(!isDark)
		props.onToggleDark()
	}

	return (
		<Fragment>
			{isMobile && (<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />)}
			<AppBar
				position='relative'
				id='header'
				className={clsx(
					classes.header,
					fixed && classes.fixed,
					openDrawer && classes.openDrawer
				)}>
				<Container fixed>
					<div className={classes.headerContent}>
						<nav className={classes.navMenu}>
							{isMobile && (
								<IconButton
									onClick={handleOpenDrawer}
									className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}>
									<span className='hamburger-box'>
										<span className={clsx(classes.bar, 'hamburger-inner')} />
									</span>
								</IconButton>
							)}

							<div className={classes.logo}>
								<AnchorLink href='#home'>
									<img src='/images/sidebar-logo.png' alt='logo' />
								</AnchorLink>
							</div>

							{isDesktop && (
								<Scrollspy
									items={navMenu}
									currentClassName='active'>
									{menuList.map(item => (
										<li key={item.id.toString()}>
											<Button component={AnchorLink} href={item.url}>{item.name}</Button>
										</li>
									))}
								</Scrollspy>
							)}
						</nav>

						<nav className={classes.userMenu}>
							{isDesktop && <Typography component='div'>
								<Grid component='label' container alignItems='center' spacing={1}>
									<Grid item>Light</Grid>
									<Grid item>
										<Switch
											checked={isDark}
											onChange={handleChangeMode}
											value={isDark}
											inputProps={{ 'aria-label': 'checkbox' }}
										/>
									</Grid>
									<Grid item>Dark</Grid>
								</Grid>
							</Typography>}
						</nav>

						<nav className={classes.userMenu}>
							{userId
								? <Fragment>
									<Button variant='contained' color='primary' href='/dashboard'>My Account</Button>
								</Fragment>
								: <Fragment>
									{isDesktop && <Button href='/login'>Login</Button>}
									<Button variant='contained' color='primary' href='/register'>Register</Button>
									{isDesktop && <span className={classes.vDivider} />}
								</Fragment>}
						</nav>
					</div>
				</Container>
			</AppBar>
		</Fragment>
	)
}

export default Header
