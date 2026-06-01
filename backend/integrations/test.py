import joblib

model = joblib.load("/Users/mcosta/dev/ledger/backend/transaction_model.pkl")


def categorize(text):
    return model.predict([text])


tests = [
    "ORDENADOS   -WIT-SOFTWARE, CON",
    "OP BX VALOR 03 TRAN 0343205/23",
    "FNAC",
    "NETFLIX.COM",
    "GALP COMBUSTIVEIS",
    "MBWAY JOAO SILVA",
    "AMAZON EU ORDER 12345",
    "麦当劳 北京",
]

for t in tests:
    print(t, "->", model.predict([t])[0])
