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
import InputIcon from '@material-ui/icons/Input'
import { makeStyles } from '@material-ui/styles'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core'

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

const Topbar = props => {
	const { className, onSidebarOpen, history, ...rest } = props

	const classes = useStyles()

	const [isLogged, setLogged] = useState(true)

	const onSignOut = () => {
		localStorage.setItem('adminId', '')
		setLogged(false)
	}

	if (!isLogged)
		return <Redirect to='/' />

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

				<Hidden mdDown>
					<IconButton
						color='inherit'
						onClick={onSignOut}
						className={classes.signOutButton}>
						<InputIcon />
					</IconButton>
				</Hidden>

				<Hidden lgUp>
					<IconButton
						color='inherit'
						onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
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