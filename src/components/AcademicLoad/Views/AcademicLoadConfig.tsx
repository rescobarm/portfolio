import React, { Component } from 'react'
import toast from 'react-hot-toast';
import AcademicLoadConfCntrllr from '../Controllers/AcademicLoadConfCntrllr';
import { ISubjects, ITeacherDisponibilitySubject } from '../Models/ALModels';

interface Props {
    idCareer?: number;
    idGroup?: number;
}
interface State {
    subjects: ISubjects[];
    teacherasigned: ITeacherDisponibilitySubject[];
    availableteacher: ITeacherDisponibilitySubject[];
}

class AcademicLoadConfig extends Component<Props, State> {    
    //state = {}
    private ALC: AcademicLoadConfCntrllr;
    Subject: string = "NO SELECCIONADA";

    constructor(props: Props) {
        super(props);
        this.state = {
            subjects: [],
            teacherasigned: [],
            availableteacher: []
          };
        let idC:number = this.props.idCareer != null ? this.props.idCareer : 0;
        this.ALC = new AcademicLoadConfCntrllr(idC, 0);
        this.getDatas();
    }

    private async getDatas() {
        let sjts: ISubjects[] = await this.ALC.Materias;        
        this.setState({
          subjects: sjts,
        });
        console.log(this.state.subjects);
      }

      private async GETDisponibilyTeacher(idSubject: number): Promise<string> {
        try {
          let dis: ITeacherDisponibilitySubject[] =
            await this.ALC.GETAvailableTeachersByIdSubject(idSubject, this.ALC.IdGrupo);
          if (dis.length > 0) {
            this.setState({ availableteacher: dis });
            return "Profesores consultados";
          } else {
            throw "No se encontraro profesores disponibles";
          }
        } catch (ex) {
          throw ex;
        }
      }

      private async onSelectSubject(idSubject: number, _subject: string) {
        this.Subject = _subject;
        toast.promise(this.GETDisponibilyTeacher(idSubject), {
          loading: "consultando profesores disponibles",
          success: (ok) => {
            this.ALC.IdMateria = idSubject;
            toast.promise(this.GETAssignedTeacher(idSubject), {
              loading: "consultando profesores...",
              success: "consulta terminada",
              error: "Error al cargar datos",
            });
            return ok;
          },
          error: (ex) => {
            this.ALC.IdMateria = 0;
            this.setState({ availableteacher: [] });
            toast.promise(this.GETAssignedTeacher(idSubject), {
              loading: "consultando profesores...",
              success: "consulta terminada",
              error: "Error al cargar datos",
            });
            return ex;
          },
        });
      }

      private async GETAssignedTeacher(idSubject: number): Promise<string> {
        try {
          this.setState({ teacherasigned: [] });
          let _teachers: ITeacherDisponibilitySubject[] =
            await this.ALC.GETAssignedTeacherByIdSubject(
              idSubject,
              this.ALC.IdGrupo
            );
          this.setState({ teacherasigned: _teachers });
          return "Profesores consultados";
        } catch (ex) {
          throw ex;
        }
      }

    render() {
        return (
            <main className='css_showOverflow'>
                <header>

                </header>
                <section className='d-flex'>
                    <div className='container p-4 h-100'>


                        <div className="col-md-6 offset-md-13 ">
                            <div className="card-body">
                                <div className="row h-100 justify-content-center align-items-center">                            
                                    {
                                        this.state.subjects.length > 0 &&
                                            this.state.subjects.map((item) => (
                                                <div className="css-table-row row_tr card"
                                                onClick={() =>
                                                    {
                                                        this.onSelectSubject(item.idMateria, item.Nombre)
                                                    }
                                                }
                                                key={item.idMateria}
                                                >
                                                    <div className='d-block'>
                                                        <div>MATERIA</div>
                                                        <div>{item.Nombre}</div>
                                                    </div>

                                                    <div>CUATRIMESTRE</div>
                                                    <div>{item.Cuatrimestre}</div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className='div-table' style={{width:400}}>
                        <div className="css-table-header">
                            <div>ID</div>
                            <div>MAESTRO</div>
                            <div>PRIORIDAD</div>
                        </div>
                        <div className='css_showOverflow'>
                        {
                            this.state.availableteacher.length > 0 &&
                            this.state.availableteacher.map((item) => (
                                <div className="css-table-row row_tr"
                                    onClick={() => { /*this.onSelectTeacherAvailable(item)*/}}
                                    key={item.idMaestro}
                                >
                                    <div>{item.idMaestro}</div>
                                    <div>{item.Maestro}</div>
                                    <div>{item.Prioridad}</div>
                                </div>
                                )
                            )
                        }
                        </div>    
                    </div>
                </section>
            </main>
        )
    }
}

export default AcademicLoadConfig
/*
    <div className="div-table">
        <div className="div-table-row">
        <div className="div-table-colspan">Header</div>
        </div>
        <div className="ddiv-table-labels">
            <div>ID</div>
            <div>MATERIA</div>
            <div>CUATRIMESTRE</div>
            <div>CUATRIMESTRE</div>
            <div>CUATRIMESTRE</div>
        </div>
        <div className="div-table-row">
        <div className="div-table-col">001</div>
        <div className="div-table-col">002</div>
        <div className="div-table-col">003</div>
        <div className="div-table-col">004</div>
        </div>
        <div className="div-table-row">
        <div className="div-table-col">xxx</div>
        <div className="div-table-col">yyy</div>
        <div className="div-table-col">www</div>
        <div className="div-table-col">www1</div>

        </div>
        <div className="div-table-row">
        <div className="div-table-col">ttt</div>
        <div className="div-table-col">uuu</div>
        <div className="div-table-col">Mkkk</div>
        <div className="div-table-col">Mkkkww</div>
        </div>

    </div>
*/