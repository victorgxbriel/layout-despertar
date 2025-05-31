import pandas as pd
import json
import os

def converter_para_float(valor_str):
    """Converte uma string com vírgula decimal para float."""
    if isinstance(valor_str, str):
        return float(valor_str.replace('.', '', valor_str.count('.') -1).replace(',', '.'))
    return float(valor_str)

def converter_para_int(valor_str):
    """Converte uma string com ponto como separador de milhar para int."""
    if isinstance(valor_str, str):
        return int(valor_str.replace('.', ''))
    return int(valor_str)

def processar_csv_para_json(caminho_arquivo_csv, caminho_arquivo_json_saida):
    """
    Lê um arquivo CSV, processa os dados e gera um arquivo JSON
    se o número de linhas de dados for exatamente 167.

    Args:
        caminho_arquivo_csv (str): Caminho para o arquivo CSV de entrada.
        caminho_arquivo_json_saida (str): Caminho para o arquivo JSON de saída.
    """
    NUMERO_ESPERADO_DE_LINHAS = 167

    try:
        # Ler o CSV.
        # Pandas tentará inferir os tipos, mas vamos especificar para garantir.
        # 'Mortalidade Materna' e 'População' são lidas como string para tratamento customizado.
        df = pd.read_csv(caminho_arquivo_csv, dtype=str)

        # Remover espaços extras dos nomes das colunas
        df.columns = df.columns.str.strip()

        # Verificar o número de linhas de dados
        if len(df) != NUMERO_ESPERADO_DE_LINHAS:
            print(f"Erro: O arquivo CSV não contém as {NUMERO_ESPERADO_DE_LINHAS} linhas de dados esperadas.")
            print(f"Número de linhas encontradas: {len(df)}")
            return

        # Mapeamento dos nomes das colunas do CSV para as chaves do JSON 'details'
        # (considerando que os nomes das colunas no CSV são os fornecidos no exemplo)
        mapa_colunas = {
            "Código do Município": "codigo",
            "Município": "nome",
            "População": "populacaoTotal",
            "Óbitos Maternos": "obitosMaternos",
            "Nascidos Vivos": "nascidosVivos",
            "Mortalidade Materna": "mortalidadeMaterna",
            "Total de Consultas Pré-Natal": "totalConsultasPreNatal"
        }

        # Renomear colunas para facilitar o acesso
        df_renomeado = df.rename(columns=mapa_colunas)

        lista_json_final = []
        path_inicial = 4

        for i in range(len(df_renomeado)):
            linha_dados = df_renomeado.iloc[i]
            
            try:
                dados_municipio = {
                    "codigo": int(linha_dados["codigo"]),
                    "nome": str(linha_dados["nome"]),
                    "populacaoTotal": converter_para_int(linha_dados["populacaoTotal"]),
                    "obitosMaternos": int(linha_dados["obitosMaternos"]),
                    "nascidosVivos": int(linha_dados["nascidosVivos"]),
                    "mortalidadeMaterna": converter_para_float(linha_dados["mortalidadeMaterna"]),
                    "totalConsultasPreNatal": int(linha_dados["totalConsultasPreNatal"])
                }
            except KeyError as e:
                print(f"Erro de mapeamento: A coluna {e} não foi encontrada no CSV ou no mapeamento.")
                print(f"Colunas disponíveis após renomear: {df_renomeado.columns.tolist()}")
                print("Verifique os nomes das colunas no seu arquivo CSV e no 'mapa_colunas' do script.")
                return
            except ValueError as e:
                print(f"Erro de conversão de valor na linha {i+1}: {e}")
                print(f"Dados da linha: {linha_dados.to_dict()}")
                return


            item_json = {
                "district": f"path{path_inicial + i}",
                "details": dados_municipio
            }
            lista_json_final.append(item_json)

        # Garantir que o diretório de saída exista
        diretorio_saida = os.path.dirname(caminho_arquivo_json_saida)
        if not os.path.exists(diretorio_saida) and diretorio_saida != '':
            os.makedirs(diretorio_saida)

        # Escrever o JSON no arquivo
        with open(caminho_arquivo_json_saida, 'w', encoding='utf-8') as f:
            json.dump(lista_json_final, f, ensure_ascii=False, indent=2)

        print(f"Arquivo JSON '{caminho_arquivo_json_saida}' gerado com sucesso com {len(lista_json_final)} registros.")

    except FileNotFoundError:
        print(f"Erro: O arquivo CSV '{caminho_arquivo_csv}' não foi encontrado.")
    except pd.errors.EmptyDataError:
        print(f"Erro: O arquivo CSV '{caminho_arquivo_csv}' está vazio.")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")

if __name__ == "__main__":
    # Define o caminho do script atual
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Define o caminho do arquivo CSV de entrada (assumindo que está na pasta 'assets/data')
    # Ajuste este caminho conforme a localização real do seu CSV.
    # Por exemplo, se o CSV estiver na mesma pasta que o script:
    # nome_arquivo_csv = "seu_arquivo.csv"
    # caminho_csv = os.path.join(script_dir, nome_arquivo_csv)

    # Exemplo: Se o CSV estiver em 'assets/data/meu_arquivo.csv'
    # e o script em 'assets/scripts/meu_script.py'
    nome_arquivo_csv = "rn.csv" # COLOQUE O NOME DO SEU ARQUIVO CSV AQUI
    caminho_csv = os.path.join(script_dir, '..', 'data', nome_arquivo_csv)


    # Define o caminho do arquivo JSON de saída
    nome_arquivo_json = "rn.json"
    caminho_json = os.path.join(script_dir, '..', 'data', nome_arquivo_json)

    # Executa o processamento
    processar_csv_para_json(caminho_csv, caminho_json)