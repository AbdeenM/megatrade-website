/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Divider, Drawer } from '@material-ui/core'
import EducationIcon from '@material-ui/icons/Book'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SubscriptionIcon from '@material-ui/icons/Payment'
import AccountIcon from '@material-ui/icons/AccountCircle'
import MarketIcon from '@material-ui/icons/MonetizationOn'
import VerifiedIcon from '@material-ui/icons/VerifiedUser'
import TradeSignalIcon from '@material-ui/icons/TrendingUp'
import DashboardUserIcon from '@material-ui/icons/DeveloperBoard'

import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import { AdminApi } from '../../../../config/Api'

const adminApi = new AdminApi()

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
	},
	title: {
		marginTop: theme.spacing(3)
	},
}))

const Sidebar = props => {
	const { open, variant, onClose, className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [profileState, setProfileState] = useState({
		avatar: '',
		lastName: '',
		firstName: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await adminApi.fetchAccount({ adminId })
		if (fetchAccountResult.error)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

		setProfileState({
			...profileState,
			avatar: fetchAccountResult.data.avatar || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || ''
		})
	}

	const pages = [
		{
			title: 'Dashboard',
			href: '/admin/dashboard',
			icon: <DashboardIcon />
		},
		{
			title: 'Real-Time Market',
			href: '/admin/market',
			icon: <MarketIcon />
		},
		{
			title: 'User Dashboard',
			href: '/admin/userDashboard',
			icon: <DashboardUserIcon />
		},
		{
			title: 'Trade Signals',
			href: '/admin/signals',
			icon: <TradeSignalIcon />
		},
		{
			title: 'Subscriptions',
			href: '/admin/subscriptions',
			icon: <SubscriptionIcon />
		},
		{
			title: 'Education',
			href: '/admin/education',
			icon: <EducationIcon />
		},
		{
			title: 'Users',
			href: '/admin/users',
			icon: <AccountIcon />
		},
		{
			title: 'Account',
			href: '/admin/account',
			icon: <VerifiedIcon />
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
				<Profile profile={profileState} />

				<Divider className={classes.divider} />

				<SidebarNav
					pages={pages}
					className={classes.nav} />
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