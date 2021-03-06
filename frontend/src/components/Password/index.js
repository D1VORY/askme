import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField
} from '@material-ui/core';
import axios from 'axios'
import {connect} from 'react-redux'




const useStyles = makeStyles(() => ({
    root: {}
}));

const Password = props => {
    const { className,openInfoBar, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({
        oldPassword: '',
        password: '',
        confirm: ''
    });

    const handleChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const putChanges = () => {
      let form_data = new FormData();
      form_data.append('old_password', values.oldPassword )
      form_data.append('new_password1', values.password )
      form_data.append('new_password2' , values.confirm)


      const config = {
        headers: {
          'Authorization' : `Token ${props.token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(`rest-auth/password/change/`,form_data,config)
        .then(res => {
            openInfoBar('Settings updated','success')
          })
        .catch(err =>{
          //console.log(err.response);
          let temp = err.response.data
          if(typeof temp === 'object' && temp !== null){
            temp = Object.values(temp)
          }
          openInfoBar(temp[0], 'error')

        } )
    }

    const handleSubmit = event => {
        putChanges();
    }




    return (
        <Card

            className={clsx(classes.root, className)}
        >
            <form>
                <CardHeader
                    title="Password"
                />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Old Password"
                        name="oldPassword"
                        autoComplete="Old Password"
                        onChange={handleChange}
                        type="password"
                        value={values.oldPassword}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        label="New password"
                        autoComplete="New password"
                        name="password"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="password"
                        value={values.password}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Confirm password"
                        autoComplete="Confirm password"
                        name="confirm"
                        onChange={handleChange}
                        style={{ marginTop: '1rem' }}
                        type="password"
                        value={values.confirm}
                        variant="outlined"
                    />
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        Change
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

Password.propTypes = {
    className: PropTypes.string
};


const mapStateToProps = state => {
  return {
    token: state.token
  }
}


export default connect(mapStateToProps)(Password)
