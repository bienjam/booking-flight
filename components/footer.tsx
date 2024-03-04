import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-20 ">
      <div className="container px-4">
        <div className="border-t border-neutral-200 dark:border-neutral-dark-500 pb-20 " />
        <div className="grid lg:grid-cols-2">
          <div className="mb-8 lg:mb-4 lg:max-w-96">
            <h1 className="mb-8">
              <a href={"/"}>
                <h1 className="mb-10 w-84 text-4xl font-semibold text-center bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text lg:text-6xl">
                  Travel
                </h1>
              </a>
            </h1>
          </div>
          <div className="grid grid-cols- lg:grid-cols-3 md:grid-cols-3">
            <div className="mb-4">
              <h6 className="text-base font-bold text-neutral-700 dark:text-neutral-dark-700 mb-2">
                Category
              </h6>
              <ul>
                <li className="footer-menu">
                  <a
                    href="category.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Trending
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="category-2.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Fashion
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="category-3.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Technology
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="category-4.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Healthy
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h6 className="text-base font-bold text-neutral-700 dark:text-neutral-dark-700 mb-2">
                Pages
              </h6>
              <ul>
                <li className="footer-menu">
                  <a
                    href="page-about.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    About me
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="page-contact.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Contact
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="page-author.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Author
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="page-search.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Search results
                  </a>
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <h6 className="text-base font-bold text-neutral-700 dark:text-neutral-dark-700 mb-2">
                Account
              </h6>
              <ul>
                <li className="footer-menu">
                  <a
                    href="page-register.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Register
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href={"/"}
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Login
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="page-forgot-password.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    Forgot Password
                  </a>
                </li>
                <li className="footer-menu">
                  <a
                    href="page-404.html"
                    className="text-base font-regular text-neutral-950 dark:text-neutral-dark-950"
                  >
                    404
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
