import React, { Component } from "react";

import DisponibilityCntrllr from "../Controllers/DisponibilityCntrllr";
import {
  ICareers,
  ISubjects,
  ITeacherDisponibilities,
  ITeachers,
} from "../Models/ALModels";
//npm instal react-hot-toast
import { Toaster, toast } from "react-hot-toast";

import "./css/Disponibilities.css";

interface Props {
  onClick?:any;
  slctCareers?: ICareers[];
  slctTeachers?: ITeachers[];
  subjects?: ISubjects[];
  teacherDisponibilities?: ITeacherDisponibilities[];
}
interface State {
  slctCareers: ICareers[];
  slctTeachers: ITeachers[];
  subjects: ISubjects[];
  teacherDisponibilities: ITeacherDisponibilities[];
}

export default class Disponibilities extends Component<Props, State> {
  disponibilityCtrllr: DisponibilityCntrllr = new DisponibilityCntrllr();
  handleClick = (e:any) => {
    e.stopPropagation();  //  <------ Here is the magic
  }

  public slctCareer: ICareers = {
    idCarrera: 0,
    Nombre: "Seleccione una carrera",
    Grado: "string",
    Modalidad: "string",
    revoe: "string",
    vigenciarevoe: "string",
    modalidadsep: "string",
  };
  public slctTeachers: ITeachers = {
    idMaestro: 0,
    Nombre: "Seleccione un catedrático",
    Apaterno: "string",
    Amaterno: "string",
    Clave: "string",
    Sexo: "string",
    Grado: "string",
    email: "string",
    telefono: "string",
    cedula: "string",
    password: "string",
  };

  public SlctCareers: ICareers[] = [this.slctCareer];

  public SlctTeachers: ITeachers[] = [this.slctTeachers];

  constructor(props: Props) {
    super(props);
    this.state = {
      slctCareers: props.slctCareers || this.SlctCareers,
      slctTeachers: props.slctTeachers || this.SlctTeachers,
      subjects: [],
      teacherDisponibilities: props.teacherDisponibilities || [],
    };

    toast.promise(this.getDatas(), {
      loading: "Cargando datos",
      success: "Datos cargadas corréctamente",
      error: "Error al cargar datos",
    });
  }

  private async getDatas() {
    let crs: ICareers[] = await this.disponibilityCtrllr.Careers;
    let tea: ITeachers[] = await this.disponibilityCtrllr.Teachers;
    this.setState({
      slctCareers: [this.slctCareer, ...crs],
      slctTeachers: [this.slctTeachers, ...tea],
    });
  }

  private async onFilter(o: string) {
    var res = (await this.disponibilityCtrllr.Careers).filter(
      (f) => f.Modalidad === "Línea"
    );
    switch (o) {
      case "t":
        res = await this.disponibilityCtrllr.Careers;
        this.setState({ slctCareers: res });
        break;
      case "l":
        res = (await this.disponibilityCtrllr.Careers).filter(
          (f) => f.Modalidad === "Línea"
        );
        this.setState({ slctCareers: res });
        break;
      case "m":
        res = (await this.disponibilityCtrllr.Careers).filter(
          (f) => f.Modalidad === "Mixto"
        );
        this.setState({ slctCareers: res });
        break;
      case "p":
        res = (await this.disponibilityCtrllr.Careers).filter(
          (f) => f.Modalidad === "Presencial"
        );
        this.setState({ slctCareers: res });
        break;
    }
  }

  private async onSelectCareer(idCareer: string) {
    toast.promise(this.selectSubjectsByIdCareer(idCareer), {
      loading: "Cargando",
      success: "Materias cargadas corréctamente",
      error: "Error al cargar datos",
    });
  }

  private async selectSubjectsByIdCareer(id: string): Promise<void> {
    let sbjcts: ISubjects[] =
      await this.disponibilityCtrllr.getSubjectsByIdCareer(Number.parseInt(id));
    this.setState({ subjects: sbjcts });
    this.disponibilityCtrllr.idCarrera = Number.parseInt(id);
  }

