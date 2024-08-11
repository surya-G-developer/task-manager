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
import TaskUserUptModal from '../TaskUserUptModal/TaskUserUptModal';
import { FaEdit } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { MdDone } from "react-icons/md";
import { FaComment } from "react-icons/fa";

export default function TaskListUser({ user }) {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState({})
    const router = useRouter();

    const fetchData = async () => {
        const resp = await apiRequest(`api/users/task?id=${user.id}`, 'GET');
        //console.log(resp.status, '1')
        if (resp.status == 'success') {
            console.log(resp, 'inside success')
            setData(resp.data.data)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const completeTask = async (id) => {
        const confirmed = confirm("Do you want to complete the task ?");
        if (confirmed) {
            let body = {
                id: id
            }
            const resp = await apiRequest(`api/users/task`, 'PUT', body);
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
        document.getElementById('modal_add_edit_user').showModal()
    }
    const onClickEdit = (data) => {
        setSelectedData(data)
        document.getElementById('modal_add_edit_user').showModal()
    }
    const emptySelectedData = (data) => {
        setSelectedData({})
    }

    return (
        <>
            <Title
                title="User Tasks"
                buttonText="Add Task"
                showButton={false}
                onClick={onClickTrigger}
            />
            <div className="overflow-x-auto">
                <table className="table bg-white">
                    <thead>
                        <tr className='bg-primary text-white'>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Assign To</th>
                            <th>Estimate</th>
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
                                <td>{val.estimation_time ? val.estimation_time + ' hours' : '---'}</td>
                                <td><div className={`badge  text-white ${val.status == 'open' ? 'badge-error' : val.status == 'closed' ? 'badge-success' : 'badge-warning'}`}>{val.status}</div></td>
                                <th>
                                    {
                                        val.status != 'closed' &&
                                        <div className='flex gap-1 items-center'>
                                            <button className="btn btn-primary btn-sm text-white tooltip" data-tip={val.status == 'open' ? "start" : "comment"} onClick={() => { onClickEdit(val) }}> {val.status == 'open' ? <VscDebugStart size={18} /> : <FaComment />}</button>
                                            {
                                                val.status == 'inProgress' && <button className="btn btn-success btn-sm text-white tooltip" data-tip="complete" onClick={() => { completeTask(val.id) }}><MdDone size={20} /></button>

                                            }
                                        </div>

                                    }





                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TaskUserUptModal selectedData={selectedData} fetchData={fetchData} emptySelectedData={emptySelectedData} />
        </>
    );

}
