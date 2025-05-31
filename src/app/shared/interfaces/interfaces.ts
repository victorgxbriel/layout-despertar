export interface IDadosJSON {
  district: string,
  details: IDadosMunicipio
}

export interface IDadosMunicipio {
  codigo: number,
  nome: string,
  populacaoTotal: number,
  obitosMaternos: number,
  nascidosVivos: number,
  mortalidadeMaterna: number,
  totalConsultasPreNatal: number
}

export interface IDadosBrasil {
  district: string,
  details : {
    title: string,
    description: string
  }
}