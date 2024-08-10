'use client'
import React from 'react'
import { FaPlus } from "react-icons/fa";


export default function Title({title, buttonText, onClick}) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between p-4">
  <div className="min-w-0 flex-1">
    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{title}</h2>
  </div>
  <div className="mt-5 flex lg:ml-4 lg:mt-0">

    <span className="sm:ml-3">
      <button className="btn btn-active btn-primary"  onClick={onClick}>
      <FaPlus/>
      {buttonText}
</button>
    </span>
  </div>
</div>
  )
}
