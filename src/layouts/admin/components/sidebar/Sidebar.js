/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import LogoutIcon from '@material-ui/icons/Input'
import React, { useState, useEffect } from 'react'
import EducationIcon from '@material-ui/icons/Book'
import LogsIcon from '@material-ui/icons/Assignment'
import MediaIcon from '@material-ui/icons/PermMedia'
import QuestionIcon from '@material-ui/icons/Message'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SubscriptionIcon from '@material-ui/icons/Payment'
import AccountIcon from '@material-ui/icons/AccountCircle'
import MarketIcon from '@material-ui/icons/MonetizationOn'
import VerifiedIcon from '@material-ui/icons/VerifiedUser'
import TradeSignalIcon from '@material-ui/icons/TrendingUp'
import LiveChatIcon from '@material-ui/icons/QuestionAnswer'
import DashboardUserIcon from '@material-ui/icons/DeveloperBoard'
import { Divider, Drawer, Button, ListItem } from '@material-ui/core'

import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import { AdminApi } from 'config/Api'

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
		padding: theme.spacing(2)
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
	item: {
		paddingTop: 0,
		display: 'flex',
		paddingBottom: 0
	},
	button: {
		width: '100%',
		letterSpacing: 0,
		padding: '10px 8px',
		textTransform: 'none',
		color: theme.palette.text,
		justifyContent: 'flex-start',
		fontWeight: theme.typography.fontWeightMedium
	},
	icon: {
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.icon,
		marginRight: theme.spacing(1)
	}
}))

const Sidebar = props => {
	const { open, variant, onClose, className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLogged, setLogged] = useState(true)
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

	const onSignOut = () => {
		localStorage.setItem('userId', '')
		setLogged(false)
	}

	const admin = [
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
			title: 'Account',
			href: '/admin/account',
			icon: <VerifiedIcon />
		}
	]

	const users = [
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
			title: 'Education',
			href: '/admin/education',
			icon: <EducationIcon />
		},
		{
			title: 'Subscriptions',
			href: '/admin/subscriptions',
			icon: <SubscriptionIcon />
		},
		{
			title: 'Users',
			href: '/admin/users',
			icon: <AccountIcon />
		}
	]

	const marketing = [
		{
			title: 'Social Media',
			href: '/admin/social',
			icon: <MediaIcon />
		},
		{
			title: 'Questions',
			href: '/admin/questions',
			icon: <QuestionIcon />
		},
		{
			title: 'Live Chat',
			href: '/admin/support',
			icon: <LiveChatIcon />
		}
	]

	const tech = [
		{
			title: 'Logs',
			href: '/admin/logs',
			icon: <LogsIcon />
		}
	]

	if (!isLogged)
		return <Redirect to='/' />

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
					pages={admin}
					className={classes.nav} />

				<Divider className={classes.divider} />

				<SidebarNav
					pages={users}
					className={classes.nav} />

				<Divider className={classes.divider} />

				<SidebarNav
					pages={marketing}
					className={classes.nav} />

				<Divider className={classes.divider} />

				<SidebarNav
					pages={tech}
					className={classes.nav} />

				<Divider className={classes.divider} />

				<ListItem
					disableGutters
					className={classes.item}>
					<Button
						onClick={onSignOut}
						className={classes.button}>
						<div className={classes.icon}>
							<LogoutIcon />
						</div>
						Log Out
					</Button>
				</ListItem>

				<Divider className={classes.divider} />
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