import React from 'react'
import guest from '../../assets/guest.png'
import dayjs from 'dayjs'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const OpinionCard = ({ opinion }) => {
  dayjs.locale('pl')
  return (
    <div
      className={`animate__animated animate__fadeIn card w-full rounded-md p-5 hover:bg-gray-50 hover:shadow-sm max-phone:px-0`}
    >
      <div className="header flex flex-col justify-between gap-x-2 phone:flex-row">
        <div className="order-2 flex flex-row items-center gap-x-5 phone:order-1">
          <Link to={`/student/${opinion?.student?.id}`} className="avatar">
            <div className="h-12 w-12 rounded-full ring-primary ring-offset-2 ring-offset-base-100 transition-all duration-200 hover:ring sm:h-20 sm:w-20">
              <img
                src={
                  opinion?.student_profile_image
                    ? `${opinion?.student_profile_image}`
                    : guest
                }
              />
            </div>
          </Link>
          <div className="flex flex-col justify-start gap-y-2">
            <Link
              to={`/student/${opinion?.student?.id}`}
              className="name text-lg uppercase tracking-wider "
            >
              {opinion?.student?.first_name}
            </Link>
            <div className="flex flex-row gap-x-3">
              <div className="rating rating-sm phone:rating-md">
                {Array.from({ length: 5 }, (_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name={`${opinion?.id}__rate`}
                    className="mask mask-star-2 bg-base-400"
                    checked={opinion?.rate == index + 1 ? true : false}
                    readOnly
                  />
                ))}
              </div>
              <span className="hidden text-xl phone:block">
                {opinion?.rate} / 5
              </span>
            </div>
            <div className="w-full">
              <span className="text-sm">Dotyczy: </span>
              <Link
                className="text-sm uppercase hover:underline"
                to={`/zajecia/${opinion?.classes_rated?.id}`}
              >
                {opinion?.classes_rated?.name}
              </Link>
            </div>
          </div>
        </div>
        <div className="date order-1 phone:order-2">
          <span className="text-sm text-gray-600">
            {dayjs(opinion.published_date).format('DD MMMM YYYY')}
          </span>
        </div>
      </div>
      <div className="relative mt-5 border-[1px] border-gray-400 bg-gray-100 px-8 py-3">
        <BiSolidQuoteLeft className="absolute -top-3 left-2 h-5 w-5" />
        <BiSolidQuoteRight className="absolute -bottom-3 right-2 h-5 w-5" />
        <p className="b break-words text-sm italic text-gray-700 phone:text-base">
          {opinion?.content}
        </p>
      </div>
    </div>
  )
}

export default OpinionCard
