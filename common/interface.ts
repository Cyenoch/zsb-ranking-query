export interface ICollageRankingProvider {
  getRanking(username: string, password: string): Promise<string>
}
