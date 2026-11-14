from openai import OpenAI
from pydantic import BaseModel

from constants import MODEL_SYSTEM_PROMPT, AI_MODEL
from schemas.statement import TransactionDTO

client = OpenAI()


class ClassifiedTransactions(BaseModel):
    transactions: list[TransactionDTO]


def classify_transactions(data: list[TransactionDTO]) -> list[TransactionDTO]:
    payload = [t.model_dump() for t in data]

    response = client.responses.parse(
        model=AI_MODEL,
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
