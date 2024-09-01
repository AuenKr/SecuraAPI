import logging
import os
import time
from zapv2 import ZAPv2

# Configure logging
logging.basicConfig(filename='test_case.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize OWASP ZAP
ZAP_BASE_URL = os.getenv('ZAP_BASE_URL', 'http://localhost:8080')
zap = ZAPv2(proxies={'http': ZAP_BASE_URL, 'https': ZAP_BASE_URL})

def performZapScanUrl(url, depth = False):
    print("zpa base url : ", ZAP_BASE_URL)
    if not url:
        return None
    zap.spider.scan(url)
    logging.info(f"Scanning URL: {url}")
    
    # Wait for Spider to complete
    if(depth):
        while int(zap.spider.status()) < 100:
            True
            
    # Run ZAP Active Scan
    zap.ascan.scan(url)
    logging.info(f"Active scanning URL: {url}")
    
    # Wait for Active Scan to complete
    if(depth):
        while int(zap.ascan.status()) < 100:
            time.sleep(1)
    
    # Get Alerts
    alerts = zap.core.alerts()
    logging.info(f"Alerts: {alerts}")
    
    return alerts