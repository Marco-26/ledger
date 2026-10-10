from openai import OpenAI
from pydantic import BaseModel

from constants import MODEL_SYSTEM_PROMPT
from schemas.statement import TransactionDTO

client = OpenAI()


class ClassifiedTransactions(BaseModel):
    transactions: list[TransactionDTO]


def classify_transactions(data: list[TransactionDTO]):
    payload = [t.model_dump() for t in data]

    response = client.responses.parse(
        model="gpt-5.4-mini",
        input=[
            {"role": "system", "content": MODEL_SYSTEM_PROMPT},
            {
                "role": "user",
                "content": f"Data to classify: {payload}",
            },
        ],
        text_format=ClassifiedTransactions,
    )

    result = response.output_parsed
    return result.transactions if result else []
