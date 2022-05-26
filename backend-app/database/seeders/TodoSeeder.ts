import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TodoFactory } from 'Database/TodoFactory'

export default class TodoSeederSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await TodoFactory.createMany(12)
  }
}
