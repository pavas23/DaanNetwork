import React, { Fragment, useState } from 'react';
import styles from '../../css/Donor/DonationForm.module.css';

const DonationForm = () => {
    const [formData, setFormData] = useState({
        donationRequestNum: '',
        quantity: '',
        numberDaysBeforeExpiry: '',
        description: '',
        pickUpLocation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do stuff
        console.log(formData);
    };

    return (
        <Fragment>
            <form className={styles['form-container']} onSubmit={handleSubmit}>
                <h1 className={styles["form-header"]}>Donation Details</h1>
                <label className={styles['form-label']}>
                    First Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label']}>
                    Last Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label']}>
                    Phone Number:
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label']}>
                    Donation Quantity (in kg):
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label']}>
                    Number of Days Before Expiry:
                    <input
                        type="number"
                        name="numberDaysBeforeExpiry"
                        value={formData.numberDaysBeforeExpiry}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label']}>
                    Pick Up Location:
                    <input
                        type="text"
                        name="pickUpLocation"
                        value={formData.pickUpLocation}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label']}>
                    Donation Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <button type="submit" className={styles['form-button']}>Submit Donation Request</button>
            </form>

        </Fragment>
    );
};

export default DonationForm;
