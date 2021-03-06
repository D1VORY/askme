import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SearchBar from 'material-ui-search-bar'


import axios from 'axios'


class UserSearch extends React.Component {

    state= {
      searchValue:''

    }


  filter = () => {
    const url = 'api/users/search/?search=' + this.state.searchValue
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${this.props.token}`
        }
    }).then(res => {
      console.log(res.data);
      if(res.data.length > 0 ){
        this.props.changeView(res.data, '', false)
      }else{
        this.props.changeView([], 'Nothing found!',false)
      }

    }).catch(error => {
      this.props.changeView([], error,false)
    })
  }

  handleSearchChange = (val) => {
    this.setState({
      searchValue: val
    })
    if( this.state.searchValue.length > 3 ){
      //this.filter()
    }

  }


  handleSearchRequest = () => {
    console.log(this.state.searchValue.length);
    if( this.state.searchValue.length >= 3 ){
      this.filter()
    }else{
      this.props.changeView([],'nothing found',false)
    }
  }

  handleCloseButton = () => {
    this.setState({
      searchValue:''
    })
    this.props.changeView([],'',true)
  }

  render(){
    const closeButton=  ( <CloseIcon onClick={this.handleCloseButton}/>)
    return (
      <SearchBar
      closeIcon ={closeButton}
      onChange={this.handleSearchChange}
      onRequestSearch={this.handleSearchRequest}
      value= {this.state.searchValue}
      style={{
        margin: '0 auto'
      }}
    />
    );
  }
};



export default UserSearch;
