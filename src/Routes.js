/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import MainLayout from './layouts/main/Main'
import MinimalLayout from './layouts/minimal/Minimal'
import RouteWithLayout from './components/RouteWithLayout'

import SignUp from './views/web/signUp/SignUp'
import SignIn from './views/web/signIn/SignIn'
import NotFound from './views/web/notFound/NotFound'

import AccountUser from './views/user/account/Account'
import SettingsUser from './views/user/settings/Settings'
import DashboardUser from './views/user/dashboard/Dashboard'

const Routes = () => {
	return (
		<Switch>
			<Redirect
				exact
				from='/'
				to='/dashboard' />

			<RouteWithLayout
				exact
				path='/dashboard'
				layout={MainLayout}
				component={DashboardUser} />

			<RouteWithLayout
				exact
				path='/account'
				layout={MainLayout}
				component={AccountUser} />

			<RouteWithLayout
				exact
				path='/settings'
				layout={MainLayout}
				component={SettingsUser} />

			<RouteWithLayout
				exact
				path='/sign-up'
				component={SignUp}
				layout={MinimalLayout} />

			<RouteWithLayout
				exact
				path='/sign-in'
				component={SignIn}
				layout={MinimalLayout} />

			<RouteWithLayout
				exact
				path='/not-found'
				component={NotFound}
				layout={MinimalLayout} />

			<Redirect to='/not-found' />
		</Switch>
	)
}

export default Routes