'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import { MdAdminPanelSettings } from "react-icons/md";

export default function Header() {
  const { data } = useSession()
  console.log("data", data)
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Task Manager</a>
  </div>
  <div className="flex-none">
   
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="avatar placeholder">
          <div className="bg-primary text-neutral-content w-8 rounded-full">
            <span>{data && data.user && data.user.name.charAt(0)}</span>
          </div>
      </div>
      </div>
      
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{data && data.user.name}</span>
          <span className="text-info flex flex-grow items-center"><MdAdminPanelSettings size={25}/> {data && data.user.role}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={() => signOut({callbackUrl: "/", redirect:false})}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
