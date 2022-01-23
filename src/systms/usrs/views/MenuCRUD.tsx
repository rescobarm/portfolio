//import { doc, setDoc } from "firebase/firestore";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { async } from "@firebase/util";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../../../datas/firebase/firebaseConf";
//import db from "../../../firebase/firebaseConf";
import { useForm } from "../../../hooks/useForm";

interface IMenu {
    Action: string,
    Location: string,
    NameMenu: string,
    idMenu: number,
    idDoc: string
}

export const MenuCRUD = () => {
    const [menus, setMenus] = useState<IMenu[]>();

    useEffect(()=> {
        const getMenus = async() => {
            /*const _itemUserMenuCllctn = collection(db, '_itemMenu');//.collection("_itemUserMenu")
            const _itemUserMenuDoc = await getDocs(_itemUserMenuCllctn);
            const userMenu = _itemUserMenuDoc.docs.map(doc => doc.data());
            const temp = JSON.stringify(userMenu);
            const items: IMenu[] = JSON.parse(temp); 
            setMenus(items);
            console.log(userMenu);*/
            onSnapshot(collection(db,'_itemMenu'), (QuerySnapshot) => {
                let mns: IMenu[] = [];
                QuerySnapshot.forEach((doc) => {
                    const temp = JSON.stringify(doc.data());
                    const item: IMenu = JSON.parse(temp);
                    item.idDoc = doc.id;
                    mns.push(item);                    
                    //console.log(item);
                });
                setMenus(mns);
            });

        }
        getMenus();
    }, []);
    const { _form, handleChange } = useForm<IMenu>({
        Action: 'OAuth',
        Location: 'Top',
        NameMenu: 'Autenticar',
        idMenu: 2,
        idDoc: ''
    });

    const onBtnSaveClick = async() => {
        const _itemUserMenuCllctn = collection(db, '_itemMenu');
        await addDoc(_itemUserMenuCllctn, _form);
    };

    const onDelete = async (id:string) => {
        deleteDoc(doc(db, '_itemMenu', id));
        console.log(id);
    }

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
            <button id="btnSave" onClick={ onBtnSaveClick } value={"Click me"} title="click" >Click me</button>
            <ul>
                { 
                    menus?.map((item: IMenu, index: number) => (
                        <li key={item.idDoc}>
                            <h1>{ item.NameMenu }</h1>
                            <br />
                            <h3>{ item.idDoc }</h3>
                            <br />
                            <button onClick={ () => onDelete(item.idDoc) } title="d" >ELIMINAR</button>
                        </li>
                    )) 
                }
            </ul>
        </>
    )
}
