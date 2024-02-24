import React from 'react';
import { Outlet} from 'react-router-dom';
import NgoDonationDrive from './components/Ngo/NgoDonatonDrive';

function App() {
    return (
        <>
            {/* <Outlet/> */}
            <NgoDonationDrive/>
        </>
    );
}

export default App;
