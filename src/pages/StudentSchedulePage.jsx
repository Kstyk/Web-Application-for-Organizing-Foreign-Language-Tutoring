import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import StudentSchedule from '../components/schedules/StudentSchedule'

const StudentSchedulePage = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      <div className="pt-5 phone:pt-10">
        <div className="absolute left-0 right-0 top-[70px] h-[200px] bg-base-300 max-phone:hidden"></div>

        <div className="card mb-5 rounded-md bg-white p-5 shadow-md">
          <h1 className="text-center text-xl font-bold uppercase tracking-wider text-gray-700">
            Harmonogram zaplanowanych zajęć
          </h1>
          <div className="my-4 border-b-[1px] border-base-100"></div>
          <div>
            <StudentSchedule studentId={user?.user_id} />
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentSchedulePage
