import { stringify } from 'querystring';
import React, { Component } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components'
import AvailabilityCntrllr from '../Controllers/AvailabilityCntrllr';
import { ISubjects } from '../Models/ALModels'

interface Props {
    _Subject: ISubjects;
    subjects: ISubjects[];
    myToggleModal?:()=> void;
}
interface State {
   subjetDree: ISubjects[];
   isSaved:boolean;
}

export default class AvailabilityModules extends Component<Props, State> {
    avlbltyCtrllr: AvailabilityCntrllr = new AvailabilityCntrllr();
    bndTmp: string
    //isSaved: boolean | undefined;
    constructor(props: Props) {
        super(props);
        this.state = {
            subjetDree:[],
            isSaved: false
        };

    }

    render() {
        return (
            <_avlbltMdls className='css-showOverflow css_avlbltMdls'>
                <div className='css_avlblty_dflex css-showOverflow' style={{ height: '350px' }}>
                    <div className='css-showOverflow' style={{ height: '175px' }}>
                        {
                            this.state.subjetDree.map((item: ISubjects, index:number) => (
                                <div className='css-hover' title='QUITAR ITEM'
                                onClick={ () => this.onDeeltSerialTree(item, index) } key={item.idMateria}>
                                    <b>{ item.Cuatrimestre }</b>
                                    <b>{ item.Nombre }</b>
                                </div>                                                                
                            ))
                        }
                    </div>
                    <div className='css-showOverflow' style={{ height: '325px', padding:'3px', margin:'3px', display:'block' }}>
                        {
                            this.props.subjects.length > 0 &&                                
                            this.props.subjects.map((item: ISubjects, index:number)=> (
                                <div className='css-hover' style={{ padding:'3px', margin:'3px' }} onClick={ () => this.onSetSerialTree(item, index) } key={item.idMateria}>
                                    <b>{ item.Cuatrimestre }</b>
                                    <b>{ item.Nombre }</b>
                                </div>                                
                            ))                        }
                    </div>
                </div>
                <input type={'button'} 
                    className="btn btn-primary" 
                    disabled={ this.state.isSaved }
                    onClick={ () => this.onSetSerials() } value='GUARDAR' title='GUARDAR' />
            </_avlbltMdls>
        )
    }

    async onSetSerials() {
        toast.promise(this.setSerializer(), {
            loading: "Configurando materias seriadas",
            success: (e) => { return e },
            error: (e) => { return e },
          });
    }

    async setSerializer() : Promise<string> 
    {
        try {
            if(this.state.subjetDree.length > 0){
                this.setState({isSaved:true});
                return await this.avlbltyCtrllr.SetSerialSubject(1,true, this.state.subjetDree);
            }
            else {
                throw ("No ha configurado la serie...");
            }            
        } catch (error) {
            throw (error);
        }

    }

    onDeeltSerialTree(item: ISubjects, index: number): void {
        try {
            this.state.subjetDree.slice(index, 1);
            this.setState({ subjetDree: [... []] })
            toast('Materias borradas...', {
                duration: 4000,
                position: 'top-center',
            });
        } catch (error) {
            console.log(error);
        }
    }

    onSetSerialTree(item: ISubjects, index: number): void | undefined {        
        if(item.Cuatrimestre < this.props._Subject.Cuatrimestre)
        {
            //console.log('Debe seleccionar en el cuatrimestre corrécto');
            toast('Debe comenzar en el cuatrimestre de la materia seleccinoada para configurar (' + this.props._Subject.Nombre + ')', {
                duration: 4000,
                position: 'top-center',
            });
        }
        if(this.props._Subject.Cuatrimestre === item.Cuatrimestre)
        {
            if(item.idMateria == this.props._Subject.idMateria)
            {
                let found = this.state.subjetDree.find(e => e.idMateria);
                if(item.idMateria !== found?.idMateria)
                {
                    //console.log(found?.Nombre);
                    const resp = window.confirm('Usted confirma comenzar con la configuración de la seriación de la materia?');
                    if(resp){
                        let tmp = [...this.state.subjetDree, item];
                        this.setState({ subjetDree: tmp });      
                        //console.log('Nuevo gregado ');
                        toast.success('Proceso iniciado corréctamente!!!',{
                            position: 'top-center',
                        });
                       /* toast('Nuevo gregado ' +
                        'seleccinoada para configurar (' + this.props._Subject.Nombre + ')', {
                            duration: 4000,
                            icon: '💻',
                            position: 'top-center',
                        });*/
                    }
                    else
                    {
                        toast('PROCESO CANCELADO ' +
                        'SERIAR: (' + this.props._Subject.Nombre + ')', {
                            duration: 4000,
                            icon: '💻',
                            position: 'top-center',
                        });
                    }

                }
                else
                {
                    //console.log('Ya se encuentra agregado ');
                    toast('Ya se encuentra agregado', {
                        duration: 4000,
                        icon: '💻',
                        position: 'top-center',
                    });
                }
            }
            else
            {
                //console.log('Si cuatrimestre materia');
                toast('En este cuatrimestre, se debe seleccionar la materia que se está configurando', {
                    duration: 4000,
                    position: 'top-center',
                    // Styling
                    style: {},
                    className: '',
                    // Custom Icon
                    icon: '💻',
                    // Change colors of success/error/loading icon
                    iconTheme: {
                      primary: '#000',
                      secondary: '#fff',
                    },
                    // Aria
                    ariaProps: {
                      role: 'status',
                      'aria-live': 'polite',
                    },
                  });
            }
        }
        if(item.Cuatrimestre > this.props._Subject.Cuatrimestre)
        {  
            if(this.state.subjetDree.length > 0)
            {
                if(this.props._Subject.Cuatrimestre < item.Cuatrimestre)
                {
                    let fc = this.state.subjetDree.find(e => e.Cuatrimestre == item.Cuatrimestre);
                    if(fc)
                    {
                        console.log(fc?.Cuatrimestre);
                        let found = this.state.subjetDree.find(e => e.idMateria == item.idMateria);
                        if(found?.idMateria != item.idMateria)
                        {
                            let oldSubj = this.state.subjetDree.findIndex( e => e.Cuatrimestre === item.Cuatrimestre);
                            //this.state.subjetDree.indexOf(oldSubj);
                            this.state.subjetDree.splice(oldSubj,1);
                            let tmp = [...this.state.subjetDree, item];
                            this.setState({ subjetDree: tmp });      
                            //console.log('Mayor nuevo reemplazado 1');
                            toast('Materia reemplazada corréctamente!',
                                {
                                    position: 'top-center',
                                    icon: '💻',
                                    style: {
                                    borderRadius: '10px',
                                    background: '#333',
                                    color: '#fff',
                                    },
                                }
                            );
                        }
                        else
                        {
                            //console.log('Ya se encuentra agregado');
                            toast('La materia ya se encuentra agregada', {
                                duration: 4000,
                                position: 'top-center',
                            });
                        }
                    }
                    else
                    {
                        console.log('NILL')
                        let found = this.state.subjetDree.find(e => e.idMateria == item.idMateria);
                        if(found?.idMateria != item.idMateria)
                        {
                            let tmp = [...this.state.subjetDree, item];
                            this.setState({ subjetDree: tmp });      
                            //console.log('Mayor nuevo gregado 1');                    
                            toast.success ('Siguinte materia agregada corréctamente', {
                                duration: 4000,
                                position: 'top-center',
                            });
                        }
                        else
                        {
                            //console.log('ya se encuentra agregado...')
                            toast('ya se encuentra agregado...'+
                            'seleccinoada para configurar (' + this.props._Subject.Nombre + ')', {
                                duration: 4000,
                                position: 'top-center',
                            });
                        }
                    }
                }
                else{
                    //console.log('Comenzar por la materia seleccionada para configurar');
                    toast('Comenzar por la materia seleccionada para configurar'+
                    'seleccinoada para configurar (' + this.props._Subject.Nombre + ')', {
                        duration: 4000,
                        position: 'top-center',
                    });
                }
            }
            else{
                //console.log('Debe comenzar con la materia seleccinoada');
                toast('Debe comenzar con la materia '+
                'seleccinoada para configurar (' + this.props._Subject.Nombre + ')', {
                    duration: 4000,
                    icon: '💻',
                    position: 'top-center',
                });
            }
        }
    }    
}


const _avlbltMdls = styled.div `
  margin: 3px;
  border: 10px solid darkblue;
  padding: 20px;
  width: 95%;
  height: 450px;
  background: #FFFFFF;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
  
`;
