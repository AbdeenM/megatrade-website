/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		color: theme.palette.common.white,
		[theme.breakpoints.up('sm')]: {
			height: '80vh',
			minHeight: 500,
			maxHeight: 1300,
		}
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	backdrop: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
		opacity: 0.5,
		position: 'absolute',
		backgroundColor: theme.palette.common.black
	},
	background: {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -2,
		position: 'absolute',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	}
}))

const BannerLayout = props => {
	const { backgroundClassName, children } = props

	const classes = useStyles()

	return (
		<section className={classes.root}>
			<Container className={classes.container}>
				{children}

				<div className={classes.backdrop} />

				<div className={clsx(classes.background, backgroundClassName)} />
			</Container>
		</section>
	)
}

BannerLayout.propTypes = {
	children: PropTypes.node.isRequired,
	backgroundClassName: PropTypes.string.isRequired
}

export default BannerLayout