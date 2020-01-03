/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'
import { Link as RouterLink } from 'react-router-dom'
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