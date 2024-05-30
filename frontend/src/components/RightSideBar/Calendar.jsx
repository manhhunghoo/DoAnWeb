// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// function MyCalendar() {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className="mx-auto w-[90%]">
//       <Calendar
//         onChange={setDate}
//         value={date}
//         tileContent={({ date, view }) =>
//           view === 'month' && date.getDay() === 0 ? <p>Custom content</p> : null
//         }
//       />
//     </div>
//   );
// }

// export default MyCalendar;


import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "../../utils/calendar";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <div className="flex bg-white p-2 mb-10 shadow-lg rounded-lg">
      <div className="flex gap-10 sm:divide-x  justify-center sm:w-1/2 mx-auto mb-14 mt-2 items-center sm:flex-row flex-col">
        <div className="w-96 bg-white h-96 ">
          <div className="flex justify-between items-center">
            <h1 className="select-none font-semibold">
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-16 items-center ">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className=" cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                Today
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid  grid-cols-7 ">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="text-sm text-center -ml-3 h-14 w-14 grid place-content-center text-gray-500 select-none"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className=" grid bg-white grid-cols-7 ">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div
                    key={index}
                    className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-400",
                        today
                          ? "bg-red-600 text-white"
                          : "",
                        selectDate
                          .toDate()
                          .toDateString() ===
                          date.toDate().toDateString()
                          ? "bg-black text-white"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
        </div>

      </div>
    </div>
  );
}