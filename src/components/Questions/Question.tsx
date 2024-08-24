import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { Column } from 'react-table';
import { Question } from '../../../types';
import './Questions.css';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/questions')
      .then(response => response.json())
      .then(data => 
      {
        const newData: Question[] = [];
        data.forEach((question: any) => {
          newData.push({
            platform: question.platform,
            link: question.questionLink
          });
        });
        setQuestions(newData);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const columns: Column<Question>[] = React.useMemo(
    () => [
      {
        Header: 'Sn. no.',
        id: 'serial',  // Unique identifier for this column
        accessor: (_: Question, index: number) => index + 1,
      },
      {
        Header: 'Platform',
        accessor: 'platform',  // This should match the Question type property
      },
      {
        Header: 'Link',
        accessor: 'link',  // This should match the Question type property
      },
      {
        Header: '_',
        Cell: ({ row }: { row: any }) => (
          <a href={row.original.link} target="_blank" rel="noreferrer">
            View Problem
          </a>
        ),
      }
    ],
    []
  );

  return (
    <div className="questions-page">
      <h1>Questions</h1>
      <DataTable columns={columns} data={questions} />
    </div>
  );
};

export default QuestionsPage;
