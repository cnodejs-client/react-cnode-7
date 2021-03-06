import React, { PureComponent, Fragment } from 'react'
import { TopNavWarpper, Back } from './style'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {actionCreators as loginActionCreators} from './../../pages/login/store'

class TopNav extends PureComponent {
  render() {
    let loginState = localStorage.user
    return (
      <Fragment>
        <TopNavWarpper>
          <Back onClick={() => this.goBack()}></Back>
          {this.props.match.path === '/mine' ? (<span>个人中心</span>) : (<span>{this.props.title}</span>)}
          {this.props.match.path === '/mine' && loginState ? (<span onClick={() => this.quite()}>退出</span>) : (<span></span>)}
        </TopNavWarpper>
      </Fragment>
    )
  }

  goBack() {
    this.props.history.goBack();
  }
  quite() {
    localStorage.user = ''
    this.props.history.push("/")
    this.props.logout()
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(loginActionCreators.isLogined(false))
    }
  }
}

export default connect(null, mapDispatch)(withRouter(TopNav))