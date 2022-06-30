import { createHash } from 'crypto'
export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { username, password } = query
  try {
    const result = await $fetch('http://zsb.whcibe.com/login/studentLogin', {
      method: 'POST',
      body: JSON.stringify({
        idCard: username,
        password: createHash('md5').update(password as string).digest('hex'),
        token: '',
      }),
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Referer': 'http://zsb.whcibe.com/',
        'Host': 'zsb.whcibe.com',
        'Origin': 'http://zsb.whcibe.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37',
      },
    }) as any
    if (result.result.success) {
      const token = (result as any).data
      const rankingResult = await $fetch('http://zsb.whcibe.com/sysStudent/ignore/findMySelf', {
        method: 'GET',
        headers: {
          'Referer': 'http://zsb.whcibe.com/',
          'Host': 'zsb.whcibe.com',
          'Origin': 'http://zsb.whcibe.com',
          'token': token,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37',
        },
      }) as any
      if (rankingResult.result.success) {
        return {
          code: 200,
          data: rankingResult.data.level,
        }
      }
      return {
        code: 400,
        msg: rankingResult.result.message,
      }
    }
    return {
      code: 400,
      msg: result.result.message,
    }
  }
  catch (err: any) {
    return {
      code: 400,
      msg: `服务器异常\n外经贸只在早上8点开启系统\n${err.message}`,
    }
  }
})
