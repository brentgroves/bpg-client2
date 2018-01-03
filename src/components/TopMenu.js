import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

import '../App.css'
class TopMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    const { isAuthenticated, sidebarVisible, setSidebarVisible,
      topmenuActiveItem, dropdownActiveItem,
      setRptStep, rmReport, jsreport,
      setDropdownActiveItem, setTopmenuActiveItem, handleLogout } = this.props.childProps
    const { history } = this.props
    return (
      <Menu fluid inverted attached='top'>
        {isAuthenticated ?
          [
            <Menu.Item
              key='1'
              name='toggleSidebar'
              active={topmenuActiveItem === 'toggleSidebar'}
              onClick={(e, { name })=> {
                setTopmenuActiveItem(name)
                setSidebarVisible(!sidebarVisible)
              }}>
              <Icon name='sidebar'/>
            </Menu.Item>,
            <Dropdown
              key='2'
              name='dropdown'
              icon='folder'
              item
              onClick={(e, { name }) => {
                setTopmenuActiveItem(name)
              }}

            >
              <Dropdown.Menu>
                <Dropdown.Item
                  key='3'
                  name='production'
                  active={dropdownActiveItem === 'production'}
                  onClick={(e, { name }) => {
                    setDropdownActiveItem(name)
                    setSidebarVisible(true)
                  }}
                >
                  <span id='ddProduction' className='text'>Production</span>
                </Dropdown.Item>
                <Dropdown.Item
                  key='4'
                  name='purchasing'
                  active={dropdownActiveItem === 'purchasing'}
                  onClick={(e, { name }) => {
                    setDropdownActiveItem(name)
                    setSidebarVisible(true)
                  }}
                >
                  <span id='ddPurchasing' className='text'>Purchasing</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>,
            <Menu.Item
              key='5'
              name='accuracy'
              active={topmenuActiveItem === 'accuracy'}
              onClick={(e, { name })=> {
                setTopmenuActiveItem(name)
                setSidebarVisible(false)
                try {
                  let request = {
                    template: {
                      name: 'HtmlToBrowserClient'
                    },
                    data: {
                      rptName: 'DashBoard'
                    }
                  }

                  // add custom headers to ajax calls
                  jsreport.render('detail', request)
                  setRptStep(2)
                } catch (e) {
                  alert(e)
                }
              }}>
              <Icon name='heartbeat'/>
              <span className='text'>Accuracy</span>
            </Menu.Item>,
            <Menu.Menu key='5.5' position='right'>
              <Menu.Item
                key='6'
                name='logout'
                active={topmenuActiveItem === 'logout'}
                onClick={(e, { name })=> {
                  setTopmenuActiveItem(name)
                  setSidebarVisible(false)
                  handleLogout()
                }}>
                <Icon name='sign out'/>
                <span className='text'>Logout&nbsp;&nbsp;&nbsp;</span>
              </Menu.Item>
            </Menu.Menu>
          ]
          :
          [
            <Menu.Item
              key='9'
              name='login'
              active={topmenuActiveItem === 'login'}
              onClick={(e, { name }) => {
                setTopmenuActiveItem(name)
                setRptStep(1)
                rmReport()
                setSidebarVisible(false)
                history.push('/login')
              }} >
              <Icon name='sign in'/>Login
            </Menu.Item>,
            <Menu.Item
              key='7'
              name='signup'
              active={topmenuActiveItem === 'signup'}
              onClick={(e, { name }) => {
                setTopmenuActiveItem(name)
                setRptStep(1)
                rmReport()
                setSidebarVisible(false)
                history.push('/signup')
              }} >
              <Icon name='add user'/>Signup
            </Menu.Item>,
            <Menu.Item
              key='8'
              name='confirm'
              active={topmenuActiveItem === 'confirm'}
              onClick={(e, { name }) => {
                setTopmenuActiveItem(name)
                setRptStep(1)
                rmReport()
                setSidebarVisible(false)
                history.push('/confirm')
              }} >
              <Icon name='mail outline'/>Confirm
            </Menu.Item>
          ]

        }
      </Menu>
    )
  }
}
export default withRouter(TopMenu)

