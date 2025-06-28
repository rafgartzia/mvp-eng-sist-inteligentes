from pydantic import BaseModel
from typing import Optional, List
from model.paciente import Paciente


class PacienteSchema(BaseModel):
    """ Define como um novo paciente a ser inserido deve ser representado
    """
    name: str = "Tatiana"
    age: int = 30
    systolic_bp: int = 100
    diastolic_bp: int = 70
    blood_sugar: int = 90
    body_temp: float = 36.5
    heart_rate: int = 80


class PacienteViewSchema(BaseModel):
    """Define como um paciente será retornado
    """
    id: int = 1
    name: str = "Tatiana"
    age: int = 30
    systolic_bp: int = 100
    diastolic_bp: int = 70
    blood_sugar: int = 90
    body_temp: float = 36.5
    heart_rate: int = 80
    risk_level: float = None


class PacienteBuscaSchema(BaseModel):
    """Define como deve ser a estrutura que representa a busca.
    Ela será feita com base no nome do paciente.
    """
    name: str = "Tatiana"


class ListaPacientesSchema(BaseModel):
    """Define como uma lista de pacientes será representada
    """
    pacientes: List[PacienteSchema]


class PacienteDelSchema(BaseModel):
    """Define como um paciente para deleção será representado
    """
    name: str = "Tatiana"

# Apresenta apenas os dados de um paciente


def apresenta_paciente(paciente: Paciente):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    return {
        "id": paciente.id,
        "name": paciente.name,
        "age": paciente.age,
        "systolic_bp": paciente.systolic_bp,
        "diastolic_bp": paciente.diastolic_bp,
        "blood_sugar": paciente.blood_sugar,
        "body_temp": paciente.body_temp,
        "heart_rate": paciente.heart_rate,
        "risk_level": paciente.risk_level
    }

# Apresenta uma lista de pacientes


def apresenta_pacientes(pacientes: List[Paciente]):
    """ Retorna uma representação do paciente seguindo o schema definido em
        PacienteViewSchema.
    """
    result = []
    for paciente in pacientes:
        result.append({
            "id": paciente.id,
            "name": paciente.name,
            "age": paciente.age,
            "systolic_bp": paciente.systolic_bp,
            "diastolic_bp": paciente.diastolic_bp,
            "blood_sugar": paciente.blood_sugar,
            "body_temp": paciente.body_temp,
            "heart_rate": paciente.heart_rate,
            "risk_level": paciente.risk_level
        })

    return {"pacientes": result}
