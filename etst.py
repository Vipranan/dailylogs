import boto3
import json
 
client = boto3.client("bedrock-runtime", region_name="ap-south-1")
 
model_id = "openai.gpt-oss-120b-1:0"

body = {
"messages": [
{"role": "user", "content": "Explain RAG briefly"}
],
"max_tokens": 200,
"temperature": 0.7,
"top_p": 0.9
}
 
response = client.invoke_model(
modelId=model_id,
body=json.dumps(body)
)
 
result = json.loads(response["body"].read())
print(result["choices"][0]["message"]["content"])
