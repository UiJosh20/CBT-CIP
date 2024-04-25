import React from "react";

const UserNav = () => {
  return (
    <>
      <nav className="custom-color lg:p-2 text-white poppins-medium-sm text-center">
        <p>Plan your event with ease</p>
      </nav>
      <nav className="bg-white shadow-md lg:py-3   lg:px-16 px-5 py-3 flex justify-between items-center poppins-medium sticky top-0 w-full">
        <div>
          <p>360Event</p>
        </div>
        <div>
          <span class="material-symbols-outlined">menu</span>
        </div>
      </nav>
    </>
  );
};

export default UserNav;
