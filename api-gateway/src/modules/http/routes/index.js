import { Router } from 'express'
import wrapAction from '../wrapAction.js'

export default function routerFactory ({ controllers, middlewares }) {
  const router = Router()

  const { doctorController, appointmentController, userController } = controllers
  const { validateSession } = middlewares

  // User routes
  router.post(
    '/users',
    wrapAction(userController.create),
  )

  router.post(
    '/users/authenticate',
    wrapAction(userController.authenticate),
  )

  // Doctor routes
  router.get(
    '/doctors',
    wrapAction(doctorController.list),
  )

  router.get(
    '/doctors/:id',
    wrapAction(doctorController.getById),
  )

  router.post(
    '/doctors',
    validateSession,
    wrapAction(doctorController.affiliate),
  )

  router.get(
    '/doctors/:id/appointments/available',
    wrapAction(appointmentController.findAvailable),
  )

  router.post(
    '/doctors/:id/appointments',
    validateSession,
    wrapAction(appointmentController.create),
  )

  // Appointment routes
  router.get(
    '/appointments',
    validateSession,
    wrapAction(appointmentController.getAllUserAppointments),
  )

  router.post(
    '/appointments',
    validateSession,
    wrapAction(appointmentController.create),
  )

  return router
}

