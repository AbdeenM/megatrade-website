/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import Scrollspy from 'react-scrollspy'
import { Fab, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ArrowIcon from '@material-ui/icons/ArrowUpward'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import navMenu from '../Header/menu'
import useStyles from './pagenav-style'

function createData(id, name, url) {
	return {
		id,
		url,
		name
	}
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
	return <AnchorLink to={props.to} {...props} />
})

const PageNav = props => {
	const [show, setShow] = useState(false)
	let flagShow = false

	const handleScroll = () => {
		const doc = document.documentElement
		const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
		const newFlagShow = (scroll > 500)
		if (flagShow !== newFlagShow) {
			setShow(newFlagShow)
			flagShow = newFlagShow
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
	}, [])

	const classes = useStyles()
	const [menuList] = useState([
		createData(1, navMenu[0], '#' + navMenu[0].replace(/ /g, '_')),
		createData(2, navMenu[1], '#' + navMenu[1].replace(/ /g, '_')),
		createData(3, navMenu[2], '#' + navMenu[2].replace(/ /g, '_')),
		createData(4, navMenu[3], '#' + navMenu[3].replace(/ /g, '_')),
		createData(5, navMenu[4], '#' + navMenu[4].replace(/ /g, '_')),
		createData(6, navMenu[5], '#' + navMenu[5].replace(/ /g, '_')),
	])

	return (
		<div className={clsx(classes.pageNav, show && classes.show)}>
			<Tooltip
				title='To Top'
				placement='left'
				classes={{
					tooltip: classes.tooltip
				}}>
				<Fab
					href='#home'
					color='primary'
					aria-label='To top'
					component={LinkBtn}
					className={classes.fab}>
					<ArrowIcon />
				</Fab>
			</Tooltip>

			<nav className={classes.sectionNav}>
				<Scrollspy
					items={navMenu}
					currentClassName='active'>
					{menuList.map(item => (
						<li
							data-id={item.id}
							key={item.id.toString()}
							style={{ top: 30 * (navMenu.length - item.id) }}>
							<Tooltip
								title={item.name}
								placement='left'
								classes={{ tooltip: classes.tooltip }}>
								<AnchorLink href={item.url} />
							</Tooltip>
						</li>
					))}
				</Scrollspy>
			</nav>
		</div>
	)
}

export default PageNav
