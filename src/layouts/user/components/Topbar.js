import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'
import { Link as RouterLink } from 'react-router-dom'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core'

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

	const [notifications] = useState([])

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
					<IconButton color='inherit'>
						<Badge
							variant='dot'
							color='primary'
							badgeContent={notifications.length}>
							<NotificationsIcon />
						</Badge>
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