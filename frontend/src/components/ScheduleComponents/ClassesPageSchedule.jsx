import React, { useRef, useEffect, useCallback } from 'react'
import dayjs from 'dayjs'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './schedule.scss'
import { useState } from 'react'
import useAxios from '../../utils/useAxios'
import { timeslots } from '../../variables/Timeslots'
import Swal from 'sweetalert2'
import LoadingComponent from '../GeneralComponents/LoadingComponent'
import showAlertError from '../../components/AlertsComponents/SwalAlertError'
import CustomToolbarNoLegend from './CustomToolbarNoLegend'

const ClassesPageSchedule = ({ classes, selected, setSelected }) => {
  const [loading, setLoading] = useState(true)
  const [timeSlotsTeacher, setTimeSlotsTeacher] = useState([])
  const [eventArray, setEventArray] = useState([])
  dayjs.locale('pl')
  const localizer = dayjsLocalizer(dayjs)

  const [today, setToday] = useState(new Date())
  const [date, setDate] = useState(new Date())
  const [maxDate, setMaxDate] = useState(
    new Date().setMonth(today.getMonth() + 1)
  )
  const [maxDateReached, setMaxDateReached] = useState(false)
  const [minDateReached, setMinDateReached] = useState(true)

  const api = useAxios()

  const fetchSchedule = async () => {
    await api
      .get(`/api/classes/${classes?.teacher?.user?.id}/schedule`)
      .then((res) => {
        setEvents(res.data)
      })
      .catch((err) => {
        showAlertError(
          'Błąd',
          'Wystąpił błąd przy pobieraniu danych z serwera.'
        )
      })
  }

  const fetchTeacherTimeslots = async () => {
    await api
      .get(`/api/classes/${classes?.teacher?.user?.id}/timeslots/`)
      .then((res) => {
        setLoading(false)
        setTimeSlotsTeacher(res.data)
      })
      .catch((err) => {
        setLoading(false)
        showAlertError(
          'Błąd',
          'Wystąpił błąd przy pobieraniu danych z serwera.'
        )
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

  const onSelectSlot = (slotInfo) => {
    window.clearTimeout(clickRef?.current)
    clickRef.current = window.setTimeout(() => {
      if (slotInfo.start > today) {
        var find = timeslots.find(
          (e) => e.start == dayjs(slotInfo.start).format('HH:mm')
        )
        let clickedSlot = {
          day_of_week: dayjs(slotInfo.start).day(),
          timeslot_index: find.timeslot,
        }

        let findTeacherSlot = timeSlotsTeacher.find(
          (slot) =>
            slot.day_of_week === clickedSlot.day_of_week &&
            slot.timeslot_index === clickedSlot.timeslot_index
        )

        if (findTeacherSlot) {
          findTeacherSlot = {
            ...findTeacherSlot,
            start: slotInfo.start,
            end: slotInfo.end,
          }
        }

        if (findTeacherSlot != null) {
          if (
            selected?.find(
              (el) =>
                dayjs(el?.start).format('DD-MM-YYYYTHH:mm') ==
                  dayjs(findTeacherSlot.start).format('DD-MM-YYYYTHH:mm') &&
                dayjs(el?.end).format('DD-MM-YYYYTHH:mm') ==
                  dayjs(findTeacherSlot.end).format('DD-MM-YYYYTHH:mm')
            )
          ) {
            setSelected((current) =>
              current.filter(
                (element) =>
                  dayjs(element?.start).format('DD-MM-YYYYTHH:mm') !=
                    dayjs(findTeacherSlot.start).format('DD-MM-YYYYTHH:mm') &&
                  dayjs(element?.end).format('DD-MM-YYYYTHH:mm') !=
                    dayjs(findTeacherSlot.end).format('DD-MM-YYYYTHH:mm')
              )
            )
          } else {
            setSelected((selected) => [...selected, findTeacherSlot])
          }
        }
      } else {
        const swalWithTailwindClasses = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false,
        })

        swalWithTailwindClasses.fire({
          icon: 'error',
          title: 'Błąd',
          text: 'Nie możesz wybrać daty dzisiejszej lub wcześniejszej.',
          customClass: {
            confirmButton:
              'btn btn-outline rounded-none outline-none border-[1px] text-black w-full',
            popup: 'rounded-none bg-base-100',
          },
        })
      }
    }, 50)
  }

  const slotPropGetter = useCallback(
    (date) => {
      var find = eventArray.find(
        (event) =>
          dayjs(event.start).format('YYYY-MM-DDTHH:mm') ==
          dayjs(date).format('YYYY-MM-DDTHH:mm')
      )
      if (find == null) {
        const dayOfWeek = dayjs(date).day()
        const hour = dayjs(date).hour()

        const matchingTimeslot = timeSlotsTeacher?.filter(
          (timeslot) => timeslot.day_of_week === dayOfWeek
        )
        if (matchingTimeslot.length > 0) {
          const matchingTime = timeslots.filter((timeslot) => {
            let value = []
            for (let i = 0; i < matchingTimeslot.length; i++) {
              let slot =
                timeslot.timeslot === matchingTimeslot[i].timeslot_index
              if (slot) {
                value.push(timeslot)
              }
            }
            if (value.find((e) => e == timeslot)) return timeslot
          })

          if (matchingTime) {
            let dayOfWeek = matchingTimeslot[0].day_of_week
            for (let i = 0; i < matchingTime.length; i++) {
              if (
                hour >= parseInt(matchingTime[i].start.split(':')[0]) &&
                hour < parseInt(matchingTime[i].end.split(':')[0])
              ) {
                return {
                  className:
                    selected.length > 0 &&
                    selected?.find(
                      (el) =>
                        el?.day_of_week == dayOfWeek &&
                        el?.timeslot_index == matchingTime[i].timeslot &&
                        dayjs(el?.start).format('DD-MM-YYYYTHH:mm') ==
                          dayjs(date).format('DD-MM-YYYYTHH:mm')
                    )
                      ? 'freeTimeSlot bg-base-200 hover:bg-base-300'
                      : 'freeTimeSlot',
                }
              }
            }
          }
        }

        return {
          className: 'slotDefault',
        }
      }
    },
    [timeSlotsTeacher, selected]
  )

  const eventStyleGetter = useCallback(
    (event, start, end, isSelected) => ({
      className: 'eventCell',
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
        title: 'X',
      }

      setEventArray((curr) => [...curr, eventRecord])
    })
  }

  const allFunctions = async () => {
    setLoading(true)
    await fetchSchedule()
    await fetchTeacherTimeslots()
    setLoading(false)
  }

  useEffect(() => {
    if (classes != null) {
      allFunctions()
    }
  }, [classes])

  const minTime = new Date()
  minTime.setHours(9, 0, 0)
  const maxTime = new Date()
  maxTime.setHours(19, 0, 0)

  const onNavigate = useCallback(
    (newDate) => {
      if (newDate < maxDate && newDate > today) {
        setDate(newDate)
      }

      const newDatePlus7Days = new Date(newDate)
      newDatePlus7Days.setDate(newDatePlus7Days.getDate() + 7)
      if (newDatePlus7Days > maxDate) {
        setMaxDateReached(true)
      } else {
        setMaxDateReached(false)
      }
      const newDateMinus7Days = new Date(newDate)
      newDateMinus7Days.setDate(newDateMinus7Days.getDate() - 7)
      if (newDateMinus7Days < today) {
        setMinDateReached(true)
      } else {
        setMinDateReached(false)
      }
    },
    [setDate]
  )

  return (
    <div>
      {loading ? (
        <LoadingComponent message="Ładowanie harmonogramu..." />
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
          slotPropGetter={slotPropGetter}
          eventPropGetter={eventStyleGetter}
          onSelectSlot={onSelectSlot}
          selectable="ignoreEvents"
          onNavigate={onNavigate}
          components={{
            toolbar: (props) => (
              <CustomToolbarNoLegend
                {...props}
                isMaxDateReached={maxDateReached}
                isMinDateReached={minDateReached}
              />
            ),
          }}
        />
      )}
    </div>
  )
}

export default ClassesPageSchedule
