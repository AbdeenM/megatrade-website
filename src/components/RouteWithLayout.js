import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const RouteWithLayout = props => {
	const { layout: Layout, component: Component, ...rest } = props

	return (
		<Route
			{...rest}
			render={matchProps => (
				<Layout>
					<Component {...matchProps} />
				</Layout>
			)} />
	)
}

RouteWithLayout.propTypes = {
	path: PropTypes.string,
	layout: PropTypes.any.isRequired,
	component: PropTypes.any.isRequired
}

export default RouteWithLayout