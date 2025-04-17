import { Field, Input, Label, Switch } from "@headlessui/react";


const Switcher: React.FC<{name: string, onChange?: any, value: any}> = ({name, onChange, value}) => {


    return (
            <Field>
                <Label> {name} </Label>
                <Input style={{border: 'solid'}} onChange={onChange} value={value}/>
            </Field>
    )
}


export default Switcher;