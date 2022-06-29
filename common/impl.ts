import type { ICollageRankingProvider } from './interface'
export class WuitRankingProvider implements ICollageRankingProvider {
  getRanking(username: string, password: string): Promise<string> {
    return $fetch('/api/wuit', {
      params: { username, password },
    })
  }
}
