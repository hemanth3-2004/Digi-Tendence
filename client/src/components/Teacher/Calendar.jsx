import React from 'react';

const Calendar = ({ subject }) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center w-[100%] mt-2'>
      <div className='border-2 w-[96%] h-[20%] border-black text-center text-[1.5rem] py-1 rounded-lg'>
        Teacher's Calendar - {subject.subject_name}
      </div>
      <div className='border-2 w-[96%] bg-black h-[37rem] border-black text-center text-[1.5rem] rounded-lg'>
        <img className="w-full h-full rounded-md" src="../../../Screenshot 2025-08-02 145042.png" alt="Calendar" />
      </div>
    </div>
  );
};

export default Calendar;
