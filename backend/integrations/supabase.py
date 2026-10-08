import jwt
from jwt import PyJWKClient

from constants import SUPABASE_BASE_URL

jwks_client = PyJWKClient(f"{SUPABASE_BASE_URL}/.well-known/jwks.json")

def verify_token(token: str) -> dict:
    signing_key = jwks_client.get_signing_key_from_jwt(token)

    return jwt.decode(
        token,
        signing_key.key,
        algorithms=["ES256"],
        audience="authenticated",
        issuer=SUPABASE_BASE_URL,  
    )