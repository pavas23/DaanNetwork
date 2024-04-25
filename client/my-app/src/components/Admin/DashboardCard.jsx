import  styles from '../../css/Admin/AdminDashboard.module.css';


const DashboardCard = (props) => {
    return (
        <div className={"col-xl-3 col-sm-6 col-12 p-2  " + styles.topContainer} style={{marginTop:'0.1rem'}}> 
        <div className="card">
          <div className="card-content">
            <div className={styles.topCard}>
            <div className="card-body">
              <div className="media d-flex justify-content-center">
                
                <div className="media-body text-right ">
                  <h1 style={{padding:'0'}}>{Math.round(props.x*100)/100}</h1>
                  <span style={{textAlign:'center',display:'block',width:'100%',fontSize:'0.86rem'}}>{props.statistic}</span>
                </div>
              </div>
            </div>

            </div>
            
          </div>
        </div>
      </div>
    )
}

export default DashboardCard;