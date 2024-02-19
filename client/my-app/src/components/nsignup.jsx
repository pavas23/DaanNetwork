import './CSS files/nsignup.css';
import React, { useState } from 'react';


function NGOsignup() {

	const initialValues={
		ngo_name:"",
		ngo_pan:"",
		ngo_head:"",
		email:"",
		password:"",
		gender:"Male",
		contact:"",
		website:"",
		address:"",
		gst:"",
		reg_no:"",
		file:0	
	}

	const [formValues,setFormValues]=useState(initialValues);
	const [formErrors,setFormErrors]=useState({});
	const [isSubmit,setIsSubmit]=useState(false);
	const [file,setFile]=useState();

	const handleChange=(e)=>{
		setFormValues({...formValues,[e.target.name]:e.target.value});
	}

	const handleSubmit=(e)=>{
		e.preventDefault();
		setFormErrors(validateForm(formValues));
		setIsSubmit(true);
	}

	const handleUpload=(e)=>{
		e.preventDefault();
		setFile(e.target.files[0]);
		formValues.file+=1;
	}
	
	const validateForm=(values)=>{
		const errors={};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/i;
		if(!values.file){
			errors["error"]="Please upload the registration certificate!";
			return errors;
		}
		for(let item in values){
			if(!values[item] && item!=="website" && item!=="gst" && item!=="file"){
				errors["error"]="Please fill out all the required details!";
				return errors;
			}
		}
		if(!regex.test(values.email)){
			errors["error"]="Please enter a valid email address!";
		}

		else if(values.password.length<8){
			errors["error"]="Password should be of minimum 8 characters!";
		}
		else if(values.contact.length!==10  || isNaN(values.contact)){
			errors["error"]="Please enter a valid contact number!";
		}
		return errors;
	}

	return (
		<div className='signup_box'>
			<div className='signup_title'>NGO-Registration</div>
			<form onSubmit={handleSubmit}>
				<div className='signup_form'>
					<div className='row'>
						<div className='signup_text'>Name of Applicant Organisation:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<input type='text'name='ngo_name' className='signup_input' value={formValues.ngo_name} onChange={handleChange}/>
						</div>
					</div>
					<div className='row'>
						<div className='signup_text'>PAN Number of Applicant Organization:<span style={{color:'red' }}>*</span></div>
						<div className='signup_input_element'>
							<input type='text' name='ngo_pan' className='signup_input' value={formValues.ngo_pan} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Name of the Head of the Organisation:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<input type='text' name='ngo_head' className='signup_input' value={formValues.ngo_head} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Gender:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<select name='gender' className='signup_select' value={formValues.gender} onChange={handleChange} defaultValue="">
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="others">Others</option>
							</select>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Email (used for sign in):<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<input type='text' name='email' className='signup_input' value={formValues.email} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Password:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<input type='Password' name='password' className='signup_input' value={formValues.password} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Contact Number:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<input type='text' name='contact' className='signup_input' value={formValues.contact} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Website URL: </div>
						<div className='signup_input_element'>
							<input type='text' name='website' className='signup_input' value={formValues.website} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Address:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<textarea  style={{fontFamily:"sans-serif"}} type='text' name='address' maxLength="500" className='signup_textarea' value={formValues.address} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>GST Number of the Organisation: </div>
						<div className='signup_input_element'>
							<input type='text' name='gst' className='signup_input' value={formValues.gst} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Registration Number:<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<input type='text' name='reg_no' className='signup_input' value={formValues.reg_no} onChange={handleChange}/>
						</div>	
					</div>
					<div className='row'>
						<div className='signup_text'>Upload Registration Certificate for Verification: (pdf/jpg)<span style={{color:'red' }}>*</span> </div>
						<div className='signup_input_element'>
							<label for='reg_certificate' className='input_file_label'>
								<input type='file' name='reg_certificate' className='input_file' onChange={handleUpload} accept='.pdf,.jpg'/>
							</label>	
						</div>	
					</div>
				</div>
				<p style={{color:'red',textAlign:'center',fontWeight:'bold',fontSize:'1.25rem'}}>{formErrors.error}</p>
				<div style={{display:'flex',justifyContent:'center'}}>
					<button type="submit" className='submit_btn'>Submit</button>
				</div>
			</form>
		</div>
	);
}


export default NGOsignup;