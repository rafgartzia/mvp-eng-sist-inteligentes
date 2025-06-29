# To run: pytest -v test_modelos.py

import pandas as pd
import pickle

from sklearn.metrics import accuracy_score

# Parâmetros
url_dados = "./MachineLearning/data/maternal-health-risk.csv"


# Carga dos dados
dataset = pd.read_csv(url_dados, delimiter=',')

print(dataset.head())

# Realiza a conversão de dados
# Coluna de resultados: converte os valores string em inteiros
dataset.replace({'low risk': 0, 'mid risk': 1, 'high risk': 2}, inplace=True)

# Converte a coluna de temperatura corporal de Fahrenheit para Celsius (1 casa decimal - medida comum de temperatura)
dataset['BodyTemp'] = round((dataset['BodyTemp'] - 32) * 5/9, 1)

# Converte coluna de glicemia de mmol/L para mg/dL (1 casa decimal)
dataset['BS'] = round(dataset['BS'] * 18.0182, 1)

array = dataset.values
X = array[:, 0:6]
y = array[:, 6]


def test_cart_model():
    # Importando o modelo CART
    cart_path = './MachineLearning/models/cart_maternalRisk.pkl'
    cart_model = pickle.load(open(cart_path, "rb"))

    # Obtendo as métricas do modelo CART
    cart_acuracy = accuracy_score(y, cart_model.predict(X))

    # Testando as métricas do modelo CART
    assert cart_acuracy >= 0.75
