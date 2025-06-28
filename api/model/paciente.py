from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from model import Base


class Paciente(Base):
    __tablename__ = 'pacientes'

    id = Column(Integer, primary_key=True)
    name = Column("name", String(100))
    age = Column("age", Integer)
    systolic_bp = Column("systolic_bp", Integer)
    diastolic_bp = Column("diastolic_bp", Integer)
    blood_sugar = Column("blood_sugar", Integer)
    body_temp = Column("body_temp", Float)
    heart_rate = Column("heart_rate", Integer)
    risk_level = Column("risk_level", Float)
    data_insercao = Column("data_insercao", DateTime, default=datetime.now())

    def __init__(self, name: str, age: int, systolic_bp: int, diastolic_bp: int,
                 blood_sugar: int, body_temp: float, heart_rate: int, risk_level: float,
                 data_insercao: Union[DateTime, None] = None):
        """
        Cria uma Paciente

        Arguments:
        name: nome do paciente
            age: idade da paciente
            systolic_bp: pressão arterial sistólica - mm de Hg
            diastolic_bp: pressão arterial diastólica - mm de Hg
            blood_sugar: nível de glicose no sangue - mg/dL
            body_temp: temperatura corporal - °C
            heart_rate: frequência cardíaca - bpm
            risk_level: nível de risco do paciente - 0 baixo risco, 1 risco moderado, 2 alto risco
            data_insercao: data de quando o paciente foi inserido à base
        """
        self.name = name
        self.age = age
        self.systolic_bp = systolic_bp
        self.diastolic_bp = diastolic_bp
        self.blood_sugar = blood_sugar
        self.body_temp = body_temp
        self.heart_rate = heart_rate
        self.risk_level = risk_level

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao
