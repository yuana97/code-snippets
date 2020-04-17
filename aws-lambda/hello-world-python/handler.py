import time

def hello(event, context):
    print("second update !")
    time.sleep(4)
    return "hello-world"