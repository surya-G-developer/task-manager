'use client';
import React from 'react'
import { useState } from "react";

export default function TaskAddEditModal() {
    const [tskTitle, setTskTitle] = useState("");
  const [tskDeskp, setTskDeskp] = useState("");
  const [tskAssignFor, setTskAssignFor] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
      setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Selected Value:', selectedOption);
  };
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
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
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
