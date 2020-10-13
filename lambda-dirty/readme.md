Compress all eight files/folders & rename the zip as covidnow-usa.zip
aws lambda update-function-code --function-name arn:aws:lambda:us-east-2:031448913604:function:CovidNow-USA --zip-file fileb://covidnow-usa.zip
