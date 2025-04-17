import Switcher from "@/components/Switcher";
import TextField from "@/components/TextField";
import { Field, Fieldset, Input, Label, Legend, Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import { postSheetData } from "../actions";
import DatePicker from "react-datepicker";
import { format, formatDistance } from "date-fns";



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

        console.log('postData: ', postData);

        postSheetData(postData);
    }


    return(
        <Formik
            initialValues={initialFormValues}
            onSubmit={(values) => handleSubmitForm(values)}>
            {({values, handleSubmit, handleChange, setFieldValue}) => {

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

                    <div className="flex flex-row">
                    <label>Name</label>
                    <input name="name" value={values.name} onChange={handleChange} style={{border: 'solid'}}/>
                    </div>

                    <div>
                    <label>Agency</label>
                    <input name="agency" value={values.agency} onChange={handleChange} style={{border: 'solid'}}/>
                    </div>

                    <div className="flex flex-row">
                    <label>Check-In</label>
                    <DatePicker className='border-solid' selected={startDate} onChange={(val) => handleDateChange(val, true)}/>
                    <label>Check-Out</label>
                    <DatePicker className='border-solid' selected={endDate} onChange={(val) => handleDateChange(val, false)}/>
                    </div>

                    <div>
                    <label>Room</label>
                    <input name="room" value={values.room} onChange={handleChange} style={{border: 'solid'}}/>
                    </div>

                    <div>
                    <label>Vuelos</label>
                    <input name="vuelos" value={values.vuelos} onChange={handleChange} style={{border: 'solid'}}/>
                    </div>

                    <div>
                    <label>Paid</label>
                    <input type='checkbox' name="paid" onChange={handleChange}/>
                    </div>

                    <div>
                    <label>Group Quantity</label>
                    <input name="quantity" onChange={handleChange} style={{border: 'solid'}}/>
                    </div>

                    <Fieldset>
                    <label>Vegetarian</label>
                    <input type='checkbox' name="vegetarian" onChange={handleChange}/>

                    <label>Vegan</label>
                    <input type='checkbox' name="vegan" onChange={handleChange}/>

                    <label>Pescetarian</label>
                    <input type='checkbox' name="pescetarian" onChange={handleChange}/>

                    <label>Gluten-Free</label>
                    <input type='checkbox' name="glutenFree" onChange={handleChange}/>

                    <div>
                    <label>Allergies</label>
                    <input name="agency" value={values.allergy} onChange={handleChange} style={{border: 'solid'}}/>
                    </div>
                    </Fieldset>
                </Fieldset>
                <button type='submit' style={{background: 'blue'}}> Submit </button>
                </form>
            )}}
        </Formik>
    )
}