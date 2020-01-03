/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Hidden, IconButton, Grid, Switch, Typography, useMediaQuery, useTheme } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none'
	},
	flexGrow: {
		flexGrow: 1
	},
	signOutButton: {
		marginLeft: theme.spacing(1)
	}
}))

let themeType = 'light'
if (typeof Storage !== 'undefined')
	themeType = localStorage.getItem('theme') || 'light'

const Topbar = props => {
	const { className, onSidebarOpen, history, ...rest } = props

	const theme = useTheme()
	const classes = useStyles()
	const [isDark, setDark] = useState(themeType === 'dark')

	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

	console.log('============================');
	console.log(props);

	const handleChangeMode = () => {
		setDark(!isDark)
		props.onToggleDark()
	}

	return (
		<AppBar
			{...rest}
			className={clsx(classes.root, className)}>
			<Toolbar>
				<RouterLink to='/'>
					<img
						alt='logo'
						src='/images/logo-white.png' />
				</RouterLink>

				<div className={classes.flexGrow} />

				<Hidden lgUp>
					<IconButton
						color='inherit'
						onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>

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
			</Toolbar>
		</AppBar>
	)
}

Topbar.propTypes = {
	history: PropTypes.object,
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func
}

export default Topbar