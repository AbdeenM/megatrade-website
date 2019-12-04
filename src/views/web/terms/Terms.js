/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
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

const Terms = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}
				justify='center'>
				<Grid
					item
					lg={6}
					xs={12}>
					<div className={classes.content}>
						<Typography variant='h1'>
							Welcome to megatrade.world
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								These terms and conditions outline the rules and regulations for the use of megatrade.world’s Website.
							</div>

							<div className={classes.innerContent}>
								By accessing this website we assume you accept these terms and conditions in full. Do not continue to use megatrade.world’s website
								if you do not accept all of the terms and conditions stated on this page.
							</div>

							<div className={classes.innerContent}>
								The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: “Client”, “You” and “Your” refers to you, the person accessing this website	and accepting the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law	of United Kingdom. Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							Cookies
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								We employ the use of cookies. By using megatrade.world’s website you consent to the use of cookies in accordance with megatrade.world’s privacy policy.
							</div>

							<div className={classes.innerContent}>
								Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							License
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								Unless otherwise stated, megatrade.world and/or it’s licensors own the intellectual property rights for all material on megatrade.world. All intellectual property rights are reserved. You may view and/or print pages from https://megatrade.world for your own personal use subject to restrictions set in these terms and conditions.
							</div>

							You must not:
							<div className={classes.innerContent}>
								1. Republish material from https://megatrade.world
							</div>

							<div className={classes.innerContent}>
								2. Sell, rent or sub-license material from https://megatrade.world
							</div>

							<div className={classes.innerContent}>
								3. Reproduce, duplicate or copy material from https://megatrade.world
							</div>

							<div className={classes.innerContent}>
								Redistribute content from megatrade.world (unless content is specifically made for redistribution).
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							User Comments
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								1. This Agreement shall begin on the date hereof.
								</div>

							<div className={classes.innerContent}>
								2. Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data (‘Comments’) in areas of the website. megatrade.world does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions ofmegatrade.world, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws megatrade.worldshall not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
							</div>

							<div className={classes.innerContent}>
								3. megatrade.worldreserves the right to monitor all Comments and to remove any Comments which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							Reservation of Rights
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							Removal of links from our website
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								If you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.
							</div>

							<div className={classes.innerContent}>
								Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the	website is kept up to date.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							Content Liability
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
							</div>
						</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='h1'>
							Disclaimer
            			</Typography>
					</div>

					<div className={classes.content}>
						<Typography variant='title'>
							<div className={classes.innerContent}>
								To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:
							</div>

							<div className={classes.innerContent}>
								1. limit or exclude our or your liability for death or personal injury resulting from negligence;
							</div>

							<div className={classes.innerContent}>
								2. limit or exclude our or your liability for fraud or fraudulent misrepresentation;
							</div>

							<div className={classes.innerContent}>
								3. limit any of our or your liabilities in any way that is not permitted under applicable law; or
							</div>

							<div className={classes.innerContent}>
								4. exclude any of our or your liabilities that may not be excluded under applicable law.
							</div>

							<div className={classes.innerContent}>
								The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.
							</div>

							<div className={classes.innerContent}>
								To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
							</div>
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div >
	)
}

export default Terms