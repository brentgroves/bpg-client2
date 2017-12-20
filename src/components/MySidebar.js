import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Sidebar, Segment, Icon, Menu } from 'semantic-ui-react'

// import "./index.css";
import '../App.css'
import Routes from '../Routes'
class MySidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const { history, childProps } = this.props
    const { dropdownActiveItem, sidebarActiveItem, setSidebarActiveItem, sidebarVisible, setSidebarVisible, setRptStep, getRptStep } = this.props.childProps

    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'
    }
    return (
      <div style={divStyle}>
        {dropdownActiveItem === 'production' ?
          <Sidebar.Pushable as={Segment} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplant'
                active={sidebarActiveItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  setSidebarActiveItem(name)
                  setRptStep(1)
                  history.push('/tcsbyplant')
                  setSidebarVisible(false)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>
              <Menu.Item
                name='tcsbyplantXLS'
                active={sidebarActiveItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  setSidebarActiveItem(name)
                  setRptStep(1)
                  history.push('/tcsbyplant')
                  setSidebarVisible(false)
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher dimmed={sidebarVisible} style={divStyle} >
              {getRptStep() === 1 ? <Routes childProps={childProps} /> : ''}
              <div id='detail' style={divStyle} className='container fill mycontainer' />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          :
          <Sidebar.Pushable as={Segment} style={divStyle} attached='bottom'>
            <Sidebar as={Menu} animation='push' width='thin' visible={sidebarVisible} icon='labeled' vertical inverted>
              <Menu.Item
                name='tcsbyplantXLS'
                active={sidebarActiveItem === 'tcsbyplantXLS'}
                onClick={(e, { name }) => {
                  setSidebarActiveItem(name)
                  setRptStep(1)
                  history.push('/tcsbyplant')
                  setSidebarVisible(false)
                }}>
                <Icon name='file excel outline'/>Excel
              </Menu.Item>
              <Menu.Item
                name='tcsbyplant'
                active={sidebarActiveItem === 'tcsbyplant'}
                onClick={(e, { name }) => {
                  setSidebarActiveItem(name)
                  setRptStep(1)
                  history.push('/tcsbyplant')
                  childProps.setSidebarVisible(false)
                }}>
                <Icon name='html5'/>ToolCost
              </Menu.Item>

            </Sidebar>
            <Sidebar.Pusher dimmed={sidebarVisible} style={divStyle} >
              <Segment style={divStyle} basic >
                {getRptStep() === 1 ? <Routes childProps={childProps} /> : ''}
                <div id='detail' style={divStyle} className='container fill mycontainer' />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        }
      </div>
    )
  }
}
export default withRouter(MySidebar)