  private async onSelectSubject(idMateria: number) {
    if (this.disponibilityCtrllr.idMaestro === 0)
      toast.error("Seleccione un catedrático");
    else {
      let founded: boolean = this.state.teacherDisponibilities.some(
        (v) => v.idMateria === idMateria
      ); //   [1].idMateria == id;
      if (!founded) {
        toast.promise(this.saveDisponibility(idMateria), {
          loading: "Guardando disponibilidad",
          success: "Disponibilidad guardada corréctamente",
          error: "Error al cargar datos",
        });
      } else {
        toast.error("El docente ya tiene asignada esta materia");
      }
    }    
  }

  private async onSelectTeacher(idTeacher: string) {
    toast.promise(this.selectedTeacher(idTeacher), {
      loading: "Cargando",
      success: "Catedráticos cargados corréctamente",
      error: "Error al cargar datos",
    });
  }

  private async selectedTeacher(idTeacher: string): Promise<void> {
    let teaDspnblts: ITeacherDisponibilities[] =
      await this.disponibilityCtrllr.getTeacherDisponibilities(
        Number.parseInt(idTeacher)
      );
    this.setState({ teacherDisponibilities: teaDspnblts });
    this.disponibilityCtrllr.idMaestro = Number.parseInt(idTeacher);
  }

  private async saveDisponibility(id: number): Promise<void> {
    let td: ITeacherDisponibilities =
      await this.disponibilityCtrllr.setDisponibility(id);
    let ntd: ITeacherDisponibilities[] = [
      ...this.state.teacherDisponibilities,
      td,
    ];
    this.setState({ teacherDisponibilities: ntd });
  }

  private async onIncreaseDuration(index: ISubjects) {        
    toast.promise(
      this.IncreaseDuration(index),
      {
        loading: "Cargando",
        success: (e) => { return e; },
        error: (e) => { return e; }
      }
    );    
  }

  private async IncreaseDuration(index: ISubjects): Promise<string> {
    try {
      if(index.duracion === null)
        index.duracion = 0;
      index.duracion++;
      let ok: boolean =
      await this.disponibilityCtrllr.updateSubjectDuration(
        index.idMateria,
        index.duracion
      );
      if(ok) {
        let newTDSTmp = [...this.state.subjects];
        this.setState({ subjects: newTDSTmp });
        return "Duración aumentada corréctamente";
      } else {
        throw('Algo ha ido mal...');
      }
      
    } catch(ex) {
      throw(ex);
    }
  }

  private async onDecreaseDuration(index: ISubjects) {        
    toast.promise(
      this.DecreaseDuration(index),
      {
        loading: "Cargando...",
        success: (m)=> { return m; },
        error: (e)=> { return e; }
      }
    );    
  }

  private async DecreaseDuration(index: ISubjects): Promise<string> {
    try {   
      if(index.duracion === null || index.duracion === 0)
        throw('La materia debe durar al menos una sesión.');
      index.duracion--;   
      let ok: boolean =
      await this.disponibilityCtrllr.updateSubjectDuration(
        index.idMateria,
        index.duracion
      );
      if(ok) {
        let newTDSTmp = [...this.state.subjects];
        this.setState({ subjects: newTDSTmp });
        return 'Duración disminuida corréctamente.';
      } else {
        return 'Algo ha ido mal'
      }
    } catch(ex) {
      throw(ex);
    }
  }


/***************************************/

  

  private async onIncreaseProprity(index: number) {
    toast.promise(
      this.increaseProprity(
        this.state.teacherDisponibilities[index].idDisponibilidad,
        this.state.teacherDisponibilities[index].disPrioridad++
      ),
      {
        loading: "Cargando",
        success: "Prioridad aumentada corréctamente",
        error: "Error al aumentar prioridad",
      }
    );
  }

