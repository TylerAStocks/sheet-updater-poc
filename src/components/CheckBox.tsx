import { Field, Label, Switch } from "@headlessui/react";


const CheckBox: React.FC<{label: string, name: string, onChange?: any, value: any, onBlur?: any, error?:string, touched?: boolean}> = ({label, name, onChange, value, onBlur, error, touched}) => {


    return (
        <div className="flex flex-row" style={{margin: '3px', maxWidth: '120px'}}>
        <label>{label}</label>
        <input type='checkbox' name={name} onChange={onChange} style={{marginLeft: '3px'}}/>
        {error && touched ? (
                        <div style={{color: 'red'}}>{error}</div>
                    ) : null}
        </div>
    )
}


export default CheckBox;