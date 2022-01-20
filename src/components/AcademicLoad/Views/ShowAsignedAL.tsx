import React, { Component } from 'react'
import { ICargasAsignadas } from '../Models/ALModels'

interface Props {
    asignedAL?:ICargasAsignadas[];
}
interface State {
    asignedAL:ICargasAsignadas[];
}

export default class ShowAsignedAL extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            asignedAL: props.asignedAL || []
          };
    }

    render() {
        return (
            <div>
                <table className='show_border'>
                    <thead>
                        <tr>
                            <th colSpan={3}>
                                CARGAS ASIGNADAS ACTIVAS
                            </th>
                        </tr>
                        <tr>
                            <th>GRUPO</th>
                            <th>CARRERA</th>
                            <th>MATERIA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.asignedAL.length > 0 &&
                        this.state.asignedAL.map((item) => (
                            <tr>
                                <td>{item.Grupo}</td>
                                <td>{item.Carrera}</td>
                                <td>{item.Materia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
