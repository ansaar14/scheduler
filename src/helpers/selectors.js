export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter( (days) => days.name === day)
  
	if (!filteredDays.length) {
		return []
	} 
	const appointmentIds = (filteredDays[0].appointments)
	const appointments = appointmentIds.map( (id) => {
		return state.appointments[id] 

	})
	return appointments
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