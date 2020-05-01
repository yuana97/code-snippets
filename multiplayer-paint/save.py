#!usr/bin/python

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sys

cred = credentials.Certificate("creds.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

# read the pixel-painting mapping from the args and put it into the db
key = sys.argv[1] + ',' + sys.argv[2]
filename = sys.argv[3]

f = open(filename, 'r')
value = "\n".join(f.readlines())
data = {
  unicode('data') : unicode(value)
}

db.collection(u'app').document(unicode(key)).set(data)

print(1)
