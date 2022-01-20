import React, { Component } from 'react';

import noName from '../../Assets/iexpro.png' ;

interface Props {
    
}
interface State {
    
}

export default class Test extends Component<Props, State> {
    //state = {}
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className='container show_border' style={{ width:'100%', height:'100%' }}>
                <h1>TEST Lista de materias</h1>
                <div className='row w-50 css-showOverflow text-dark css-list' style={{ padding: 6 }}>
                    <div className='card m-1'>Items x1</div>
                    <div className='card m-1'>Items x2</div>
                    <div className='card m-1'>Items x3</div>
                    <div className='card m-1'>Items x4</div>
                    <div className='card m-1'>Items x5</div>
                    <div className='card m-1'>Items x6</div>
                </div>

                <h1>TEST Lista de maestros</h1>
                <div className='row w-50 css-showOverflow css-list' style={{ padding: 6 }}>

                    <div className="card mb-3 text-dark" style={{ maxWidth: '540px' }} >
                        <div className="card-header">
                            Nombre del profesor
                        </div>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={noName} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='card bg-light text-dark m-1'>
                        <div className="card-header">
                            Nombre del profesor
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>                    
                    </div>

                    <div className='card m-1'>Items x</div>
                    <div className='card m-1'>Items x</div>
                    
                    <div className='card m-1'>Items x</div>
                    <div className='card m-1'>Items x</div>
                    <div className='card m-1'>Items x</div>
                </div>
            </div>
        )
    }
}
