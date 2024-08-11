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
import { MdModeEdit } from "react-icons/md";

export default function TaskListAdmin() {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState({})
    const [modTitle, setModTitle] = useState('Add Task')
    const router = useRouter();


    const fetchData = async () => {
        const resp = await apiRequest('api/task', 'GET');
        if (resp.status == 'success') {
            console.log(resp, 'inside success')
            setData(resp.data.data)
            setSelectedData({})
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const deleteTask = async (id) => {
        const confirmed = confirm("Are you sure ?");
        if (confirmed) {
            const resp = await apiRequest(`api/task?id=${id}`, 'DELETE');
            if (resp.status == 'success') {
                toast.success(resp.data.msg, {
                    hideProgressBar: false,
                    closeOnClick: true,
                });
                router.refresh()
                fetchData()
            }
        }
    };
    const onClickTrigger = () => {
        setModTitle('Add Task')
        document.getElementById('modal_add_edit').showModal()
    }
    const onClickEdit = (data) => {
        setModTitle('Edit Task')
        setSelectedData(data)
        document.getElementById('modal_add_edit').showModal()
    }
    const emptySelectedData = (data) => {
        setSelectedData({})
    }

    return (
        <>
            <Title
                title="Tasks List"
                buttonText="Add Task"
                onClick={onClickTrigger}
            />
            <div className="overflow-x-auto">
                <table className="table bg-white">
                    <thead>
                        <tr className='bg-primary text-white'>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Estimate</th>
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
                                <td>{val.estimation_time ? val.estimation_time + ' hours' : '---'}</td>
                                <td>{val.assign_name}</td>
                                <td><div className={`badge  text-white ${val.status == 'open' ? 'badge-error' : val.status == 'closed' ? 'badge-success' : 'badge-warning'}`}>{val.status}</div></td>
                                <th>
                                    <div className='flex gap-1 items-center'>
                                        <button className="btn btn-primary btn-sm text-white" onClick={() => { onClickEdit(val) }}><MdModeEdit size={18} /></button>
                                        <button className="btn btn-error btn-sm text-white" onClick={() => { deleteTask(val.id) }}><MdDelete size={18} /></button>
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TaskAddEditModal selectedData={selectedData} fetchData={fetchData} modTitle={modTitle} emptySelectedData={emptySelectedData} />
        </>
    );

}
