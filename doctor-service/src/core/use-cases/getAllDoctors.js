export default function getAllDoctorsFactory ({ doctorRepository }) {
  return async function execute (request, callback) {
    try {
      const doctors = await doctorRepository.findAll()

      const doctorList = doctors.map(doctor => ({
        id: doctor.id,
        payload: JSON.stringify({
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          specialty: doctor.specialty,
          bio: doctor.bio,
          phone: doctor.phone,
        }),
      }))

      return callback(null, {
        doctors: doctorList,
      })
    } catch (error) {
      console.error('Error in getAllDoctors:', error)
      return callback({
        code: 500,
        message: error.message,
      })
    }
  }
}
