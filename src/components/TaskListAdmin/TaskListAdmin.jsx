'use client';
import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";

export default  function TaskListAdmin() {
    const [data, setData] = useState([
        {
        _id:1,
        title:"task 1",
        description:"task 1",
        assigned_to : "surya",
        created_on : "10-10-2024"
    },
    {
        _id:2,
        title:"task 1",
        description:"task 1",
        assigned_to : "surya",
        created_on : "10-10-2024"
    },
    {
        _id:3,
        title:"task 1",
        description:"task 1",
        assigned_to : "surya",
        created_on : "10-10-2024"
    }

]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch('/api/data');
            // const result = await response.json();
            // setData(result);
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount
 
    return (
        <>
            <div className="overflow-x-auto">
            <table className="table bg-white">
                <thead>
                <tr className='bg-primary text-white'>
                    <th>
                        S.NO
                    </th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                    {data.map((rs) => (
                    <tr className="hover" key={rs._id}>
                         <td>{rs._id}</td>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <Image
                                            src={rs.image}
                                            alt={rs.name}
                                            width={80}
                                            height={80}
                                            className="rounded-lg"
                                    />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">{rs.title}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            ${rs.description}
                        </td>
                        <td>{rs.created_on}</td>
                        <th>
                            <Link href={`/editProduct/${rs._id}`}>
                                <button className="btn btn-primary btn-sm"><FaPlus/></button>
                            </Link>
                        </th>
                    </tr>
                    ))}                    
                </tbody>
            </table>
            </div>
        </>
    );

}
