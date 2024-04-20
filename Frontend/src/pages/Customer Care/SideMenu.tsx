import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SideMenu = () => {
  return (
    <div className="w-64 h-full py-6 text-black bg-white rounded-lg shadow">
      <div className="flex flex-col mx-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/feedbackManage"
                className="flex items-center px-4 py-2 transition-colors duration-200 bg-white rounded-md hover:bg-brownMedium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM5.5 4C5.77614 4 6 4.22386 6 4.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V4.5C5 4.22386 5.22386 4 5.5 4ZM1.5 5C1.77614 5 2 5.22386 2 5.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V5.5C1 5.22386 1.22386 5 1.5 5ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3.5 7C3.77614 7 4 7.22386 4 7.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V7.5C3 7.22386 3.22386 7 3.5 7Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Customer Inquires</span>
              </Link>
            </li>
            <li>
              <Link
                to="/faqManage"
                className="flex items-center px-4 py-2 transition-colors duration-200 bg-white rounded-md hover:bg-brownMedium"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  aria-labelledby="title"
                  aria-describedby="desc"
                  role="img"
                >
                  <title>FAQ Section</title>

                  <path
                    data-name="layer1"
                    fill="#202020"
                    d="M34 51h30v12H34z"
                  ></path>
                  <path
                    data-name="layer2"
                    d="M35.2 35.5l10.2-10.2 2.6-2.5a2 2 0 0 0-2.9-2.8L29.6 4.4a2 2 0 0 0-2.8-2.8L14 14.3a2 2 0 1 0 2.8 2.8l6.4 6.4L.6 46.1A2 2 0 1 0 3.4 49L26 26.3l6.4 6.4a2 2 0 1 0 2.8 2.8z"
                    fill="#202020"
                  ></path>
                  <path
                    data-name="layer1"
                    d="M36 47a2 2 0 0 0 2 2h22a2 2 0 0 0 0-4H38a2 2 0 0 0-2 2z"
                    fill="#202020"
                  ></path>
                </svg>
                <span>FAQ Section</span>
              </Link>
            </li>

            <li>
              <Button className="flex items-center w-full px-4 py-2 mb-5 text-white transition-colors duration-200 rounded-md text-md bg-brownDark hover:bg-brownMedium">
                <svg
                  className="w-5 h-5 mr-2"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span> Report</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideMenu;
