import requests
from bs4 import BeautifulSoup
from WebScraping import scrape_and_summarize1, scrape_and_summarize

def BBC(url, keyword):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    headlines = soup.find_all(['h3', 'h2', 'h1'])
    
    update = {}
    
    for headline in headlines:
        title = headline.text.strip()
        if 'wildfire' in title.lower():
            link = headline.find_parent('a')
            if link and 'href' in link.attrs:
                full_link = f"https://www.bbc.com{link['href']}"
                if keyword.lower() in title.lower():
                    update[title] = full_link
    
    for head, link in update.items():
        print(f"{head} => {link}")
        summary = scrape_and_summarize(link)
        print("Summary:", summary)
        print()

def CBC(url, keyword):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    headlines = soup.find_all(['h5', 'h4', 'h3', 'h2', 'h1'])
    update = {}

    for headline in headlines:
        title = headline.text.strip()
        if 'wildfire' in title.lower():
            link = headline.find_parent('a')
            if link and 'href' in link.attrs:
                full_link = link['href']
                if not full_link.startswith('http'):
                    full_link = 'https://www.cbc.ca' + full_link
                if keyword.lower() in title.lower():
                    update[title] = full_link
    
    for head, link in update.items():
        print(f"{head} => {link}")
        summary = scrape_and_summarize1(link)
        print("Summary:", summary)
        print()

def GBN(url, keyword):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    selectors = [
        {'class': 'c-posts__headline'},
        {'class': 'c-card__title'},
        {'class': 'article-title'},
        {'class': 'headline'},
    ]
    
    headlines = []
    for selector in selectors:
        headlines.extend(soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], selector))
    
    update = {}
    
    for headline in headlines:
        title = headline.text.strip()
        if 'wildfire' in title.lower():
            link = headline.find_parent('a')
            if link and 'href' in link.attrs:
                full_link = link['href']
                if not full_link.startswith('http'):
                    full_link = 'https://globalnews.ca' + full_link
                if keyword.lower() in title.lower():
                    update[title] = full_link
    
    for head, link in update.items():
        print(f"{head} => {link}")
        summary = scrape_and_summarize(link)
        print("Summary:", summary)
        print()

def CTV(url, keyword):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    headlines = soup.find_all(['h6', 'h5', 'h4', 'h3', 'h2', 'h1'])
    
    update = {}
    
    for headline in headlines:
        title = headline.text.strip()
        if 'wildfire' in title.lower():
            link = headline.find_parent('a')
            if link and 'href' in link.attrs:
                full_link = link['href']
                if not full_link.startswith('http'):
                    full_link = 'https://edmonton.ctvnews.ca/' + full_link
                if keyword.lower() in title.lower():
                    update[title] = full_link
    
    for head, link in update.items():
        print(f"{head} => {link}")
        summary = scrape_and_summarize(link)
        print("Summary:", summary)
        print()

# Example usage
print("BBC News:")
BBC('https://www.bbc.com/news/us-canada', "jasper")
print("\nCBC News:")
CBC('https://www.cbc.ca/news/canada', "jasper")
