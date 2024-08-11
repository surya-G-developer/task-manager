'use client';
import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { apiRequest } from '@/utils/request';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Title from '../Title/Title';
import TaskAddEditModal from '../TaskAddEditModal/TaskAddEditModal';
import { FaEdit } from "react-icons/fa";

export default  function TaskListAdmin( recall) {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState({})
    const router = useRouter();
    const [reload, setReload] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const resp = await apiRequest('api/task', 'GET');
            console.log(resp.status, '1')
            console.log(resp.status, 'resp.data.status')
            if (resp.status == 'success') {
                console.log(resp, 'inside success')
                setData(resp.data.data)
            }
        };
        fetchData();
    }, [reload]); 

    
    const deleteTask= async (id) => {
        const confirmed = confirm("Are you sure ?");
        if (confirmed) {
            const resp = await apiRequest(`api/task?id=${id}`, 'DELETE');
            console.log(resp.status, "outside");
            if (resp.status == 'success') {
                toast.success(resp.data.msg, {
                    hideProgressBar: false,
                    closeOnClick: true,
                  });
                  router.refresh()
                  setReload(reload+1)
                 
            } 
        }
    };
    const onClickTrigger = () =>{
        document.getElementById('my_modal_5').showModal()
    }
    const onClickEdit = (data) =>{
        setSelectedData(data)
        document.getElementById('my_modal_5').showModal()
    }
 
    return (
        <>
        <Title
        title="Task List"
        buttonText="Add Task"
        onClick={onClickTrigger}
        />
            <div className="overflow-x-auto">
            <table className="table bg-white">
                <thead>
                <tr className='bg-primary text-white'>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Desc</th>
                    <th>Assign To</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {data.length > 0 && data.map((val, ind) => (
                    <tr className="hover" key={val.ind}>
                         <td>{ind + 1}</td>
                        <td>{val.title}</td>
                        <td>{val.desc}</td>
                        <td>{val.assign_name}</td>
                        <td><div className="badge badge-success text-white">{val.status}</div></td>
                        <th>
                       
                            <button className="btn btn-primary btn-sm text-white" onClick={() => {onClickEdit(val)}}><FaEdit size={18}/></button>
                            <button className="btn btn-error btn-sm text-white" onClick={() => {deleteTask(val.id)}}><MdDelete size={18} /></button>
                            
                            
                                
                        </th>
                    </tr>
                    ))}                    
                </tbody>
            </table>
            </div>
            <TaskAddEditModal  selectedData={selectedData}/>
        </>
    );

}
