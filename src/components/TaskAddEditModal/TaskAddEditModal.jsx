'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { apiRequest } from '@/utils/request';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function TaskAddEditModal({ selectedData = {}, fetchData, modTitle, emptySelectedData }) {
  const [tskTitle, setTskTitle] = useState('');
  const [tskDeskp, setTskDeskp] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  useEffect(() => {
    if (selectedData.title) {
      setTskTitle(selectedData.title);
    }
    if (selectedData.desc) {
      setTskDeskp(selectedData.desc);
    }
    if (selectedData.assign_to && selectedData.assign_name) {
      setSelectedOption(`${selectedData.assign_to}_${selectedData.assign_name}`);
    }
  }, [selectedData]);
  const [userList, setUserList] = useState([]);
  const router = useRouter();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const closeStateClear = () => {
    setSelectedOption('');
    setTskTitle('');
    setTskDeskp('');
    emptySelectedData()
    document.getElementById('modal_add_edit').close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let body = {
      title: tskTitle,
      desc: tskDeskp,
      assign: selectedOption,
      id: selectedData.id ? selectedData.id : null
    }
    closeStateClear();
    const resp = await apiRequest('api/task', 'POST', body);
    if (resp.status == 'success') {
      toast.success(resp.data.msg, {
        hideProgressBar: false,
        closeOnClick: true,
      });
      fetchData()
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
      <dialog id="modal_add_edit" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-5">
          <button className="btn btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeStateClear()}>✕</button>
          <h3 className="font-bold text-lg">{modTitle}</h3>
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
                placeholder="Task title"
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
                placeholder="Task Description"
                required
              >

              </textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Assign to</span>
              </div>
              <select className="select select-accent w-full max-w-xs" value={selectedOption} onChange={handleChange}>
                <option value="">Select an option</option>
                {userList && userList.length > 0 && userList.map((val, ind) => {
                  const spltData = val.split('_');
                  return (<option key={ind} value={val}>{spltData[1]}</option>)
                })
                }
              </select>
            </label>

            <div className="pt-5 flex justify-center">
              <button type="submit" className="btn btn-primary">
                {modTitle == 'Edit Task' ? 'Save' : 'Create'}
              </button>

            </div>

          </form>
        </div>
      </dialog>
    </>

  );
}
