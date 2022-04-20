import React from 'react';
import { Button } from '@material-ui/core';

const SettingList = ({ list }) => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      {list?.map((item, i) => (
        <div
          key={i}
          className="flex w-full select-none items-center justify-between border-b"
        >
          <Button
            className="flex w-full items-center justify-between"
            onClick={item.onClick}
          >
            <div
              key={i}
              className="flex w-full select-none items-center justify-between text-lg"
            >
              <span className="ml-8 flex items-center text-left sm:ml-20">
                {item.title}
              </span>
              <div className="mr-8 flex aspect-square w-14 flex-col items-center justify-center sm:mr-20">
                {item.version ? (
                  <span>{item.version}</span>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M 9 19 l 7 -7 -7 -7"
                    />
                  </svg>
                )}
              </div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default SettingList;
