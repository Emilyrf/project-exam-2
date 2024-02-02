import React from 'react';
import { useUser } from '../../stores/useUserStore';
import UpdateProfileForm from './UpdateAvatarForm';

const DashboardPage = () => {
  const user = useUser();

  if (!user) {
    // Handle the case where user is null
    return (
      <div className="max-w-screen-xl mx-auto p-4 mt-8 md:mt-12 lg:mt-16">
        <p>User not logged in</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-8 md:mt-12 lg:mt-16">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure><img src={user.avatar} alt="User Avatar" /></figure>
        <div className="card-body">
          <h2 className="card-title">Welcome, {user ? user.name : 'Guest'}</h2>
          <h2>Email: {user.email}</h2>
          <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_3').showModal()}>Edit avatar</button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <UpdateProfileForm />
            </div>
          </dialog>
        </div>
      </div>
      <h2>Upcoming bookings:</h2>
      <h2>Your bookings:</h2>
      <h2>Your venues:</h2>
    </div>
  );
};

export default DashboardPage;