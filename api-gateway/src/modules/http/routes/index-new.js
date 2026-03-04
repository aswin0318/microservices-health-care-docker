import { Router } from 'express'
import wrapAction from '../wrapAction.js'

export default function routerFactory ({ controllers, middlewares }) {
  const router = Router()

  const { doctorController, appointmentController, userController } = controllers
  const { validateSession } = middlewares

  // User routes
  router.post(
    '/api/users',
    wrapAction(userController.create),
  )

  router.post(
    '/api/users/authenticate',
    wrapAction(userController.authenticate),
  )

  // Doctor routes
  router.get(
    '/api/doctors',
    wrapAction(doctorController.list),
  )

  router.get(
    '/api/doctors/:id',
    wrapAction(doctorController.getById),
  )

  router.post(
    '/api/doctors',
    validateSession,
    wrapAction(doctorController.affiliate),
  )

  router.get(
    '/api/doctors/:id/appointments/available',
    wrapAction(appointmentController.findAvailable),
  )

  router.post(
    '/api/doctors/:id/appointments',
    validateSession,
    wrapAction(appointmentController.create),
  )

  // Appointment routes
  router.get(
    '/api/appointments',
    validateSession,
    wrapAction(appointmentController.getAllUserAppointments),
  )

  router.post(
    '/api/appointments',
    validateSession,
    wrapAction(appointmentController.create),
  )

  return router
}
