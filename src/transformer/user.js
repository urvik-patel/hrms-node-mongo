const Transformer = require('object-transformer')

module.exports = {
  userList: (data) => {
    var listSchema = {
      name: 'name',
      email: 'email',
      contact: 'contact'
    }
    const list = new Transformer.List(data, listSchema).parse()
    return list
  },

  userLogin: (data) => {
    console.log(data)
    var listSchema = {
      _id: '_id',
      name: 'name',
      email: 'email',
      role: 'roleId.role',
      token: 'token'
    }
    const list = new Transformer.Single(data, listSchema).parse()
    return list
  }
}
