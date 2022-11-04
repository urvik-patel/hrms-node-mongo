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
  }
}
