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
                                pathname: '/admin/sign-in',
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