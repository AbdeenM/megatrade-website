/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import ImageIcon from '@material-ui/icons/Image'
import { makeStyles } from '@material-ui/styles'
import PeopleIcon from '@material-ui/icons/People'
import { Divider, Drawer } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import SettingsIcon from '@material-ui/icons/Settings'
import DashboardIcon from '@material-ui/icons/Dashboard'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

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
		backgroundColor: theme.palette.white,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		padding: theme.spacing(2)
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
			title: 'Users',
			href: '/users',
			icon: <PeopleIcon />
		},
		{
			title: 'Products',
			href: '/products',
			icon: <ShoppingBasketIcon />
		},
		{
			title: 'Authentication',
			href: '/sign-in',
			icon: <LockOpenIcon />
		},
		{
			title: 'Typography',
			href: '/typography',
			icon: <TextFieldsIcon />
		},
		{
			title: 'Icons',
			href: '/icons',
			icon: <ImageIcon />
		},
		{
			title: 'Account',
			href: '/account',
			icon: <AccountBoxIcon />
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: <SettingsIcon />
		}
	]

	return (
		<Drawer
			anchor='left'
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div
				{...rest}
				className={clsx(classes.root, className)}
			>
				<Profile />
				<Divider className={classes.divider} />
				<SidebarNav
					className={classes.nav}
					pages={pages}
				/>
				<UpgradePlan />
			</div>
		</Drawer>
	)
}

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
}

export default Sidebar