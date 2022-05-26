import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import Todo from 'App/Models/Todo'
import { DateTime } from 'luxon'

export default class TodosController {
  public async index({}: HttpContextContract) {
    const todos = await Todo.all()
    return View.render('todos/index', { todos })
  }

  public async create({}: HttpContextContract) {
    //const todo = await Todo.findOrFail(id)
    return View.render('todos/create')
  }

  public async store({ request, response }: HttpContextContract) {
    //return request
    const todo = new Todo()
    todo.name = request.body().name
    const newTodo = await todo.save()
    if (newTodo) {
      response.redirect().toRoute('todos.show', [todo.id])
    }
  }

  public async show({ params }: HttpContextContract) {
    const todo = await Todo.find(params.id)
    if (!todo) return View.render('errors/not-found')
    return View.render('todos/show', { todo })
  }

  public async edit({ params: { id } }: HttpContextContract) {
    const todo = await Todo.findOrFail(id)
    return View.render('todos/edit', { todo })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    if (todo) {
      const name = request.body().name
      const updatedAt = DateTime.now()
      const updatedTodo = await todo.merge({ name, updatedAt }).save()
      if (updatedTodo.$isPersisted) {
        response.redirect().toRoute('todos.show', [todo.id])
      }
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    if (todo) {
      await todo.delete()
      response.redirect().toRoute('todos.index')
    }
  }
}
