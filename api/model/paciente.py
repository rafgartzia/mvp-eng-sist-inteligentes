from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union

from model import Base


class Paciente(Base):
    __tablename__ = 'pacientes'

    id = Column(Integer, primary_key=True)
    name = Column("Name", String(100))
    age = Column("Age", Integer)
    systolicbp = Column("SystolicBP", Integer)
    diastolicbp = Column("DiastolicBP", Integer)
    bs = Column("BloodSugar", Integer)
    bodytemp = Column("BodyTemp", float)
    hearthrate = Column("HearthRate", Integer)
    riskLevel = Column("Diagnostic", float)
    data_insercao = Column(DateTime, default=datetime.now())

    def __init__(self, name: str, age: int, systolicbp: int, diastolicbp: int,
                 bs: int, bodytemp: float, hearthrate: int, risklevel: float,
                 data_insercao: Union[DateTime, None] = None):
        """
        Cria uma Paciente

        Arguments:
        name: nome do paciente
            age: idade da paciente
            systolicBP: pressão arterial sistólica - mm de Hg
            diastolicBP: pressão arterial diastólica - mm de Hg
            bs: nível de glicose no sangue - mg/dL
            bodyTemp: temperatura corporal - °C
            hearthRate: frequência cardíaca - bpm
            riskLevel: nível de risco do paciente - 0 baixo risco, 1 risco moderado, 2 alto risco
            data_insercao: data de quando o paciente foi inserido à base
        """
        self.name = name
        self.age = age
        self.systolicbp = systolicbp
        self.diastolicbp = diastolicbp
        self.bs = bs
        self.bodytemp = bodytemp
        self.hearthrate = hearthrate
        self.risklevel = risklevel

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao
