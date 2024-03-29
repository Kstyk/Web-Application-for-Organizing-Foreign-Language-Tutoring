import React, { useContext, useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import AuthContext from '../context/AuthContext'
import guest from '../assets/guest.png'
import LoadingComponent from '../components/GeneralComponents/LoadingComponent'
import showAlertError from '../components/AlertsComponents/SwalAlertError'

import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineMan,
  AiOutlineWoman,
  AiOutlineCalendar,
} from 'react-icons/ai'

const StudentProfilePage = () => {
  document.title = 'Twój profil'

  const api = useAxios()
  const { user } = useContext(AuthContext)

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    setLoading(true)
    await api
      .get(`/api/users/profile/${user?.user_id}`)
      .then((res) => {
        setProfile(res.data)
      })
      .catch((err) => {
        showAlertError(
          'Błąd',
          'Wystąpił błąd przy pobieraniu danych z serwera.'
        )
      })
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <>
      <section className="mx-auto mb-10 mt-10 w-6/12 max-md:w-10/12 max-phone:w-full">
        <div className="mx-phone:hidden absolute left-0 right-0 top-[70px] h-[500px] bg-base-300"></div>
        <div className="card z-30 mb-5 flex flex-row items-center justify-between rounded-md border-[1px] border-base-200 bg-white p-4 text-center shadow-xl ">
          {loading ? (
            <LoadingComponent message="Ładowanie profilu" />
          ) : (
            <h1 className="w-full text-center text-xl font-bold uppercase tracking-wider text-gray-700 max-md:text-xl max-phone:text-lg md:text-2xl">
              {profile?.user?.first_name} {profile?.user?.last_name}
            </h1>
          )}
        </div>
        {loading ? (
          ''
        ) : (
          <div className="card  flex items-center justify-center rounded-md border-[1px] border-base-200 bg-white py-4 shadow-xl max-md:w-full md:w-full">
            <div className="avatar flex justify-center">
              <div className="w-5/12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 max-md:w-8/12">
                <img
                  src={
                    profile?.profile_image == null
                      ? guest
                      : `${profile?.profile_image}`
                  }
                />
              </div>
            </div>

            <div className="profile mt-10 flex w-full flex-col items-center justify-center gap-y-5">
              <div className="mb-2 w-full border-b-[1px] border-base-100"></div>
              <section className="flex w-6/12 flex-col items-center justify-center max-phone:w-full max-phone:items-start max-phone:justify-start">
                <div className="contact mx-auto">
                  <label className="block text-center text-lg font-bold uppercase tracking-wide text-gray-700">
                    Dane kontaktowe
                  </label>
                </div>
                <div className="flex w-full flex-row justify-center gap-x-3">
                  <AiOutlineMail className="h-6 w-6 text-base-400" />

                  {profile?.user?.email}
                </div>
                <div className="flex w-full flex-row justify-center gap-x-3">
                  <AiOutlinePhone className="h-6 w-6 text-base-400" />
                  {profile?.phone_number == null
                    ? 'Nie podano'
                    : profile?.phone_number}
                </div>
              </section>

              {profile?.sex != null && (
                <div className="sex flex w-full flex-col items-center justify-center">
                  <label className="block text-center text-lg font-bold uppercase tracking-wide text-gray-700">
                    Płeć
                  </label>
                  <div className="data flex w-9/12 flex-row justify-center text-center">
                    {profile?.sex == 'kobieta' ? (
                      <section className="flex gap-x-3">
                        {' '}
                        <AiOutlineWoman className="h-6 w-6 text-base-400" />
                        <span>Kobieta</span>
                      </section>
                    ) : (
                      <section className="flex gap-x-3">
                        {' '}
                        <AiOutlineMan className="h-6 w-6 text-base-400" />
                        <span>Mężczyzna</span>
                      </section>
                    )}
                  </div>
                </div>
              )}

              {profile?.year_of_birth != null && (
                <div className="sex flex w-full flex-col items-center justify-center">
                  <label className="block text-center text-lg font-bold uppercase tracking-wide text-gray-700">
                    Rok urodzenia
                  </label>
                  <div className="data flex w-9/12 flex-row justify-center text-center">
                    <section className="flex gap-x-3">
                      {' '}
                      <AiOutlineCalendar className="h-6 w-6 text-base-400" />
                      <span>{profile?.year_of_birth}</span>
                    </section>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default StudentProfilePage
