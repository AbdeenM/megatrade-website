import React from 'react'
import Carousel from 'react-slick'
import { Typography, Avatar, Paper } from '@material-ui/core'

import useStyle from './testi-style'
import { useTextAlign } from 'theme/common'

const testiContent = [
	{
		text: 'I had very good experience with this guys and I can recommend it to anyone. They go for trade with high probability not just for any trade.',
		avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
		name: 'James, Dorset, UK'
	},
	{
		text: 'As a member of their signal service, they really know how to trade forex. I like their mid-term trading setup.',
		avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
		name: 'Sang, Texas, USA'
	},
	{
		text: 'They provide an excellent service with frequent and incredibly reliable Forex signals. Their service is massively helping me along my journey through the trading world!',
		avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
		name: 'Elliot, United Kingdom'
	}
]

const Testimonials = () => {
	const classes = useStyle()
	const align = useTextAlign()
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
			}
		}, {
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}]
	}

	return (
		<div className={classes.testimonialWrap}>
			<Typography gutterBottom variant='h3' className={align.textCenter} display='block'>
				Testimonials
      		</Typography>
			<Typography gutterBottom variant='body1' className={align.textCenter} display='block'>
				Curabitur egestas consequat lorem, vel fermentum augue porta id.
    		</Typography>

			<div className={classes.carousel}>
				<Carousel {...settings}>
					{testiContent.map((item, index) => (
						<div key={index.toString()} className={classes.item}>
							<Paper className={classes.card}>
								<Typography variant='body1' display='block'>
									{item.text}
								</Typography>
								<div className={classes.name}>
									<Avatar
										alt={item.name}
										src={item.avatar}
										className={classes.avatar} />
									<Typography variant='caption'>
										{item.name}
									</Typography>
								</div>
							</Paper>
						</div>
					))}
				</Carousel>
			</div>
		</div>
	)
}

export default Testimonials
