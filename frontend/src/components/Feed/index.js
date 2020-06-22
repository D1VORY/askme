import React,{Component} from 'react'
import Answer from '../Answer'
import {Box,Typography} from '@material-ui/core'
import axios from 'axios'
import transformtimestamp from '../utils'


export default class Feed extends Component {
  //
  // constructor(props){
  //   super(props)
  //
  //   this.state = {
  //     answers : []
  //   };
  // }
  //
  //
  //
  // async loadAnswers(){
  //   this.setState({
  //     answers: await fetch("api/v0/answers/").then(response => response.json())
  //   })
  // }
  //
  // componentDidMount(){
  //   axios.get('http://127.0.0.1:8000/api/answers/').then(res => {
  //     this.setState({
  //       answers: res.data
  //     });
  //     console.log(res.data)
  //   })
  // }

  render(){
    const emptyOrAnswers = this.props.answers ?
    (this.props.answers.map((answer,index) => (
      <Box  key = {answer.id}>
        <Answer answerID={answer.id}
        askedUserFirstName = {answer.askedUser.first_name}
        askedUserLastName = {answer.askedUser.last_name}
        askedUserUsername = {answer.askedUser.username}
        asker = {answer.asker}
        questionText= {answer.question_text}
        whenAnswered = {transformtimestamp(answer.timestamp)}
        answerText= {answer.answer_text} likesAmount= {answer.likes}
        dislikesAmount= {answer.dislikes}  />
      </Box>
    )) ) : <Typography variant="h3">No answers yet </Typography>
    return (
      <Box >
          {emptyOrAnswers}
      </Box>
    )
  }
}
