"use client";

import { SetStateAction, useState } from "react";
import { getSheetData, postSheetData } from "./actions";
import { Button, Input, Textarea } from "@headlessui/react";
import ApplicantForm from "./applicantForm/applicantForm";

export default function Page() {

  const [data, setData] = useState<any>([])
  const [input, setInput] = useState('')

  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response)
    setData(response.data)
  };

  const handleOnPostSheetDataClick = async () => {
    postSheetData([input]);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>

      <ApplicantForm/>

    {data?.map((row: any[]) => {
        return ( 
        <div style={{display: 'flex', flexDirection: 'row'}}> 
          {row?.map((cell) => <div style={{margin: '5px'}}>{cell}</div>)}
        </div>
        )
      })}

      
    </div>);
}