  private async increaseProprity(idDisponibilidad: number, priority: number) {
    console.log(idDisponibilidad + "  -- " + priority);
    priority++;
    let ok: boolean =
      await this.disponibilityCtrllr.updatePriorityTeacherDisponibility(
        idDisponibilidad,
        priority
      );
    if (ok) {
      let newTDSTmp = [...this.state.teacherDisponibilities];
      this.setState({ teacherDisponibilities: newTDSTmp });
    }
  }

  private async onDecreaseProprity(index: number) {
    toast.promise(this.decreaseProprity(index), {
      loading: "Cargando",
      success: "Prioridad disminuida corréctamente",
      error: "Error al disminuir prioridad",
    });
  }

  private async decreaseProprity(i: number) {
    if (this.state.teacherDisponibilities[i].disPrioridad > 0) {
      this.state.teacherDisponibilities[i].disPrioridad--;
      let du: boolean =
        await this.disponibilityCtrllr.updatePriorityTeacherDisponibility(
          this.state.teacherDisponibilities[i].idDisponibilidad,
          this.state.teacherDisponibilities[i].disPrioridad
        );
      if (du) {
        let newTDSTmp = [...this.state.teacherDisponibilities];
        this.setState({ teacherDisponibilities: newTDSTmp });
      }
    } else throw "";
  }

  private async onSelectDisponibility(idDisp: number) {}

