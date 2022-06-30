import type { IRankProvider } from './interface'
export class WuitRankProvider implements IRankProvider {
  getCollageName(): string {
    return '武昌工学院'
  }

  getUsernameString(): string {
    return '账号'
  }

  getRankLevel(username: string, password: string): Promise<string> {
    return $fetch('/api/wuit', {
      params: { username, password },
    })
  }
}

export class WhcibeRankProvider implements IRankProvider {
  getCollageName(): string {
    return '武汉纺织大学外经贸学院'
  }

  getUsernameString(): string {
    return '身份证号'
  }

  getRankLevel(username: string, password: string): Promise<string> {
    return $fetch('/api/whcibe', {
      params: { username, password },
    })
  }
}
