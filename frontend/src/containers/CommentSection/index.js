import React,{Component} from 'react'

import Comment from '../../components/Comment'

import {Grid,Typography,Divider,Box} from '@material-ui/core'

import axios from 'axios'
import {connect} from 'react-redux'


class CommentSection extends Component{

  state = {
    comments:[]
  }

  fetchComments = (token) => {
    axios.get(`api/answer/${this.props.answerId}/comments/`,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
        this.setState({
          comments: res.data
        });
      })
  }

  componentWillReceiveProps(newProps){
    if (newProps.addedNewComment){
      this.fetchComments(this.props.token)
      newProps.updateWithNewComment(false)
    }

  }


  componentDidMount(){
    if (this.props.token !== null){
      this.fetchComments(this.props.token)
    }
  }


  render(){
    const {comments} = this.state
    //console.log(comments);
    const emptyOrComments = ( Array.isArray(comments) && comments.length ) ? comments.map((comment,index) => (
      <Box key={comment.id}><Comment   data ={comment}/> <Divider light /> </Box>
    ))  : <Typography>No comments yet.</Typography>




    return(
      <Grid>
        {emptyOrComments}
      </Grid>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
}



export default connect(mapStateToProps)(CommentSection)
