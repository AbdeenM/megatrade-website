/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import GoogleLogin from 'react-google-login'
import Button from '@material-ui/core/Button'
import GoogleIcon from 'react-ionicons/lib/LogoGoogle'
import FacebookIcon from 'react-ionicons/lib/LogoFacebook'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import Constants from 'config/Constants'
import useStyles from '../../form-style'

const SocialAuth = props => {
	const classes = useStyles()
	const { onFacebook, onGoogle } = props

	console.log(props);

	return (
		<section className={classes.socmedSideLogin}>
			<FacebookLogin
				callback={onFacebook}
				onFailure={onFacebook}
				fields='name,email,picture'
				appId={Constants.FACEBOOK_APP_ID}
				render={renderProps => <Button
					variant='contained'
					className={classes.naviBtn}
					onClick={renderProps.onClick}
					type='button'
					size='large'>
					<FacebookIcon />
					Facebook
      		</Button>} />

			<GoogleLogin
				onSuccess={onGoogle}
				onFailure={onGoogle}
				clientId={Constants.GOOGLE_CLIENT_ID}
				cookiePolicy={'single_host_origin'}
				render={renderProps => <Button
					variant='contained'
					onClick={renderProps.onClick}
					className={classes.redBtn}
					type='button'
					size='large'>
					<GoogleIcon />
					Google
      		</Button>} />
		</section>
	)
}


export default SocialAuth
