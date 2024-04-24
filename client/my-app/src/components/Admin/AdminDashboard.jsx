import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardCard from './DashboardCard';

const AdminDashboard = () => {
  return (
    <div className='row p-4'>
        <DashboardCard/>
        <DashboardCard/>
        <DashboardCard/>
        <DashboardCard/>
        <DashboardCard/>


    </div>
   
  );
};

export default AdminDashboard;
