

import { collection, getDocs } from 'firebase/firestore';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../datas/firebase/firebaseConf';
//import db from '../firebase/firebaseConf';

interface Props {
    
}
interface State {
    count: number,
    isOnline: any,
    item_menu: string
    OMenus: IMenu[];
}

interface IMenu {
    Action: string,
    Location: string,
    NameMenu: string,
    idMenu: number
}


class __main_menu_ extends Component<Props, State> {
    //state = {}
    //public item_menu: string = "menu";
    constructor(props: Props) {
        super(props);
        this.state = { count: 0, isOnline: null, item_menu: "dev", OMenus: [] };
        this.handleStatusChange = this.handleStatusChange.bind(this);

        
    }

    

    componentDidMount() {
        const getDataFB = async () => {
            console.log('**FIREBASE*START*******************');
            const _itemUserMenuCllctn = collection(db, '_itemMenu');//.collection("_itemUserMenu")
            const _itemUserMenuDoc = await getDocs(_itemUserMenuCllctn);
            const userMenu = _itemUserMenuDoc.docs.map(doc => doc.data());
            const temp = JSON.stringify(userMenu);
            const items: IMenu[] = JSON.parse(temp); //_itemUserMenuDoc.docs.values; //.map(doc => doc.data());      
            this.setState({ OMenus: [... items] });
            /*items.forEach((i) => {
                console.log(i.Action);
                this.setState({ item_menu: i.Action });
                // = i.action;
            });*/
            console.log(this.state.OMenus);
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
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-lg-5" style={{ borderBottom:'2px solid darkgreen'}}>
                <a href="index.html" className="navbar-brand ml-lg-3">
                    <h3 className="m-0 text-uppercase text-primary"><i className="fa fa-truck mr-2"></i>Mudanzas Express</h3>
                </a>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between px-lg-3" id="navbarCollapse">
                    <div className="navbar-nav m-auto py-0">
                        <a href="index.html" className="nav-item nav-link">Inicio</a>
                        <a href="about.html" className="nav-item nav-link">Sobre nosotros</a>
                        <a href="service.html" className="nav-item nav-link">Servicios</a>
                        <a href="price.html" className="nav-item nav-link">Precios</a>
                        <a href="contact.html" className="nav-item nav-link">Contactanos</a>
                    </div>
                    <a href="" className="btn btn-primary py-2 px-4 d-none d-lg-block">Contiza</a>
                </div>
            </nav>
        
            
        )
    }
}

export default __main_menu_;

{/* 
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom:'5px solid darkgreen'}}>
        <div className="container-fluid ">
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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {
            this.state.OMenus.map((item: IMenu, index: number) => (
                <li key={ item.NameMenu } className="nav-item btn-outline-success">
                    <Link className="nav-link active " to={ item.Action }>{ item.NameMenu }</Link>
                </li>                            
            ))
        }
        </ul>
    </div>
    </nav>*/
}


{/*****************/}

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