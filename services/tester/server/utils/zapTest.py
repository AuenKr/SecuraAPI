import logging
import os
import time
from zapv2 import ZAPv2

# Configure logging
logging.basicConfig(filename='test_case.log', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialize OWASP ZAP
ZAP_BASE_URL = os.getenv('ZAP_BASE_URL', 'http://zap:8080')  # Use the Docker service name
ZAP_DEPTH_SCAN = os.getenv('ZAP_DEPTH_SCAN', True)
zap = ZAPv2(proxies={'http': ZAP_BASE_URL, 'https': ZAP_BASE_URL})

def performZapScanUrl(url):
    depth = False if ZAP_DEPTH_SCAN != "true" else True
    
    if not url:
        return None

    try:
        # Start the Spider scan
        scan_id = zap.spider.scan(url)
        logging.info(f"Started spider scan on URL: {url} with Scan ID: {scan_id}")
        
        # Wait for the Spider scan to complete
        while (depth and int(zap.spider.status(scan_id)) < 100):
            logging.info(f"Spider scan progress: {zap.spider.status(scan_id)}%")
            time.sleep(1)  # Wait for 1 second before polling again
        
        logging.info(f"Spider scan completed for URL: {url}")

        # Start the Active Scan
        active_scan_id = zap.ascan.scan(url)
        logging.info(f"Started active scan on URL: {url} with Scan ID: {active_scan_id}")
        
        # Wait for the Active Scan to complete
        while(depth and int(zap.ascan.status(active_scan_id)) < 100):
            logging.info(f"Active scan progress: {zap.ascan.status(active_scan_id)}%")
            time.sleep(1)  # Wait for 1 second before polling again

        logging.info(f"Active scan completed for URL: {url}")

        # Retrieve alerts
        alerts = zap.core.alerts(baseurl=url)
        logging.info(f"Alerts: {alerts}")
        return alerts
    
    except Exception as e:
        logging.error(f"Error during ZAP scan: {e}")
        return None
