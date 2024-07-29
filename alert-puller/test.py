import requests
from bs4 import BeautifulSoup
import re

def fetch_html(url):
    """Fetch the HTML content from the given URL."""
    response = requests.get(url)
    response.raise_for_status()
    return response.content

def find_alert_modals(html_content):
    """Find modal elements indicating alerts in the HTML content."""
    soup = BeautifulSoup(html_content, 'html.parser')

    # Define the pattern to find modal classes (common keywords used for alerts)
    modal_patterns = [re.compile(r'\bmodal\b', re.IGNORECASE),
                      re.compile(r'\balert\b', re.IGNORECASE),
                      re.compile(r'\bpopup\b', re.IGNORECASE)]

    # Collect modal elements
    modals = []
    for pattern in modal_patterns:
        modals.extend(soup.find_all(class_=pattern))

    # Find all <p> elements within modal elements
    alerts = []
    for modal in modals:
        alerts.extend(modal.find_all('p'))
    
    return alerts

def print_alerts(alerts):
    """Print the found alert messages."""
    for alert in alerts:
        print(alert.get_text(strip=True))

# Example usage
url = "https://www.jasper-alberta.ca/"
html_content = fetch_html(url)
alerts = find_alert_modals(html_content)
print_alerts(alerts)