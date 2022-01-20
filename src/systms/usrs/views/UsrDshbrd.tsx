import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

interface Props {
    
}
interface State {
    
}

export default class UsrDshbrd extends Component<Props, State> {
    state = {}

    data = [
        [
            'main',
            '', 
            'The President'
        ],
        [
            {
                'v':'main', 
                'f':'<div style="color:black; font-style:italic">__main__</div> <div style="color:red; font-style:italic">Vice President</div>'},
                '', 
                'VP'
        ],
        ['<div style="color:black; font-style:italic">__main_menu_</div>', 'main', 'Bob Sponge'],
        ['<div style="color:black; font-style:italic">Outlet</div>', 'main', '']
      ];

      options = {
        allowHtml: true,
      };

    render() {
        return (
            <div style={{  padding:'30px'}}>
                <h1>hola</h1>
                <Chart
                    chartType="OrgChart"
                    data={this.data}
                    options={ this.options }
                    width="100%"
                    height="400px"
                    />
            </div>
        )
    }
}
