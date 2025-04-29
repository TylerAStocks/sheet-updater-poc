import CheckBox from "@/components/CheckBox";
import TextField from "@/components/TextField";
import { Field, Fieldset, Input, Label, Legend, Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import { postSheetData } from "../actions";
import DatePicker from "react-datepicker";
import { format, formatDistance } from "date-fns";
import * as Yup from 'yup';



import "react-datepicker/dist/react-datepicker.css";

const styles = {
    input: {
        border: 'solid', 
        borderColor: 'gray', 
        margin: '3px', 
        maxWidth: '120px', 
        borderRadius: '6px',
        padding: '3px',
        background: 'white'
    }
}

interface FormValues {
    name: string; 
    agency: string; 
    checkIn: string; 
    checkOut: string; 
    room: string;
    vuelos: string;
    paid: boolean;
    quantity: string;
    days: number;
    vegetarian: boolean; 
    vegan: boolean; 
    pescetarian: boolean; 
    glutenFree: boolean; 
    allergy: string;
}

function formatPostData(values: FormValues, days: number, formattedDates: string[]) {
    
    const postValues = {...values, days, checkIn: formattedDates[0], checkOut: formattedDates[1]}
    console.log('postValues: ', postValues)


    return Object.values(postValues).map((val) => {
        if (val === true) {
            return 'X'
        } else if (val === false) {
            return null
        } else {
            return val
        }
    })
    
}



const FormSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    agency: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    room: Yup.number().required('Required'),
    vuelos: Yup.string(),
    quantity: Yup.number().required('Required'),
    allergy: Yup.string(),
  });



const initialFormValues: FormValues = { //!!ORDER MATTERS!!
    name: '', 
    agency: '', 
    checkIn: '', 
    checkOut: '',     
    room: "",
    vuelos: "",
    paid: false, //note on payment?
    quantity: "",
    days: 0, 
    vegetarian: false, 
    vegan: false, 
    pescetarian: false, 
    glutenFree: false, 
    allergy: '',
}

export default function ApplicantForm() {

    const date = new Date();
    const [startDate, setStartDate] = useState( date )
    const [endDate, setEndDate] = useState( date )


    useEffect(() => {
        if (startDate > endDate) {
            setEndDate(startDate)
        }
    }, [startDate, endDate])

    const handleSubmitForm = (values: FormValues) => {

        const days = parseInt(formatDistance(endDate, startDate))

        const formattedStart = format(startDate, "MM/dd/yyyy")
        const formattedEnd = format(endDate, "MM/dd/yyyy")
        const postData = formatPostData(values, days, [formattedStart, formattedEnd])

        postSheetData(postData);
    }



    return(
        <Formik
            initialValues={initialFormValues}
            isInitialValid={false}
            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {

                handleSubmitForm(values)
                resetForm();
          
          }}>
            {({values, handleSubmit, handleChange, setFieldValue, isValid, errors, touched, handleBlur}) => {

                const handleDateChange = (date, isStart) => {
                    if (isStart) {
                        setStartDate(date)
                    } else {
                        setEndDate(date)
                    }
                }

                return (
                <form onSubmit={handleSubmit} >
                <Fieldset className="flex flex-col space-y-6 rounded-xl bg-black/5 p-6 sm:p-10">
                    <Legend className="text-base/7 font-semibold text-black">Volunteer details</Legend>


                    <div className="flex flex-row">
                    <TextField label="Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name}/>
                    <TextField label="Agency" name="agency" value={values.agency} onChange={handleChange} onBlur={handleBlur} error={errors.agency} touched={touched.agency}/>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col">
                        <label>Check-In</label>
                        <div style={styles.input}>
                        <DatePicker className='border-solid' selected={startDate}  onChange={(val) => handleDateChange(val, true)}/>
                        </div>
                        </div>

                    <div className="flex flex-col">
                    <label>Check-Out</label>
                    <div style={styles.input}>
                    <DatePicker className='border-solid' selected={endDate} onChange={(val) => handleDateChange(val, false)}/>
                    </div>
                    </div>
                    </div>

                    <div className="flex flex-row">
                    <TextField label="Room" name="room" value={values.room} onChange={handleChange} onBlur={handleBlur} error={errors.room} touched={touched.room}/>

                    <div className="flex flex-col">
                    <label >Gender:</label>

                    <div style={styles.input}>
                    <select name="gender">
                    <option value="male" className="w-1">Male</option>
                    <option value="female" className="w-1">Female</option>
                    <option value="nonbinary" className="w-1">Nonbinary</option>
                    <option value="other" className="w-1">Other</option>
                    </select>
                    </div>
                    </div>
                    </div>

                    <div className="flex flex-row">
                    <TextField label="Vuelos" name="vuelos" value={values.vuelos} onChange={handleChange} onBlur={handleBlur} error={errors.vuelos} touched={touched.vuelos}/>

                    <TextField label="Group Quantity" name="quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur} error={errors.quantity} touched={touched.quantity}/>
                    </div>

                    <Fieldset className="flex flex-col shrink" style={{background: 'yellow'}}>
                        <CheckBox label={"Vegetarian"} name={"vegetarian"} value={values.vegetarian} onChange={handleChange}/>

                        <CheckBox label={"Vegan"} name={"vegan"} value={values.vegan} onChange={handleChange}/>

                        <CheckBox label={"Pescetarian"} name={"pescetarian"} value={values.pescetarian} onChange={handleChange}/>

                        <CheckBox label={"Gluten-Free"} name={"glutenFree"} value={values.glutenFree} onChange={handleChange}/>

                    <TextField label="Allergies" name="allergy" value={values.allergy} onChange={handleChange} onBlur={handleBlur} error={errors.allergy} touched={touched.allergy}/>
                    </Fieldset>
                </Fieldset>
                <button type='submit' style={{background: isValid ? 'blue' : 'gray', borderRadius: '6px', padding: '3px', margin: '3px'}}> Submit </button>
                </form>
            )}}
        </Formik>
    )
}