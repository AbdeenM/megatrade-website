/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import WebLayout from './layouts/web/Web'
import MainLayout from './layouts/main/Main'
import RouteWithLayout from './components/RouteWithLayout'
import AuthRouteWithLayout from './components/AuthRouteWithLayout'

import Terms from './views/web/terms/Terms'
import Policy from './views/web/policy/Policy'
import SignIn from './views/web/signIn/SignIn'
import SignUp from './views/web/signUp/SignUp'
import Landing from './views/web/landing/Landing'
import NotFound from './views/web/notFound/NotFound'

import AccountUser from './views/user/account/Account'
import DashboardUser from './views/user/dashboard/Dashboard'
import EducationUser from './views/user/education/Education'
import SubscriptionUser from './views/user/subscription/Subscription'

const Routes = () => {
	return (
		<Switch>
			<RouteWithLayout
				exact
				path='/'
				layout={WebLayout}
				component={Landing} />

			<RouteWithLayout
				exact
				path='/sign-up'
				layout={WebLayout}
				component={SignUp} />

			<RouteWithLayout
				exact
				path='/sign-in'
				layout={WebLayout}
				component={SignIn} />

			<RouteWithLayout
				exact
				path='/terms'
				component={Terms}
				layout={WebLayout} />

			<RouteWithLayout
				exact
				path='/policy'
				layout={WebLayout}
				component={Policy} />

			<RouteWithLayout
				exact
				path='/not-found'
				layout={WebLayout}
				component={NotFound} />

			<AuthRouteWithLayout
				exact
				path='/dashboard'
				layout={MainLayout}
				component={DashboardUser} />

			<AuthRouteWithLayout
				exact
				path='/education'
				layout={MainLayout}
				component={EducationUser} />

			<AuthRouteWithLayout
				exact
				path='/account'
				layout={MainLayout}
				component={AccountUser} />

			<AuthRouteWithLayout
				exact
				layout={MainLayout}
				path='/subscription'
				component={SubscriptionUser} />

			<Redirect to='/not-found' />
		</Switch>
	)
}

export default Routes