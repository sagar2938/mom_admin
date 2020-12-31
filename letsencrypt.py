from flask import Flask, Response

app = Flask(__name__)
app.config['DEBUG'] = True



response = 'iETOPsLx79qW-4SSuNL6DdBRj2-p3Ty-hL7cYOT54wg'


@app.route('/.well-known/acme-challenge/<challenge>')
def letsencrypt(challenge):
    newRes= str(challenge)+"."+ response
    return Response(newRes, mimetype='text/plain')
