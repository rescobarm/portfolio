import { ChangeEvent, useState } from "react";

//export function useForm<T>(initState: T){
export const useForm = <T extends Object>(initState: T) => {
    const [_form, _setForm ] = useState(initState);

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;
        _setForm({
            ..._form,
            [name]: value
        });
    }

    return {_form, handleChange};
}