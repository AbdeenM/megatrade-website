import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: 20,
        textAlign: 'center'
    },
    contentInner: {
        marginTop: 20
    },
    image: {
        width: 560,
        marginTop: 50,
        maxWidth: '100%',
        display: 'inline-block'
    }
}))

const Education = () => {
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
                            Coming Soon!
            			</Typography>

                        <div className={classes.contentInner}>
                            <Typography variant='subtitle2'>
                                We are working on making the educational content available as soon as possible, stay tuned and we will notify you once we launch.
            			    </Typography>

                            <Typography variant='subtitle2'>
                                In the mean time feel free to email us your thoughts.
            			    </Typography>
                        </div>

                        <img
                            alt='not found'
                            className={classes.image}
                            src='/images/education-background.png' />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Education