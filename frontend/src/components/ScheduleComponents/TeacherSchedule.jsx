import React, { useRef, useEffect, useCallback } from 'react'
import dayjs from 'dayjs'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './schedule.scss'
import { useState } from 'react'
import useAxios from '../../utils/useAxios'
import { timeslots } from '../../variables/Timeslots'
import CustomToolbar from './CustomToolbar'
import { Link } from 'react-router-dom'
import './schedule.scss'
import LoadingComponent from '../GeneralComponents/LoadingComponent'
import ReactCountryFlag from 'react-country-flag'
import { useForm } from 'react-hook-form'
import showAlertError from '../AlertsComponents/SwalAlertError'
import showSuccessAlert from '../AlertsComponents/SwalAlertSuccess'

const TeacherSchedule = ({ teacherId }) => {
  const [loading, setLoading] = useState(true)
  const [eventArray, setEventArray] = useState([])
  const [slotInfo, setSlotInfo] = useState(null)
  dayjs.locale('pl')
  const localizer = dayjsLocalizer(dayjs)

  const [date, setDate] = useState(new Date())

  const api = useAxios()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const cancelOptions = {
    reason: {
      required: 'Podanie powodu odwołania jest wymagane.',
      maxLength: {
        value: 10000,
        message: 'Długość wyjaśnienia nie może przekraczać 10 000 znaków.',
      },
    },
  }

  const fetchSchedule = async () => {
    setLoading(true)
    await api
      .get(`/api/classes/${teacherId}/schedule`)
      .then((res) => {
        setEvents(res.data)
        setLoading(false)
      })
      .catch((err) => {
        showAlertError(
          'Błąd',
          'Wystąpił błąd przy pobieraniu danych z serwera.'
        )
        setLoading(false)
      })
  }

  let formats = {
    dateFormat: 'dd',

    dayFormat: (date, culture, localizer) =>
      localizer.format(date, 'dd', culture),

    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
      localizer.format(start, 'DD-MM-YY', culture) +
      ' — ' +
      localizer.format(end, 'DD-MM-YY', culture),

    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, 'HH:mm', culture),

    agendaTimeFormat: (date, culture, localizer) =>
      localizer.format(date, 'HH:mm', culture),
  }

  const clickRef = useRef(null)

  useEffect(() => {
    setEvents()

    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const eventStyleGetter = useCallback(
    (event, start, end, isSelected) => ({
      className: `flex items-center classes-cell 
      ${
        event?.resource?.place_of_classes == 'online' &&
        'bg-blue-200 hover:bg-blue-400'
      } 
      ${
        event?.resource?.place_of_classes == 'teacher_home' &&
        'bg-green-200 hover:bg-green-400'
      } 
      ${
        event?.resource?.place_of_classes == 'student_home' &&
        'bg-red-200 hover:bg-red-400'
      } 
      text-xs phone:text-sm`,
    }),
    []
  )

  const setEvents = (schedule) => {
    setEventArray([])
    schedule?.map((event) => {
      var findTimeslot = timeslots.find(
        (timeslot) => timeslot.start == dayjs(event.date).format('HH:mm')
      )

      var startDate = new Date(
        `${dayjs(event.date).format('YYYY-MM-DD')}T${findTimeslot.start}`
      )
      var endDate = new Date(
        `${dayjs(event.date).format('YYYY-MM-DD')}T${findTimeslot.end}`
      )

      let eventRecord = {
        id: event.id,
        start: startDate,
        end: endDate,
        title: (
          <ReactCountryFlag
            countryCode={`${event?.classes?.language?.country_code}`}
            svg
            style={{
              width: '2em',
              height: '2em',
            }}
            title={`${event?.classes?.language?.name}`}
          />
        ),
        resource: event,
      }

      setEventArray((curr) => [...curr, eventRecord])
    })
  }

  const allFunctions = async () => {
    setLoading(true)
    await fetchSchedule()
    setLoading(false)
  }

  const showCancelClassesModal = async (id) => {
    window.cancel_classes.showModal(id)
  }

  const cancelClasses = async (data) => {
    data = {
      ...data,
      room: slotInfo?.resource?.room,
    }

    api
      .post(`api/rooms/schedules/${slotInfo?.id}/cancel/`, data)
      .then((res) => {
        window.cancel_classes.close()
        showSuccessAlert(
          'Sukces!',
          'Pomyślnie odwołano zajęcia w tym terminie.',
          async () => {
            await fetchSchedule()
            await allFunctions()
          }
        )
      })
      .catch((err) => {
        window.cancel_classes.close()
        if (err.response.status == 403) {
          showAlertError(
            'Błąd',
            'Nie jesteś uprawniony do wykonania tej akcji.'
          )
        } else {
          showAlertError('Błąd', err.response.data.error)
        }
      })
  }

  useEffect(() => {
    if (teacherId != null) {
      allFunctions()
    }
  }, [teacherId])

  const onSelectEvent = (slotInfo) => {
    window.clearTimeout(clickRef?.current)
    setSlotInfo(slotInfo)
    clickRef.current = window.setTimeout(() => {
      window.my_modal_5.showModal(slotInfo)
    })
  }

  const minTime = new Date()
  minTime.setHours(9, 0, 0)
  const maxTime = new Date()
  maxTime.setHours(19, 0, 0)
  const onNavigate = useCallback(
    (newDate) => {
      setDate(newDate)
    },
    [setDate]
  )
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box flex flex-col gap-y-2 !rounded-md"
        >
          <div>
            <h2 className="mx-auto w-fit border-b-2 border-b-base-400 px-3 text-center font-bold uppercase tracking-wider text-gray-700">
              Zajęcia
            </h2>
            <p className="mt-1 w-full text-center">
              {slotInfo?.resource?.classes?.name}
            </p>
          </div>
          <div>
            <h2 className="mx-auto w-fit border-b-2 border-b-base-400 px-3 text-center font-bold uppercase tracking-wider text-gray-700">
              Język zajęć
            </h2>
            <p className="mt-1 w-full text-center">
              Język <span>{slotInfo?.resource?.classes?.language?.name}</span>
            </p>
          </div>
          <div>
            <h2 className="mx-auto w-fit border-b-2 border-b-base-400 px-3 text-center font-bold uppercase tracking-wider text-gray-700">
              Rodzaj zajęć
            </h2>
            <p className="mt-1 w-full text-center">
              Zajęcia{' '}
              {slotInfo?.resource?.place_of_classes == 'teacher_home' &&
                'U Nauczyciela'}
              {slotInfo?.resource?.place_of_classes == 'student_home' &&
                'U Studenta'}
              {slotInfo?.resource?.place_of_classes == 'online' && 'Online'}
            </p>
          </div>
          {(slotInfo?.resource?.place_of_classes == 'student_home' ||
            slotInfo?.resource?.place_of_classes == 'teacher_home') && (
            <div>
              <h2 className="mx-auto w-fit border-b-2 border-b-base-400 px-3 text-center font-bold uppercase tracking-wider text-gray-700">
                Adres zajęć zajęć
              </h2>
              <p className="mt-1 w-full text-center">
                woj. {slotInfo?.resource?.address?.voivodeship?.name}
                <br />
                {slotInfo?.resource?.address?.postal_code}{' '}
                {slotInfo?.resource?.address?.city?.name}
                <br />
                ulica {slotInfo?.resource?.address?.street}{' '}
                {slotInfo?.resource?.address?.building_number}
              </p>
            </div>
          )}
          <div>
            <h2 className="mx-auto w-fit border-b-2 border-b-base-400 px-3 text-center font-bold uppercase tracking-wider text-gray-700">
              Data zajęć
            </h2>
            <p className="mt-1 w-full text-center">
              {dayjs(slotInfo?.resource?.date).format(
                'dddd, DD-MM-YYYY, g. HH:mm'
              )}
            </p>
          </div>
          <div>
            <h2 className="mx-auto w-fit border-b-2 border-b-base-400 px-3 text-center font-bold uppercase tracking-wider text-gray-700">
              Uczeń
            </h2>
            <p className="mt-1 w-full text-center transition-all duration-200 hover:underline">
              <Link to={`/student/${slotInfo?.resource?.student?.id}`}>
                {slotInfo?.resource?.student?.first_name}{' '}
                {slotInfo?.resource?.student?.last_name}
              </Link>
            </p>
          </div>
          <div className="modal-action mx-auto">
            <button
              onClick={() => showCancelClassesModal(slotInfo?.id)}
              className="btn-outline no-animation btn h-8 min-h-0 rounded-sm hover:bg-base-400 hover:text-white"
            >
              Odwołaj zajęcia
            </button>
            {slotInfo?.resource?.room && (
              <Link
                to={`/pokoj/${slotInfo?.resource?.room}`}
                className="btn-outline no-animation btn h-8 min-h-0 rounded-sm hover:bg-base-400 hover:text-white"
              >
                Przejdź do pokoju zajęć
              </Link>
            )}
            <button className="btn-outline no-animation btn h-8 min-h-0 rounded-sm hover:bg-base-400 hover:text-white">
              Zamknij
            </button>
          </div>
        </form>
      </dialog>
      <dialog
        id="cancel_classes"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box flex flex-col gap-y-2 !rounded-md">
          <form
            method="dialog"
            onSubmit={handleSubmit(cancelClasses)}
            className="flex w-full flex-col"
          >
            <p className="mb-4 text-center">
              W przypadku odwołania zajęć, uczeń dostaje refundację kosztów przy
              zakupie tych pojedynczych zajęć. Druga osoba zostanie powiadomiona
              drogą mailową oodwołaniu zajęć. Musisz podać powód odwołania
              zajęć.
            </p>
            <textarea
              className="min-h-16 h-16 rounded-sm border-[1px] border-base-200 bg-transparent px-2 outline-none hover:border-[#aaabac]"
              type="text"
              name="reason"
              id="reason"
              {...register('reason', cancelOptions.reason)}
            />
            <small className="text-right text-red-400">
              {errors?.reason && errors.reason.message}
            </small>
            <div>
              <button
                type="submit"
                className="btn-outline no-animation btn mt-6 h-8 min-h-0 w-full rounded-sm hover:bg-base-400 hover:text-white"
              >
                Odwołaj zajęcia
              </button>
            </div>
          </form>
          <div className="modal-backdrop">
            <form method="dialog">
              <button className="btn-outline no-animation btn mt-2 h-8 min-h-0 w-full rounded-sm hover:bg-base-400 hover:text-white">
                Anuluj
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {loading ? (
        <LoadingComponent message="Ładowanie harmonogramu" />
      ) : (
        <Calendar
          date={date}
          localizer={localizer}
          events={eventArray}
          defaultView="week"
          min={minTime}
          max={maxTime}
          views={{ week: true }}
          startAccessor="start"
          endAccessor="end"
          tooltipAccessor={null}
          timeslots={1}
          step={60}
          formats={formats}
          eventPropGetter={eventStyleGetter}
          selectable="ignoreEvents"
          components={{ toolbar: CustomToolbar }}
          onNavigate={onNavigate}
          onSelectEvent={onSelectEvent}
        />
      )}
    </>
  )
}

export default TeacherSchedule
