export interface IRankProvider {
  getRankLevel(username: string, password: string): Promise<string>

  getUsernameString(): string

  getCollageName(): string
}
