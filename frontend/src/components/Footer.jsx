import React from 'react';

const CopyrightFooter = () => {
  return (
    <footer className=" text-white py-4">
      <div className="container text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} CampusConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default CopyrightFooter;
