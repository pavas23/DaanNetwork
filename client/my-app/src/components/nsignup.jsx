import React from 'react';
import './CSS files/nsignup.css';


function nsignup() {
  return (
    <div className='signup_box'>
		<div className='signup_title'>NGO-Registration</div>
		<div className='signup_form'>
			<div className='row'>
				<div className='signup_text'>Name of Applicant Organisation: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>
			</div>
			<div className='row'>
				<div className='signup_text'>PAN Number of Applicant Organization: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Name of the Head of the Organisation: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>PAN Number of Applicant Organization: </div>
				<div className='signup_input_element'>
					<select className='signup_input'>
						<option value=''>Male</option>
						<option value=''>Female</option>
						<option value=''>Others</option>
					</select>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Email (used for sign in): </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Password: </div>
				<div className='signup_input_element'>
					<input type='Password' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Contact Number: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Website URL: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Address: </div>
				<div className='signup_input_element'>
					<textarea type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>GST Number of the Organisation: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Registration Number: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
			<div className='row'>
				<div className='signup_text'>Upload Registration Certificate for Verification: </div>
				<div className='signup_input_element'>
					<input type='text' className='signup_input'/>
				</div>	
			</div>
		</div>	
    </div>
  );
}


export default nsignup;