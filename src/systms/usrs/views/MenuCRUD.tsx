import { ChangeEvent, useState } from "react";
import { useForm } from "../../../hooks/useForm";

interface IMenu {
    Action: string,
    Location: string,
    NameMenu: string,
    idMenu: number
}

export const MenuCRUD = () => {

    const { _form, handleChange } = useForm<IMenu>({
        Action: 'OAuth',
        Location: 'Top',
        NameMenu: 'Autenticar',
        idMenu: 2
    });
    /*const [formulario, setFormulario ] = useState({
        Action: 'OAuth',
        Location: 'Top',
        NameMenu: 'Autenticar',
        idMenu:'2'
    });

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;
        setFormulario({
            ...formulario,
            [name]: value
        });
        console.log(name);
        console.log(value);
    }*/

    return(
        <>
            <h1>MENU CRUD</h1>
            <input type="text"
            name="NameMenu"
            onChange={ handleChange }
            value={_form.NameMenu}
            placeholder="Name Menu" title="n" />
            <br />
            <input type="text"
            name="Action"
            onChange={ handleChange }
            value={_form.Action}
            placeholder="Action" title="t" />
            <br />
            <pre>{ JSON.stringify(_form) }</pre>
            <button id="btnSave" value={"Click me"} title="click" >Click me</button>
        </>
    )
}
