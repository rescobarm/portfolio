import React, { Component } from 'react'
import { Route, Routes } from 'react-router'
import App from '../../../App'
import AcademicLoads from './AcademicLoads'
import Disponibilities from './Disponibilities'

interface Props {
    
}
interface State {
    
}

export default class NavMenu extends Component<Props, State> {
    state = {}

    render() {
        return (
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<AcademicLoads />} />
                    <Route path="AcademicLoads" element={<AcademicLoads />} />
                    <Route path="Disponibilities" element={<Disponibilities />} />
                </Route>
            </Routes>
        )
    }
}
