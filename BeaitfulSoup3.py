import requests
from bs4 import BeautifulSoup

def extract_wildfire_info(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all article elements
        articles = soup.find_all(['div', 'article'], class_=['gc__content', 'featured-articles-list__article'])
        
        found_articles = False
        for article in articles:
            title_element = article.find(['h3', 'h1', 'h2'], class_=['gc__title', 'featured-articles-list__title'])
            if title_element:
                title = title_element.text.strip()
                if any(keyword in title.lower() for keyword in ['wildfire', 'jasper']):
                    link_element = title_element.find_parent('a') or article.find('a')
                    link = link_element['href'] if link_element else "Link not found"
                    if link.startswith('/'):
                        link = f"https://www.aljazeera.com{link}"
                    
                    date_element = article.find(['span', 'div'], class_=['date-simple', 'date'])
                    date = date_element.text.strip() if date_element else "Date not found"
                    
                    summary_element = article.find(['p', 'div'], class_=['gc__excerpt', 'featured-articles-list__excerpt'])
                    summary = summary_element.text.strip() if summary_element else "Summary not found"
                    
                    print(f"Title: {title}")
                    print(f"Date: {date}")
                    print(f"Link: {link}")
                    print(f"Summary: {summary}")
                    print("-" * 50)
                    found_articles = True
        
        if not found_articles:
            print("No articles found about wildfires or Jasper National Park.")
        
    except requests.RequestException as e:
        print(f"Error during request to {url}: {str(e)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Run the function
extract_wildfire_info('https://www.aljazeera.com/us-canada/')
