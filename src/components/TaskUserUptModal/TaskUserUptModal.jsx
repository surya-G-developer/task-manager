'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { apiRequest } from '@/utils/request';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TaskUserUptModal({ selectedData = {}, fetchData, emptySelectedData }) {
    const [tskEst, setTskEst] = useState('');
    const [tskCmt, setTskCmt] = useState('');

    useEffect(() => {
        if (selectedData.estimation_time) {
            setTskEst(selectedData.estimation_time);
        }
        if (selectedData.comments) {
            setTskCmt(selectedData.comments);
        }
    }, [selectedData]);
    //   const [userList, setUserList] = useState([]);
    const router = useRouter();


    const closeStateClear = () => {
        setTskEst('');
        setTskCmt('');
        emptySelectedData();
        document.getElementById('modal_add_edit_user').close();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //alert("handlesubmit called")
        let body = {
            estimate: tskEst,
            comments: tskCmt,
            id: selectedData.id ? selectedData.id : null
        }
        const resp = await apiRequest('api/users/task', 'POST', body);
        if (resp.status == 'success') {
            toast.success(resp.data.msg, {
                hideProgressBar: false,
                closeOnClick: true,
            });
            closeStateClear();
            fetchData()
            router.refresh();
        }

    };


    return (
        <>
            <dialog id="modal_add_edit_user" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box p-5">
                    <button className="btn btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeStateClear()}>✕</button>
                    <h3 className="font-bold text-lg">{selectedData.title ? 'Edit ' : 'Add '}Task</h3>
                    <div className="divider"></div>
                    <div className="flex justify-between items-center">
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Task Estimation in Hours</span>
                            </div>
                            <input
                                onChange={(e) => setTskEst(e.target.value)}
                                value={tskEst}
                                className="input input-bordered input-accent w-full max-w-xs"
                                type="number"
                                placeholder="10"
                                disabled={selectedData.estimation_time ? true : false}
                                required
                            />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Comments</span>
                            </div>
                            <textarea onChange={(e) => setTskCmt(e.target.value)}
                                value={tskCmt}
                                className="textarea textarea-info w-full max-w-xs"
                                type="text"
                                placeholder="Task comments"
                                required
                            >

                            </textarea>
                        </label>


                        <div className="pt-5 flex justify-center">
                            <button type="submit" className="btn btn-primary">
                                {selectedData.title ? 'Update ' : 'Add '}Task
                            </button>

                        </div>

                    </form>
                </div>
            </dialog>
        </>

    );
}
