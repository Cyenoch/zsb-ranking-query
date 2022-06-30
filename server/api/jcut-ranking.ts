import { readFile } from 'fs/promises'
import { parse } from 'csv-parse'

import dentistry from 'assets/jcut/dentistry.json'
import primaryEducation from 'assets/jcut/primary_education.json'

// 获取排名数据
export default defineEventHandler(async (_event) => {
  const query = useQuery(_event)
  try {
    return {
      code: 200,
      data: await (async () => {
        switch (query.major) {
          case 'dentistry':
            return dentistry
          case 'primaryEducation':
            return primaryEducation
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
