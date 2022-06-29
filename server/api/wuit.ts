export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { username, password } = query
  const result = await $fetch('http://zsbbm.wuit.cn:8080/apply_manage/student/api/sys/login', {
    method: 'POST',
    body: `username=${username}&password=${password}`,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'http://zsbbm.wuit.cn:8081/',
      'Host': 'zsbbm.wuit.cn:8080',
      'Origin': 'http://zsbbm.wuit.cn:8081',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37',
    },
  }) as any
  if (result.msg === 'success') {
    const token = (result as any).token
    const rankingResult = await $fetch('http://zsbbm.wuit.cn:8080/apply_manage/student/api/student/info', {
      body: JSON.stringify({ username }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Referer': 'http://zsbbm.wuit.cn:8081/',
        'Host': 'zsbbm.wuit.cn:8080',
        'Origin': 'http://zsbbm.wuit.cn:8081',
        'token': token,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37',
      },
    }) as any
    if (rankingResult.msg === 'success') {
      return {
        code: 200,
        data: rankingResult.student.rank,
      }
    }
    return rankingResult
  }
  return result
})
