 'use client'
import SubsTableItem from '@/Components/AdminComponents/SubsTableItem'
import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';
 const page = () => {
  const [emails,setEmails]=useState([]);
  const fetchEmails=async()=>{
    const response=await axios.get('/api/email');
    setEmails(response.data.emails);
  }

  const deleteEmail=async(mongoId)=>{
    const response=await axios.delete('/api/email',{
      params:{id:mongoId}
    })
    if(response.data.success){
      toast.success(response.data.msg);
      fetchEmails();
    }
    else{
      toast.error("Error Deleting Email");
    }
  }

  useEffect(()=>{
    fetchEmails();
  },[])

   return (
     <div className="flex-1 pt-4 px-3 sm:pt-12 sm:px-5 sm:pl-16">
  <h1 className="text-lg sm:text-xl font-semibold">
    All Subscriptions
  </h1>

  <div className="relative mt-4 border border-gray-300 rounded-lg overflow-x-auto">
    <table className="min-w-[480px] w-full text-sm text-gray-600">
      <thead className="text-xs sm:text-sm text-left text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-3 py-3">
            Email Subscription
          </th>
          <th className="hidden sm:table-cell px-3 py-3">
            Date
          </th>
          <th className="px-3 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {emails.map((item, index) => (
          <SubsTableItem
            key={index}
            mongoId={item._id}
            deleteEmail={deleteEmail}
            email={item.email}
            date={item.date}
          />
        ))}
      </tbody>
    </table>
  </div>
</div>

   )
 }
 
 export default page
 