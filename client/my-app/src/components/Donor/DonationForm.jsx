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
    async function submitDonationRequest(formData) {
        try {
            const response = await fetch('http://localhost:5004/donor/donation-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit donation request');
            }

            const responseData = await response.json();
            console.log(responseData);
        }
        catch (err) {
            console.log(err);
        }
    }
    const createDonationRequestObject = (formData) => {
        return {
            donationRequestNum: 1, //TODO
            quantity: formData.quantity,
            numberDaysBeforeExpiry: formData.numberDaysBeforeExpiry,
            createdAt: new Date().toISOString(),
            description: formData.description,
            images: [], //TODO
            pickUpLocation: formData.pickUpLocation,
            donor: {},   //TODO
            accepted: false,
            ngo: 'ngoId',   //TODO
        };
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const donationRequestObject = createDonationRequestObject(formData);
        console.log(donationRequestObject);
        await submitDonationRequest(donationRequestObject);
    };

    return (
        <Fragment>
            <form className={styles['form-container']} onSubmit={handleSubmit}>
                <h1 className={styles["form-header"]}>Donation Details</h1>
                <label className={styles['form-label-half']}>
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
                <label className={styles['form-label-half']}>
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
                <label className={styles['form-label-half']}>
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
                <label className={styles['form-label-half']}>
                    Email ID:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label-half']}>
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
                <label className={styles['form-label-half']}>
                    Weeks Before Expiry:
                    <input
                        type="number"
                        name="numberDaysBeforeExpiry"
                        value={formData.numberDaysBeforeExpiry}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required
                    />
                </label>
                <label className={styles['form-label-full']}>
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
                <button type="button" className={styles['form-address-button']}>Detect</button>
                <label className={styles['form-label-full']}>
                    Donation Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles['form-input']}
                        required />
                </label>
                <button type="submit" className={styles['form-button']}>Submit Donation Request</button>
            </form>

        </Fragment>
    );
};

export default DonationForm;
