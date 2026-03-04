export default function getDoctorByIdFactory ({ doctorRepository }) {
  return async function execute (request, callback) {
    try {
      const { id } = request

      const doctor = await doctorRepository.findOneById({
        id: Number(id),
      })

      if (!doctor) {
        return callback({
          code: 404,
          message: 'Doctor not found',
        })
      }

      return callback(null, {
        id: doctor.id,
        payload: JSON.stringify({
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          specialty: doctor.specialty,
          bio: doctor.bio,
          phone: doctor.phone,
        }),
      })
    } catch (error) {
      console.error('Error in getDoctorById:', error)
      return callback({
        code: 500,
        message: error.message,
      })
    }
  }
}
