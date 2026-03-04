import modules from '../modules/index.js'
import doctorRepositoryFactory from './repositories/doctorRepository.js'
import affiliateDoctorFactory from './use-cases/affiliateDoctor.js'
import getAllDoctorsFactory from './use-cases/getAllDoctors.js'
import getDoctorFactory from './use-cases/getDoctor.js'
import getDoctorByIdFactory from './use-cases/getDoctorById.js'

const { postgresDatabase } = modules

const doctorRepository = doctorRepositoryFactory({ postgresDatabase })

const affiliateDoctor = affiliateDoctorFactory({ doctorRepository })
const getDoctor = getDoctorFactory({ doctorRepository })
const getDoctorById = getDoctorByIdFactory({ doctorRepository })
const getAllDoctors = getAllDoctorsFactory({ doctorRepository })

export default {
  affiliateDoctor,
  getDoctor,
  getDoctorById,
  getAllDoctors,
}
