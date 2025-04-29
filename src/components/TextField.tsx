import { Field, Input, Label, Switch } from "@headlessui/react";


const TextField: React.FC<{label: string, name: string, onChange?: any, value: any, onBlur?: any, error?:string, touched?: boolean}> = ({label, name, onChange, value, onBlur, error, touched}) => {


    return (
        <div className="flex flex-col max-w-100px m-2" style={{margin: '3px', maxWidth: '120px'}}>
        <label>{label}</label>
        <input className="max-w-100" name={name} value={value} onChange={onChange} onBlur={onBlur} style={{border: 'solid', borderColor: 'gray' , borderRadius: '6px', padding: '3px', background: 'white'}}/>
        {error && touched ? (
                        <div style={{color: 'red'}}>{error}</div>
                    ) : null}
        </div>
    )
}


export default TextField;