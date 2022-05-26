import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})

Route.get('/contact', async ({ view }) => {
  return view.render('pages/contact')
})
