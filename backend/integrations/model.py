import pandas as pd
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.svm import LinearSVC

df = pd.read_parquet("/Users/mcosta/dev/ledger/backend/integrations/data.parquet")


X = df["transaction_description"]
y = df["category"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

features = FeatureUnion(
    [
        ("word", TfidfVectorizer(analyzer="word", ngram_range=(1, 2))),
        ("char", TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 5))),
    ]
)

model = Pipeline(
    [
        ("features", features),
        ("clf", LinearSVC(max_iter=5000, class_weight="balanced")),
    ]
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

print(classification_report(y_test, pred))
