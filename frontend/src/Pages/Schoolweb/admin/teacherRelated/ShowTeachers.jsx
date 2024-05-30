import React, { useEffect, useState } from 'react'
import {
    Paper
} from '@mui/material';

import * as admin from '../../../../service/admin'
const ShowTeachers = () => {
    const [teachers, setTeachers] = useState([])
    useEffect(() => {
        document.title = 'Show Teachers'
        admin.getTeacherAll()
            .then(res => {
                setTeachers(res[0])
            })
            .catch(err => {
                console.log('err', err)
            })
    }, [])


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.length > 0 && teachers.map(teacher => (
                        <tr key={teacher._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{teacher._id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{teacher.username}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a href={`mailto:${teacher.email}`} className="text-sm text-gray-900">{teacher.email}</a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{teacher.email}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Paper >
    );
};

export default ShowTeachers