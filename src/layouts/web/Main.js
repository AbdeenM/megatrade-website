import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import Footer from './components/Footer'

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		height: '100%'
	}
}))

const Main = props => {
	const { children } = props

	const classes = useStyles()

	return (
		<div className={clsx({ [classes.root]: true })}>
			<main className={classes.content}>
				{children}

				<Footer />
			</main>
		</div>
	)
}

Main.propTypes = {
	children: PropTypes.node
}

export default Main