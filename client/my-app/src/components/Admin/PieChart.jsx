import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const PieChart = (props) => {
   
return (
    <div style={{padding:'0.4rem',margin:'3rem'}}>
        <Pie data={props.data}/>
    </div>
)
}

export default PieChart