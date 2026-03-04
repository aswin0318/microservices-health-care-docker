function doctorRepositoryFactory ({ postgresDatabase }) {
  const { Doctors } = postgresDatabase.sequelize.models

  async function create ({ params }) {
    try {
      return await Doctors.create(params)
    } catch (error) {
      throw new Error('todo')
    }
  }

  async function findOneById ({ id }) {
    try {
      return await Doctors.findOne({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new Error('todo')
    }
  }

  async function findAll () {
    try {
      return await Doctors.findAll()
    } catch (error) {
      throw new Error('Failed to fetch doctors: ' + error.message)
    }
  }

  return {
    create,
    findOneById,
    findAll,
  }
}

export default doctorRepositoryFactory
