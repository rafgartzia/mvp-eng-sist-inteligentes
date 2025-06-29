# Pós Eng. Soft. PUC-Rio
## MVP Dev. Qualidade de Software, Segurança e Sistemas Inteligentes


### Intro
Nessa proposta de MVP pretendemos criar uma solução com um modelo para classificar o risco materno com base em algumas variáveis de saúde.

Foi utilizado o seguinte dataset: 

Maternal Health Risk - https://doi.org/10.24432/C5DP5D - Marzia Ahmed - Daffodil International University

O dataset utilizado contém dados coletados em diferentes hospitais, clínicas comunitárias, centro de saúde materno de áeras rurais de Bangradesh.

Dicionário de dados:

Age - Idade da paciente;
SystolicBP - pressão arterial sistólica;
DiastolicBP - pressão arterial diastólica;
BS - Nível de glicose no sangue - mmol/L;
BodyTemp - Temperatura corporal - F;
HeartRate - Batimentos por minuto;
RiskLevel - Nível de risco;

As unidades de Nível de glicose e temperatura corporal foram convertidas para mg/dL e ºC, respectivamente.


### Execução da API

É recomendado o uso de ambiente virtual. O comando abaixo cria o ambiente de nome ".env".

```
pasta_raiz\python -m venv .env
```
Ativar o ambiente virtual.

Para execução da API será necessária a instalação das bibliotecas listadas no `requirements.txt`.

Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

```
pasta_raiz\pip install -r requirements.txt
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `requirements.txt`.

Para executar a API  basta executar:

```
(env)$ flask run --host 0.0.0.0 --port 5000
```

Abra o [http://localhost:5000/](http://localhost:5000/) no navegador, será carregada a página da aplicação.

Para acessar a documentação da API basta carregar o endereço [http://localhost:5000/docs](http://localhost:5000/docs)
