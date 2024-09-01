from flask import Flask, request, jsonify
from utils.zapTest import performZapScanUrl
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test():
    print("On home route")
    return jsonify({
        'msg': "Health route fine"
    })

@app.route('/', methods=["POST"])
def zapTest():
    try:
        data = request.json
        
        print(data)
        url = data["url"]    
        if not url:
            return jsonify({
                "msg": "Invalid inputs",
            }), 403
    
        result = performZapScanUrl(url)
        return jsonify({
            "msg": "On POST /",
            "result": result
        })
    except Exception as e:
        print(f"Error during ZAP scan: {e}")
        return jsonify({'msg': 'Internal server error', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)