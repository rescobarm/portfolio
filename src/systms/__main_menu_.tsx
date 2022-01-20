import { collection, getDocs } from 'firebase/firestore';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import db from '../firebase/firebaseConf';

interface Props {
    
}
interface State {
    count: number,
    isOnline: any
}


class __main_menu_ extends Component<Props, State> {
    //state = {}
    constructor(props: Props) {
        super(props);
        this.state = { count: 0, isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);

        
    }

    componentDidMount() {
        const getDataFB = async () => {
            console.log('**FIREBASE*START*******************');
            const _itemUserMenuCllctn = collection(db, '_itemUserMenu');//.collection("_itemUserMenu")
            const _itemUserMenuDoc = await getDocs(_itemUserMenuCllctn);
            const userMenu = _itemUserMenuDoc.docs.map(doc => doc.data());      
            console.log(userMenu);
            console.log('**FIREBASE*END**************************');
            //return cityList;
          }
          getDataFB();
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
      }
    
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    
    handleStatusChange(status: boolean) {
    this.setState({
        isOnline: status
    });
    }

    onMenuClick() {
        throw new Error('Method not implemented.');
    }

    render() {
        return (
 
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom:'5px solid darkgreen'}}>
            <div className="container-fluid ">
                {/*<img src={image} width="30px" height="25px" alt="" />*/}
                <button onClick={()=> { this.onMenuClick(); }}
                        className="navbar-toggler1"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation" 
                        style={{ cursor:'pointer', }}
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/*
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item btn-outline-success">
                            <Link className="nav-link active " to="/">HOME</Link>
                        </li>
                        <li className="nav-item btn-outline-success">
                            <Link className="nav-link active " to="/Test">TEST</Link>
                        </li>
                    </ul>
                </div> */}
            </div>
          </nav>
        )
    }
}

export default __main_menu_;