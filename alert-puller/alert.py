import requests, random
from bs4 import BeautifulSoup
import pandas as pd
import time
from googlesearch import search
import re


# Different Alert https://www.barrhead.ca/
# Wildfire targeted alert https://www.jasper-alberta.ca/
# no alert https://barnwell.ca/

def find_alert():
    url1 = "https://www.barrhead.ca"
    #url2 = "https://www.jasper-alberta.ca/"
    #url3 = "https://barnwell.ca/"


    response            = requests.get(url1)
    dangersoup          = BeautifulSoup(response.text, 'html.parser')
    modal_patterns      = [re.compile(r'\bmodal\b', re.IGNORECASE),
                            re.compile(r'\balert\b', re.IGNORECASE),
                            re.compile(r'\bpopup\b', re.IGNORECASE)]
    modals = []
    for pattern in modal_patterns:
        modals.extend(dangersoup.find_all(class_=pattern))

    # Find all <p> elements within modal elements
    alerts = []
    for modal in modals:
        alerts.extend(modal.find_all('p'))

    for alert in alerts:
        print(alert.get_text(strip=True))
    return alerts

def remove_duplicate(input_file, output_file):
    with open(input_file, 'r') as file:
        lines = file.readlines()

    # Use a set to track seen lines and a list to store unique lines
    seen = set()
    unique_lines = []
    
    for line in lines:
        if line not in seen:
            seen.add(line)
            unique_lines.append(line)

    with open(output_file, 'w') as file:
        file.writelines(unique_lines)

def main():
    alert = find_alert()

    input_file = 'alert_in_barnwell.html'
    output_file = 'alert_out_barnwell.html'

    with open('alert_in_barnwell.html', 'w') as file:
        for item in alert:
            file.write(f"{item}\n")

    remove_duplicate(input_file, output_file)


if __name__ == "__main__":
    main()
