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