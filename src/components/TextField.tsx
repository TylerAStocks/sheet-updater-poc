import { Field, Input, Label, Switch } from "@headlessui/react";


const Switcher: React.FC<{label: string, name: string, onChange?: any, value: any, onBlur?: any, error?:string, touched?: boolean}> = ({label, name, onChange, value, onBlur, error, touched}) => {


    return (
        <div>
        <label>{label}</label>
        <input name={name} value={value} onChange={onChange} onBlur={onBlur} style={{border: 'solid'}}/>
        {error && touched ? (
                        <div style={{color: 'red'}}>{error}</div>
                    ) : null}
        </div>
    )
}


export default Switcher;