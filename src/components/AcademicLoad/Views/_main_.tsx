import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Menu from './user-menu/Menu'

interface Props {
    
}
interface State {
    
}

export default class _main_ extends Component<Props, State> {
    //state = {}

    public _Height?: number = 0;

    constructor(props: Props) {
        super(props);
        this.calc();
    }

    public calc() {
        const mh = window.document.getElementById('_main');
        console.log('MAIN HEIGHT');
        console.log(mh?.offsetHeight);

        const hd = window.document.getElementById('_header');
        console.log('HEADER HEIGHT');
        console.log(hd?.offsetHeight);

        const cn = window.document.getElementById('_divOutlet');
        console.log('CONTAINER HEIGHT');        
        this._Height = ((mh?.offsetHeight ? mh?.offsetHeight : 0) - (hd?.offsetHeight ? hd?.offsetHeight : 0));
        console.log(this._Height);
    }

    render() {
        return (
            <main id="_main" className="layout_css">
                {/* A "layout route" is a good place to put markup you want to
                    share across all the pages on your site, like navigation. */}
                <header id="_header" className="header_css">
                    <Menu />
                </header>
                <div id="_divOutlet" className="outlet_css" style={{ height: this._Height }}>
                    <Outlet />
                </div>
          </main>
        )
    }
}
