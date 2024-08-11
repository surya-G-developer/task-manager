'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { apiRequest } from '@/utils/request';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TaskAddEditModal( {selectedData = {}}) {
    const [tskTitle, setTskTitle] = useState(
        Object.entries(selectedData).length !== 0 ? selectedData.title || '' : ''
      );
      const [tskDeskp, setTskDeskp] = useState(
        Object.entries(selectedData).length !== 0 ? selectedData.desc || '' : ''
      );
      const [selectedOption, setSelectedOption] = useState(
        Object.entries(selectedData).length !== 0
          ? `${selectedData.assign_to || ''}_${selectedData.assign_name || ''}`
          : ''
      );
  const [userList, setUserList] = useState([]);
  const router = useRouter();
  console.log("selectedData", selectedData)
  console.log("tskTitle", tskTitle)

  const handleChange = (event) => {
      setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      alert("handlesubmit called")
      let body ={
        title : tskTitle,
        desc: tskDeskp,
        assign :  selectedOption,
      }
      const resp = await apiRequest('api/task', 'POST', body);
        console.log(resp.status, 'resp.data.status')
            if (resp.status == 'success') {
                toast.success(resp.data.msg, {
                    hideProgressBar: false,
                    closeOnClick: true,
                  });
                  document.getElementById('my_modal_5').close();
                  router.refresh();
            } 
      
  };

  useEffect(() => {
    const fetchUserList = async () => {
        const resp = await apiRequest('api/users', 'GET');
        console.log(resp.status, 'resp.data.status')
        if (resp.status == 'success') {
            console.log(resp, 'inside success')
            setUserList(resp.data.data)
        }
    };
    fetchUserList();
}, []);
  return (
    <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box p-5">
  <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg"> Add Task</h3>
    <div className="divider"></div>
    <div className="flex justify-between items-center">
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Task Title</span>
  </div>
  <input
                onChange={(e) => setTskTitle(e.target.value)}
                value={tskTitle}
                    className="input input-bordered input-accent w-full max-w-xs"
                type="text"
                placeholder="Product Name"
                required 
            />
</label>
<label className="form-control">
  <div className="label">
    <span className="label-text">Task Description</span>
  </div>
  <textarea onChange={(e) => setTskDeskp(e.target.value)}
                value={tskDeskp}
                className="textarea textarea-info w-full max-w-xs"
                type="text"
                placeholder="Product Name"
                required
                >

                </textarea>
</label>
<label className="form-control">
  <div className="label">
    <span className="label-text">Assign to</span>
  </div>
  <select  className="select select-accent w-full max-w-xs" value={selectedOption} onChange={handleChange}>
                    <option value="">Select an option</option>
                    {userList && userList.length > 0 && userList.map((val, ind) =>{
                        const spltData = val.split('_');
                        return(<option key={ind} value={val}>{spltData[1]}</option>)
                    })
                    }
           </select>
</label>

           <div className="pt-5 flex justify-center">
           <button type="submit" className="btn btn-primary">
                Add Task
            </button>

           </div>
           
        </form>
  </div>
</dialog>
    </>
    
  );
}
