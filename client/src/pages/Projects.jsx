import { useQuery } from '@apollo/client';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import Spinner from '../components/Spinner';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Projects() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-sm btn-light w-25 d-inline ms-auto">
          Back
        </Link>
        <h1>{data.project.name}</h1>
        <p>{data.project.description}</p>
        <h2 className="mt-3">Project Status</h2>
        <p className="lead">{data.project.status}</p>

        {data.project.client ? (
          <ClientInfo client={data.project.client} />
        ) : null}

        <EditProjectForm project={data.project} />

        <DeleteProjectButton projectId={data.project.id} />
      </div>
    </>
  );
}
