import { getUsers, createUser } from './sql-database.js'

// Test sql here. 
// use package.json script to run this file and the sql-database.js together
const rows = await getUsers()
const id = await createUser('mrOkeke', 'mrOkeke13@yahoo.com', 2020000022)