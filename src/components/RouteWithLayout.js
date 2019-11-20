/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

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