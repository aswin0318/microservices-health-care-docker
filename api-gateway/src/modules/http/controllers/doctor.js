export default function doctorControllerFactory ({ DoctorService }) {
  async function affiliate ({ body: params }) {
    const affiliatedDoctor = await DoctorService
      .affiliateDoctor({ payload: JSON.stringify(params) })

    return {
      body: JSON.parse(affiliatedDoctor.payload),
      statusCode: 201,
    }
  }

  async function list () {
    try {
      const { doctors } = await DoctorService.getAllDoctors({})
      
      return {
        body: doctors ? doctors.map(({ payload }) => JSON.parse(payload)) : [],
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: { error: error.message },
        statusCode: 500,
      }
    }
  }

  async function getById ({ params }) {
    try {
      const { id } = params
      const doctor = await DoctorService.getDoctorById({
        params: JSON.stringify({ id }),
      })
      
      return {
        body: JSON.parse(doctor.payload),
        statusCode: 200,
      }
    } catch (error) {
      return {
        body: { error: error.message },
        statusCode: 500,
      }
    }
  }

  return {
    affiliate,
    list,
    getById,
  }
}

