import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Wait.css'
import { Loader, Dimmer, Grid } from 'semantic-ui-react'

class Wait extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }


  async componentDidMount() {
    let thisLv2 = this
    setTimeout(function () {
      //        self.props.setRptStep(2); 
      let detail = document.getElementById('detail')
      let childNodes = detail.childNodes
      if (childNodes.length !== 0) {
        thisLv2.props.setRptStep(2)
      }
    }, 3000)
  }

  validateForm() {
    return 'success'
  }
  render() {
    let divStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important'
    }


    let headerStyle = {
      width: '100%',
      height: '100%',
      padding: '0px !important',
      margin: '0px !important',

      background: 'grey'
      //      width: '100%'
    }


    return (
        <Grid style={divStyle}>
          <Grid.Column width={8} style={divStyle} >
            <Dimmer style={divStyle} active >
              <Loader style={divStyle}>Loading</Loader>
            </Dimmer>
          </Grid.Column>

          <Grid.Column width={8} >
            <Dimmer style={headerStyle} active >
              <Loader >Loading</Loader>
            </Dimmer>

          </Grid.Column>


        </Grid>
    )
  }
}
export default withRouter(Wait)
/*
                </Grid.Column>
                <Grid.Column  width={8}>
                  <Dimmer style={headerStyle}  active >
                    <Loader  >Loading</Loader>
                  </Dimmer>

                </Grid.Column>

          <Grid  basic  >
            <Grid.Row style={divStyle} >
               <Grid.Column width={4} >
                          <Dimmer active >
                            <Loader>Loading</Loader>
                          </Dimmer>
                </Grid.Column>
                <Grid.Column style={headerStyle} width={4} >
                   <Header as='h2' >
                      <Icon name='settings' />
                      <Header.Content>
                        Busche Reporter
                      </Header.Content>
                    </Header>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Dimmer active >
                    <Loader>Loading</Loader>
                  </Dimmer>

                </Grid.Column>
                <Grid.Column style={headerStyle} width={4} >
                   <Header as='h2' >
                      <Icon name='settings' />
                      <Header.Content>
                        Busche Reporter
                      </Header.Content>
                    </Header>      
                </Grid.Column>

            </Grid.Row>


          </Grid>
*/
