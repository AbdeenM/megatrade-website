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
import LiveChatIcon from '@material-ui/icons/Chat'
//import EducationIcon from '@material-ui/icons/Book'
import GroupChatIcon from '@material-ui/icons/Forum'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SubscriptionIcon from '@material-ui/icons/Payment'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ContactUsIcon from '@material-ui/icons/ContactMail'
import MarketIcon from '@material-ui/icons/MonetizationOn'
import { Divider, Drawer, Button, ListItem } from '@material-ui/core'

import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import { UserApi } from 'config/Api'
import UpgradePlan from './components/UpgradePlan'

const userApi = new UserApi()

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
		color: theme.palette.text.main,
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

	const userId = localStorage.getItem('userId')

	const [isLogged, setLogged] = useState(true)
	const [profileState, setProfileState] = useState({
		avatar: '',
		lastName: '',
		firstName: '',
		membership: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })
		if (fetchAccountResult.error)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

		setProfileState({
			...profileState,
			avatar: fetchAccountResult.data.avatar || '',
			lastName: fetchAccountResult.data.lastName || '',
			firstName: fetchAccountResult.data.firstName || '',
			membership: fetchAccountResult.data.membership || ''
		})
	}

	const onSignOut = () => {
		localStorage.setItem('userId', '')
		setLogged(false)
	}

	const pages = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <DashboardIcon />
		},
		{
			href: '/market',
			title: 'Real Time Market',
			icon: <MarketIcon />
		},
		// {
		// 	title: 'Education',
		// 	href: '/education',
		// 	icon: <EducationIcon />
		// },
		{
			title: 'Account',
			href: '/account',
			icon: <AccountIcon />
		},
		{
			title: 'Subscriptions',
			href: '/subscriptions',
			icon: <SubscriptionIcon />
		},
		{
			title: 'Group Chat',
			href: '/group-chat',
			icon: <GroupChatIcon />
		},
		{
			title: 'Live Chat',
			href: '/support',
			icon: <LiveChatIcon />
		},
		{
			title: 'Contact Us',
			href: '/contact-us',
			icon: <ContactUsIcon />
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
					pages={pages}
					className={classes.nav} />

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

				{
					profileState.membership === 'Free Membership'
						? <UpgradePlan />
						: <div />
				}
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