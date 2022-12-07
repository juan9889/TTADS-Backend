const ctrl = require('../app/controllers/user.controller.js');

//const sequelize = require('../app/database/database.js')
//const User = sequelize.models.user
require('dotenv').config()


/*jest.mock('../app/controllers/user.controller.js', () => {
  const originalModule = jest.requireActual('../app/controllers/user.controller.js');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule.login,
    default: jest.fn(() => 'mocked baz'),
    user: 'mocked foo',
  };
});*/


test('test login con mock user', async () => {

  const instance = ctrl
  const spy = jest.spyOn(ctrl, 'findOneInternal');
  const mock_user={
    id:1,
    name: 'juan',
    username: 'juan',
    password: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
    usedOauth: false
  }
  const mockRequest = {
    body: {
    username: 'juan',
    password: '12345678',
    },
  };
  const mockResponse = {
  code: '',
  text:'' ,
    status: function(input) {this.code = input},
    send: function(input) {this.text = input}
  }


  spy.mockReturnValue(mock_user);
  await instance.login(mockRequest, mockResponse)

  expect(mockResponse.code).toEqual(200)
 
  
  spy.mockRestore();
});


test('prueba token', () => {
  const user = {
      id: 1,
      name: 'Juan',
      isAdmin: true
  }
expect(ctrl.createToken(user).length).toBeGreaterThan(3);
});