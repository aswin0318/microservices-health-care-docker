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
      const response = await DoctorService.getAllDoctors({})
      const doctors = response.doctors || []
      
      return {
        body: doctors.map(({ payload }) => payload ? JSON.parse(payload) : {}),
        statusCode: 200,
      }
    } catch (error) {
      console.error('Error in list:', error)
      return {
        body: { error: error.message },
        statusCode: 500,
      }
    }
  }

  async function getById ({ params }) {
    try {
      const { id } = params
      const response = await DoctorService.getDoctorById({
        id,
      })
      
      return {
        body: response.payload ? JSON.parse(response.payload) : response,
        statusCode: 200,
      }
    } catch (error) {
      console.error('Error in getById:', error)
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


