import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Box,Grid,Avatar, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));


export default function UserInfo(props){
  const classes = useStyles();

  const askedUserFirstLastName = props.firstName + ' ' + props.lastName
  return(
    <Box mb={2}>
      <Grid container direction="row">
        <Box mr = {2}>
          <Avatar alt="lana"  className={classes.largeAvatar} />
        </Box>
        <Box >

          <Typography variant= 'h6'>
            {askedUserFirstLastName}
          </Typography>


          <Typography variant= 'subtitle1' color='textSecondary'>
            {'@' + props.askedUserUsername}
          </Typography>


          <Typography  variant='subtitle2' color='textSecondary'>
            {props.whenAnswered}
          </Typography>
        </Box>
      </Grid>
    </Box>
  )
}