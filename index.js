const mysql = require('mysql2/promise')
const fs = require('fs')

async function getData () {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'tut$2022@UTM',
      database: 'HorariosNueva'
    })

    const [rows] = await connection.query('SELECT * FROM institutos')
    const institutes = rows.map(row => {
      return {
        codigo: row.codigo,
        nombre: row.nombre
      }
    })

    await connection.end()

    const data = {
      institutos: institutes
    }

    fs.writeFile('data_eva.json', JSON.stringify(data), err => {
      if (err) throw err
      console.log('¡Los datos han sido guardados exitosamente!')
    })
  } catch (error) {
    console.log(error)
  }
}

getData()
