import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });

  // const updateSpots = (state, id, mod) => {
  //   const days = [...state.days].map((day) => {
  //     if (day.appointments.includes(id)) {
  //       day.spots += mod;
  //     }

  //     return day;
  //   });
  //   console.log(days);
  //   return days;
  // };

  const getSpots = (day, appointments) =>
    day.appointments.length -
    day.appointments.reduce(
      (accumulator, id) =>
        appointments[id].interview ? accumulator + 1 : accumulator,
      0
    );

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: getSpots(day, appointments) };
      }
      return day;
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: getSpots(day, appointments) };
      }
      return day;
    });

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers")),
    ]).then((all) => {
      // console.log("all:", all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
