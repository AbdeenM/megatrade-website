/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Divider, Drawer } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SubscriptionIcon from '@material-ui/icons/Payment'
import AccountIcon from '@material-ui/icons/AccountCircle'

import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import UpgradePlan from './components/UpgradePlan'

const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)'
		}
	},
	root: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(2),
		backgroundColor: theme.palette.white
	},
	divider: {
		margin: theme.spacing(2, 0)
	},
	nav: {
		marginBottom: theme.spacing(2)
	}
}))

const Sidebar = props => {
	const { open, variant, onClose, className, ...rest } = props

	const classes = useStyles()

	const pages = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <DashboardIcon />
		},
		{
			title: 'Account',
			href: '/account',
			icon: <AccountIcon />
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: <SettingsIcon />
		},
		{
			title: 'Subscription',
			href: '/subscription',
			icon: <SubscriptionIcon />
		}
	]

	return (
		<Drawer
			open={open}
			anchor='left'
			onClose={onClose}
			variant={variant}
			classes={{ paper: classes.drawer }}>
			<div
				{...rest}
				className={clsx(classes.root, className)}>
				<Profile />

				<Divider className={classes.divider} />

				<SidebarNav
					pages={pages}
					className={classes.nav} />

				<UpgradePlan />
			</div>
		</Drawer>
	)
}

Sidebar.propTypes = {
	onClose: PropTypes.func,
	className: PropTypes.string,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
}

export default Sidebar