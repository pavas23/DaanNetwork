import  styles from '../../css/Admin/AdminDashboard.module.css';


const DashboardCard = (props) => {
    return (
        <div className="col-xl-3 col-sm-6 col-12 p-2 " style={{marginTop:'0.1rem',maxWidth:'20%'}}> 
        <div className="card">
          <div className="card-content">
            <div className={styles.topCard}>
            <div className="card-body">
              <div className="media d-flex justify-content-center">
                
                <div className="media-body text-right ">
                  <h1 style={{padding:'0'}}>278</h1>
                  <span style={{textAlign:'center'}}>New Posts</span>
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