  render() {
    return (
      <main className="container p-1 h-10">
        <Toaster position="bottom-right" />
        <div className="row" style={{ width: 1550 }}>
          <div className="row">
            <div>
              <input
                type={"radio"}
                id="filter_t"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("t")}
                value={"TODOS"}
                title="OVER HERE"
              />
              <label htmlFor="filter_t" style={{ cursor: "pointer" }}>
                TODOS
              </label>{" "}
              |{" "}
              <input
                type={"radio"}
                id="filter_l"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("l")}
                value={"En línea"}
                title="OVER HERE"
              />
              <label htmlFor="filter_l" style={{ cursor: "pointer" }}>
                En línea
              </label>{" "}
              |{" "}
              <input
                type={"radio"}
                id="filter_m"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("m")}
                value={"Mixto"}
                title="OVER HERE"
              />
              <label htmlFor="filter_m" style={{ cursor: "pointer" }}>
                Mixto
              </label>{" "}
              |{" "}
              <input
                type={"radio"}
                id="filter_p"
                name="filter"
                style={{ cursor: "pointer" }}
                onClick={() => this.onFilter("p")}
                value={"Presencial"}
                title="OVER HERE"
              />
              <label htmlFor="filter_p" style={{ cursor: "pointer" }}>
                Presencial
              </label>
            </div>
          </div>

          <div className="card" style={{ height: 780 }}>
            <div className="card-body d-flex p-1">
              <div className="m-1 p-1">
                <div className="row">
                  <div className="d-flex p-1">
                    <select
                      style={{ width: 560 }}
                      id="slctCareers"
                      className="form-control m-2"
                      title="Carreras"
                      onChange={(e) => {
                        this.onSelectCareer(e.target.value);
                      }}
                    >
                      {this.state.slctCareers.length > 0 &&
                        this.state.slctCareers.map((item) => (
                          <option key={item.idCarrera} value={item.idCarrera}>
                            {item.Nombre}
                          </option>
                        ))}
                    </select>

                    <select
                      style={{ width: 850 }}
                      id="slctTeachers"
                      className="form-control m-2"
                      title="Maestros"
                      onChange={(e) => {
                        this.onSelectTeacher(e.target.value);
                      }}
                    >
                      {this.state.slctTeachers.length > 0 &&
                        this.state.slctTeachers.map((item) => (
                          <option key={item.idMaestro} value={item.idMaestro}>
                            {item.Nombre}
                          </option>
                        ))}
                    </select>
                  </div>
            
                  <div className="card-body d-flex p-1">
                    <div className="d-flex show_border">
                      <div className="card-body  p-3 m-3 show_border">
                        { /*<!-- DATOS DE MATERIAS --> */}
                        <table
                          style={{ width: 500 }}
                          id="tblSubjects"
                          className="table text-dark"
                        >
                          <thead className="thead-dark">
                            <tr>
                              <th colSpan={4}>MATERIAS:</th>
                            </tr>
                            <tr>
                              <th>Id</th>
                              <th>Materia</th>
                              <th>Cuatrimestre</th>
                              <th>Duraci&oacute;n</th>
                            </tr>
                          </thead>
                          <tbody className="css_tbody">
                            {this.state.subjects.length > 0 &&
                              this.state.subjects.map((item: ISubjects) => (
                                <tr
                                  className="row_tr"
                                  key={item.idMateria}
                                  onClick={() =>
                                    this.onSelectSubject(item.idMateria)
                                  }
                                >
                                  <th>{item.idMateria}</th>
                                  <th>{item.Nombre}</th>
                                  <th>{item.Cuatrimestre}</th>
                                  <th>
                                    <div className="_form">
                                        <div
                                          className="value-button"
                                          id="decrease"
                                          defaultValue="Decrease Value"
                                          onClick={(e) => {
                                              this.onDecreaseDuration(item);
                                              this.handleClick(e);
                                            }                                            
                                          }
                                        >
                                          -
                                        </div>
                                        <input
                                          title={"some"}
                                          className="_input_number"
                                          type={"number"}
                                          value={item.duracion}
                                          disabled
                                        />
                                        <div
                                          className="value-button"
                                          id="increase"
                                          defaultValue="Increase Value"
                                          onClick={(e) =>
                                            { 
                                              this.onIncreaseDuration(item);
                                              this.handleClick(e);
                                            }
                                          }
                                        >
                                          +
                                        </div>
                                      </div>


                                  </th>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="d-flex show_border">
                      <div className="card-body  p-3 m-3 show_border">
                      { /*<!-- PROFERSORES DISPONIBLES PARA LA MATERIA SELECCIONADA --> */}
                        <table
                          style={{ width: 850 }}
                          id="tblTeacherDisponibilities"
                          className="table table-striped"
                        >
                          <thead className="thead-dark">
                            <tr>
                              <th colSpan={6}>MATERIAS PROFESOR:</th>
                            </tr>
                            <tr>
                              <th style={{ display: "none" }}>Id</th>
                              <th>idMateria</th>
                              <th>Programa</th>
                              <th>Materia</th>
                              <th>Cuatrimestre</th>
                              <th style={{ display: "none" }}>Duración</th>
                              <th>Prioridad</th>
                              <th style={{ display: "none" }}>Promedio</th>
                            </tr>
                          </thead>
                          <tbody className="css_tbody">
                            {this.state.teacherDisponibilities.length > 0 &&
                              this.state.teacherDisponibilities
                                .map((item, i) => (
                                  <tr
                                    className="row_tr"
                                    onClick={() =>
                                      this.onSelectDisponibility(
                                        item.idDisponibilidad
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                    key={item.idDisponibilidad}
                                  >
                                    <th style={{ display: "none" }}>
                                      {item.idDisponibilidad}
                                    </th>
                                    <th>{item.idMateria}</th>
                                    <th>{item.Programa}</th>
                                    <th>{item.Materia}</th>
                                    <th>{item.Cuatrimestre}</th>
                                    <th>
                                      <div className="_form">
                                        <div
                                          className="value-button"
                                          id="decrease"
                                          defaultValue="Decrease Value"
                                          onClick={() =>
                                            this.onDecreaseProprity(i)
                                          }
                                        >
                                          -
                                        </div>
                                        <input
                                          title={"some"}
                                          className="_input_number"
                                          type={"number"}
                                          value={item.disPrioridad}
                                          disabled
                                        />
                                        <div
                                          className="value-button"
                                          id="increase"
                                          defaultValue="Increase Value"
                                          onClick={() =>
                                            this.onIncreaseProprity(i)
                                          }
                                        >
                                          +
                                        </div>
                                      </div>
                                    </th>
                                    <th style={{ display: "none" }}>
                                      {item.disPromedio}
                                    </th>
                                  </tr>
                                ))
                                .reverse()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
