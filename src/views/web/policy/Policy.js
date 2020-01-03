/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	content: {
		paddingTop: 50
	},
	innerContent: {
		paddingTop: 10
	},
	image: {
		width: 560,
		marginTop: 50,
		maxWidth: '100%',
		display: 'inline-block'
	}
}))

const Policy = () => {
	const classes = useStyles()

	return (
		<Fragment>
			<Grid
				container
				spacing={4}
				justify='center'>
				<Grid
					item
					lg={6}
					xs={12}>
					<div className={classes.content}>
						<Typography variant='h3'>
							Welcome to our Privacy Policy
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Your privacy is critically important to us.
							</div>

							<div className={classes.innerContent}>
								It is Megatrade.world’s policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to https://megatrade.world (hereinafter, “us”, “we”, or “https://megatrade.world”). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy (“Privacy Policy”) to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.
							</div>

							<div className={classes.innerContent}>
								This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Website Visitors
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Like most website operators, Megatrade.world collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Megatrade.world’s purpose in collecting non-personally identifying information is to better understand how Megatrade.world’s visitors use its website. From time to time, Megatrade.world may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.
							</div>

							<div className={classes.innerContent}>
								Megatrade.world also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on https://megatrade.world blog posts. Megatrade.world only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Gathering of Personally-Identifying Information
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Certain visitors to Megatrade.world’s websites choose to interact with Megatrade.world in ways that require Megatrade.world to gather personally-identifying information. The amount and type of information that Megatrade.world gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at https://megatrade.world to provide a username and email address.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Security
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Protection of Certain Personally-Identifying Information
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Megatrade.world discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Megatrade.world’s behalf or to provide services available at Megatrade.world’s website, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using Megatrade.world’s website, you consent to the transfer of such information to them. Megatrade.world will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Megatrade.world discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when Megatrade.world believes in good faith that disclosure is reasonably necessary to protect the property or rights of Megatrade.world, third parties or the public at large.
							</div>

							<div className={classes.innerContent}>
								If you are a registered user of https://megatrade.world and have supplied your email address, Megatrade.world may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with Megatrade.world and our products. We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Megatrade.world takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Aggregated Statistics
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Megatrade.world may collect statistics about the behavior of visitors to its website. Megatrade.world may display this information publicly or provide it to others. However, Megatrade.world does not disclose your personally-identifying information.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Affiliate Disclosure
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								This site uses affiliate links and does earn a commission from certain links. This does not affect your purchases or the price you may pay.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Cookies
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								To enrich and perfect your online experience, Megatrade.world uses “Cookies”, similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.
							</div>

							<div className={classes.innerContent}>
								A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. Megatrade.world uses cookies to help Megatrade.world identify and track visitors, their usage of https://megatrade.world, and their website access preferences. Megatrade.world visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Megatrade.world’s websites, with the drawback that certain features of Megatrade.world’s websites may not function properly without the aid of cookies.
							</div>

							<div className={classes.innerContent}>
								By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Megatrade.world’s use of cookies.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Business Transfers
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								If Megatrade.world, or substantially all of its assets, were acquired, or in the unlikely event that Megatrade.world goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of Megatrade.world may continue to use your personal information as set forth in this policy.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h3'>
							Privacy Policy Changes
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Although most changes are likely to be minor, Megatrade.world may change its Privacy Policy from time to time, and in Megatrade.world’s sole discretion. Megatrade.world encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
							</div>
						</Typography>
					</div>
				</Grid>
			</Grid>
		</Fragment>
	)
}

export default Policy