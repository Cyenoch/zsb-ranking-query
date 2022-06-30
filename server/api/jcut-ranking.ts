/* eslint-disable no-case-declarations */
import { readFile } from 'fs/promises'
import { parse } from 'csv-parse'

// 获取排名数据
export default defineEventHandler(async (_event) => {
  const query = useQuery(_event)
  try {
    return {
      code: 200,
      data: await (async () => {
        switch (query.major) {
          case 'dentistry':
            const dentistry = await readFile('assets/jcut/dentistry.csv')
            return await new Promise((resolve, reject) => {
              parse(dentistry, { columns: false, encoding: 'utf8' }, (err, data) => {
                if (err) { reject(err) }
                else {
                  resolve(data.map((row: any) => ({
                    type: row[1],
                    score: row[0],
                  })))
                }
              })
            })
          case 'primaryEducation':
            const primaryEducation = await readFile('assets/jcut/primary_education.csv')
            return await new Promise((resolve, reject) => {
              parse(primaryEducation, { columns: false, encoding: 'utf8' }, (err, data) => {
                if (err) { reject(err) }
                else {
                  resolve(data.map((row: any) => ({
                    type: row[1],
                    score: row[0],
                  })))
                }
              })
            })
          default: throw new Error('入参错误')
        }
      }) (),
    }
  }
  catch (err: any) {
    return {
      code: 400,
      msg: err.message,
    }
  }
})
