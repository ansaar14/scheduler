export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((days) => days.name === day);

  if (!filteredDays.length) {
    return [];
  }
  const appointmentIds = filteredDays[0].appointments;
  const appointments = appointmentIds.map((id) => {
    return state.appointments[id];
  });
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((days) => days.name === day);

  if (!filteredDays.length) {
    return [];
  }

  const interviewers = filteredDays[0].interviewers.map((id) => {
    return state.interviewers[id];
  });

  return interviewers;
}

export function getInterview(state, interview) {
  const interviewObject = {};
  if (interview === null) {
    return null;
  } else {
    interviewObject.student = interview.student;
    interviewObject.interviewer = state.interviewers[interview.interviewer];
  }
  return interviewObject;
}
