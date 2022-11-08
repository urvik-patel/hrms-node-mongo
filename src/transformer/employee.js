const Transformer = require('object-transformer')

module.exports = {
  employeeSignIn: (data) => {
    var listSchema = {
      _id: '_id',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'roleId.role',
      token: 'token'
    }
    const list = new Transformer.Single(data, listSchema).parse()
    return list
  }
}
