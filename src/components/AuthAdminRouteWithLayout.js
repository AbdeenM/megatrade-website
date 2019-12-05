/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const AuthAdminRouteWithLayout = props => {
    const { layout: Layout, component: Component, ...rest } = props

    const adminId = localStorage.getItem('adminId')

    return (
        <Route
            {...rest}
            render={
                matchProps =>
                    adminId
                        ? <Layout>
                            <Component {...matchProps} />
                        </Layout>
                        : <Redirect
                            to={{
                                pathname: '/sign-in',
                                state: { from: matchProps.location }
                            }} />
            } />
    )
}

AuthAdminRouteWithLayout.propTypes = {
    path: PropTypes.string,
    layout: PropTypes.any.isRequired,
    component: PropTypes.any.isRequired
}

export default AuthAdminRouteWithLayout