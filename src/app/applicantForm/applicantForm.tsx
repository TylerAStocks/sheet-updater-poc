import Switcher from "@/components/Switcher";
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
        border: 'solid'
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
            validationSchema={FormSchema}
            onSubmit={(values) => handleSubmitForm(values)}>
            {({values, handleSubmit, handleChange, setFieldValue, isValid, errors, touched, handleBlur}) => {

                const handleDateChange = (date, isStart) => {
                    if (isStart) {
                        setStartDate(date)
                    } else {
                        setEndDate(date)
                    }
                }

                return (
                <form onSubmit={handleSubmit}>
                <Fieldset className="flex flex-col space-y-6 rounded-xl bg-black/5 p-6 sm:p-10">
                    <Legend className="text-base/7 font-semibold text-black">Volunteer details</Legend>

                    <TextField label="Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} touched={touched.name}/>
                    

                    <TextField label="Agency" name="agency" value={values.agency} onChange={handleChange} onBlur={handleBlur} error={errors.agency} touched={touched.agency}/>
                    {errors.agency && touched.agency ? (
                        <div>{errors.agency}</div>
                    ) : null}

                    <div className="flex flex-row">
                    <label>Check-In</label>
                    <DatePicker className='border-solid' selected={startDate} onChange={(val) => handleDateChange(val, true)}/>
                    <label>Check-Out</label>
                    <DatePicker className='border-solid' selected={endDate} onChange={(val) => handleDateChange(val, false)}/>
                    </div>

                    <TextField label="Room" name="room" value={values.room} onChange={handleChange} onBlur={handleBlur} error={errors.room} touched={touched.room}/>

                    <TextField label="Vuelos" name="vuelos" value={values.vuelos} onChange={handleChange} onBlur={handleBlur} error={errors.vuelos} touched={touched.vuelos}/>

                    <TextField label="Group Quantity" name="quantity" value={values.quantity} onChange={handleChange} onBlur={handleBlur} error={errors.quantity} touched={touched.quantity}/>

                    <Fieldset>
                    <label>Vegetarian</label>
                    <input type='checkbox' name="vegetarian" onChange={handleChange}/>

                    <label>Vegan</label>
                    <input type='checkbox' name="vegan" onChange={handleChange}/>

                    <label>Pescetarian</label>
                    <input type='checkbox' name="pescetarian" onChange={handleChange}/>

                    <label>Gluten-Free</label>
                    <input type='checkbox' name="glutenFree" onChange={handleChange}/>

                    <TextField label="Allergies" name="allergy" value={values.allergy} onChange={handleChange} onBlur={handleBlur} error={errors.allergy} touched={touched.allergy}/>
                    </Fieldset>
                </Fieldset>
                <button type='submit' style={{background: isValid ? 'blue' : 'red'}}> Submit </button>
                </form>
            )}}
        </Formik>
    )
}