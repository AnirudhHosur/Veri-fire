# import requests
# from bs4 import BeautifulSoup
# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import sent_tokenize, word_tokenize
# from heapq import nlargest

# # Download necessary NLTK data
# nltk.download('punkt')
# nltk.download('stopwords')

# def summarize_text(text, num_sentences=5):
#     sentences = sent_tokenize(text)
    
#     # Filter sentences that are likely to contain key information
#     key_sentences = [sent for sent in sentences if any(keyword in sent.lower() for keyword in 
#                     ['official', 'report', 'estimate', 'according', 'authority', 'government', 
#                      'damage', 'cost', 'impact', 'infrastructure', 'economy', 'million', 'billion'])]
    
#     # If we don't have enough key sentences, add more from the original text
#     if len(key_sentences) < num_sentences:
#         key_sentences.extend(sentences[:num_sentences - len(key_sentences)])
    
#     summary = ' '.join(key_sentences[:num_sentences])
    
#     # Remove transitional words at the start of the summary
#     transitional_words = ['however', 'moreover', 'furthermore', 'nevertheless']
#     for word in transitional_words:
#         if summary.lower().startswith(word):
#             summary = summary[len(word):].strip()
#             break
    
#     return summary

# def scrape_and_summarize(url):
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
    
#     article_body = soup.find('article')
#     if article_body:
#         paragraphs = article_body.find_all('p')
#         text = ' '.join([p.text for p in paragraphs])
#         summary = summarize_text(text)
#         return summary.replace("'", "'").replace('"', '"')  # Fix apostrophes and quotes
#     else:
#         return "Could not extract article content."

import requests
from bs4 import BeautifulSoup
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from heapq import nlargest
import re

# Download necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

def summarize_text(text, num_sentences=5):
    sentences = sent_tokenize(text)
    
    # Filter sentences that are likely to contain key information
    key_sentences = [sent for sent in sentences if any(keyword in sent.lower() for keyword in 
                    ['official', 'report', 'estimate', 'according', 'authority', 'government', 
                     'damage', 'cost', 'impact', 'infrastructure', 'economy', 'million', 'billion'])]
    
    # If we don't have enough key sentences, add more from the original text
    if len(key_sentences) < num_sentences:
        key_sentences.extend(sentences[:num_sentences - len(key_sentences)])
    
    summary = ' '.join(key_sentences[:num_sentences])
    
    # Remove transitional words at the start of the summary
    transitional_words = ['however', 'moreover', 'furthermore', 'nevertheless']
    for word in transitional_words:
        if summary.lower().startswith(word):
            summary = summary[len(word):].strip()
            break
    
    return summary

def scrape_and_summarize(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Check different likely tags that may contain the article content
    article_body = soup.find('article') or soup.find('div', class_='some-class')  # Change 'some-class' as needed
    if not article_body:
        article_body = soup.find('div', attrs={'role': 'main'})  # Another common pattern
    
    if article_body:
        paragraphs = article_body.find_all('p')
        text = ' '.join(p.text for p in paragraphs)
        return summarize_text(text)
    else:
        return "Could not extract article content."

# # Main script
# url = 'https://www.bbc.com/news/us-canada'

# response = requests.get(url)
# soup = BeautifulSoup(response.content, 'html.parser')

# # Find all article headlines
# headlines = soup.find_all(['h3', 'h2', 'h1'])

# for headline in headlines:
#     title = headline.text.strip()
#     if 'wildfire' in title.lower():
#         link = headline.find_parent('a')
#         if link:
#             full_link = f"https://www.bbc.com{link['href']}"
#             print(f"Headline: {title}")
#             print(f"Link: {full_link}")
            
#             # Scrape and summarize the article
#             summary = scrape_and_summarize(full_link)
#             print(f"Summary: {summary}\n")

# print("Scraping and summarization complete.")

def summarize_text1(text, num_sentences=5):
    sentences = sent_tokenize(text)
    
    key_sentences = [sent for sent in sentences if any(keyword in sent.lower() for keyword in 
                    ['official', 'report', 'estimate', 'according', 'authority', 'government', 
                     'damage', 'cost', 'impact', 'infrastructure', 'economy', 'million', 'billion'])]
    
    if len(key_sentences) < num_sentences:
        key_sentences.extend(sentences[:num_sentences - len(key_sentences)])
    
    summary = ' '.join(key_sentences[:num_sentences])
    
    transitional_words = ['however', 'moreover', 'furthermore', 'nevertheless']
    for word in transitional_words:
        if summary.lower().startswith(word):
            summary = summary[len(word):].strip()
            break
    
    return summary

def scrape_and_summarize1(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # More flexible selector for article content
    article_body = soup.find('div', {'class': re.compile(r'(article|content|story)')})
    if not article_body:
        article_body = soup.find('article')
    
    if article_body:
        paragraphs = article_body.find_all('p')
        text = ' '.join([p.text for p in paragraphs])
        summary = summarize_text1(text)
        return summary.replace("'", "'").replace('"', '"')  # Fix apostrophes and quotes
    else:
        return "Could not extract article content."
