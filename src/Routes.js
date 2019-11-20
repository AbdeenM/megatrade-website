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
import {
	Icons as IconsView,
	SignIn as SignInView,
	SignUp as SignUpView,
	Account as AccountView,
	NotFound as NotFoundView,
	Settings as SettingsView,
	UserList as UserListView,
	Dashboard as DashboardView,
	Typography as TypographyView,
	ProductList as ProductListView
} from './views'

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
				component={DashboardView} />

			<RouteWithLayout
				exact
				path='/users'
				layout={MainLayout}
				component={UserListView} />

			<RouteWithLayout
				exact
				path='/products'
				layout={MainLayout}
				component={ProductListView} />

			<RouteWithLayout
				exact
				path='/typography'
				layout={MainLayout}
				component={TypographyView} />

			<RouteWithLayout
				exact
				path='/icons'
				layout={MainLayout}
				component={IconsView} />

			<RouteWithLayout
				exact
				path='/account'
				layout={MainLayout}
				component={AccountView} />

			<RouteWithLayout
				exact
				path='/settings'
				layout={MainLayout}
				component={SettingsView} />

			<RouteWithLayout
				exact
				path='/sign-up'
				layout={MinimalLayout}
				component={SignUpView} />

			<RouteWithLayout
				exact
				path='/sign-in'
				layout={MinimalLayout}
				component={SignInView} />

			<RouteWithLayout
				exact
				path='/not-found'
				layout={MinimalLayout}
				component={NotFoundView} />

			<Redirect to='/not-found' />
		</Switch>
	)
}

export default Routes