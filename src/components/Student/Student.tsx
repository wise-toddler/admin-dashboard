import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { Column } from 'react-table';
import { Student } from '../../../types';
import './Student.css'; // Import the CSS file

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:8000/api/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);
  
  const columns: Column<Student>[] = React.useMemo(
    () => [
      {
        Header: 'Sn. no.',
        accessor: (_, index) => index + 1,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <a href={`/student/${row.original.rollNumber}`}>{row.original.name}</a>
        ),
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Roll Number',
        accessor: 'rollNumber',
      },
    ],
    []
  );

  return (
    <div className="student-page">
      <h1>Students</h1>
      <DataTable columns={columns} data={students} />
    </div>
  );
};

export default StudentPage;
