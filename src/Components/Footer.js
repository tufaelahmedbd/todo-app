import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 container mx-auto p-10 text-center text-sm text-teal-600 rounded-bl-xl rounded-br-xl border-t border-dashed border-teal-900">
      <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
