from openai import OpenAI
from constants import MODEL_SYSTEM_PROMPT
from schemas.statement_dto import TransactionDTO

client = OpenAI()


def classify_transactions(data: list[TransactionDTO]):
    payload = [t.model_dump() for t in data]
    print(payload[1])

    response = client.responses.parse(
        model="gpt-5.5",
        input=[
            {"role": "system", "content": MODEL_SYSTEM_PROMPT},
            {"role": "user", "content": f"Data to classify: {payload[0]}"},
        ],
        text_format=TransactionDTO,
    )

    return response.output_parsed
