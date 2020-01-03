/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useStyles from './header-style'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { Divider, ListItem, List, ListItemText } from '@material-ui/core'


import navMenu from './menu'

const MobileMenu = props => {
	const classes = useStyles()
	const { toggleDrawer, open } = props

	const userId = localStorage.getItem('userId')

	const SideList = () => (
		<div
			className={classes.mobileNav}
			role='presentation'
			onClick={toggleDrawer}
			onKeyDown={toggleDrawer}>
			<div className={clsx(classes.menu, open && classes.menuOpen)}>
				<List>
					{navMenu.map((item, index) => (
						<ListItem
							button
							component='a'
							href={`#${item}`}
							key={item}
							index={index.toString()}
							style={{ animationDuration: index * 0.15 + 's' }}>
							<ListItemText primary={item} className={classes.menuList} />
						</ListItem>
					))}
				</List>

				<Divider />

				<List>
					{userId
						? <Fragment>
							<ListItem
								button
								component='a'
								href='/dashboard'
								style={{ animationDuration: (0 + navMenu.length) * 0.15 + 's' }}>
								<ListItemText className={classes.menuList} primary='My Account' />
							</ListItem>
						</Fragment>
						: <Fragment>
							{['login', 'register'].map((text, index) => (
								<ListItem
									component='a'
									href={`/${text}`}
									button
									key={text}
									index={index.toString()}
									style={{ animationDuration: (index + navMenu.length) * 0.15 + 's' }}>
									<ListItemText className={classes.menuList} primary={text} />
								</ListItem>
							))}
						</Fragment>}
				</List>
			</div>
		</div>
	)

	return (
		<SwipeableDrawer
			open={open}
			onClose={toggleDrawer}
			onOpen={toggleDrawer}
			classes={{
				paper: classes.paperNav
			}}
		>
			<SideList />
		</SwipeableDrawer>
	)
}


MobileMenu.propTypes = {
	toggleDrawer: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
}

export default MobileMenu
