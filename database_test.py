import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import sqlite3
from urllib.parse import urljoin, urlparse, parse_qs

# Set up Selenium WebDriver
def init_selenium_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run headless for no browser window
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def clean_title(title):
    """Clean the title by removing unwanted annotations like '[BOOK][B]'."""
    return re.sub(r'\[.*?\]', '', title).strip()

def getScholarData(url, driver, site="scholar"):
    try:
        driver.get(url)
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        scholar_results = []

        if site == "scholar":
            # Extract title, link, and full text from Google Scholar
            for el in soup.select(".gs_r")[:1]:  # Select top 1 result
                title_link = el.select(".gs_rt a")[0]["href"] if el.select(".gs_rt a") else ""
                snippet = el.select(".gs_rs")  # Abstract/summary part
                snippet_text = snippet[0].get_text(strip=True) if snippet else "No snippet available"
                
                scholar_results.append({
                    "title": clean_title(el.select(".gs_rt")[0].get_text(strip=True)),
                    "url": title_link,
                    "full_text": snippet_text,  # Using the cleaned snippet text
                })

        elif site == "pubmed":
            # Extract title, link, and full text from PubMed
            for el in soup.select(".docsum-title")[:1]:  # Select top 1 result
                title_link = el.select("a")[0]["href"] if el.select("a") else ""
                # Wait for the abstract content to load (sometimes dynamically)
                abstract = el.find_next("div", class_="docsum-content")
                abstract_text = abstract.get_text(strip=True) if abstract else "No abstract available"
                
                scholar_results.append({
                    "title": clean_title(el.get_text(strip=True)),
                    "url": urljoin("https://pubmed.ncbi.nlm.nih.gov", title_link),
                    "full_text": abstract_text,  # Using abstract text as full text
                })
        
        return scholar_results

    except Exception as e:
        print(f"Error: {e}")
        return []

def init_db():
    conn = sqlite3.connect('scholar_data.db')
    c = conn.cursor()

    # Drop the table if it exists
    c.execute("DROP TABLE IF EXISTS scholar_results")

    # Recreate the table without the topic column
    c.execute(''' 
        CREATE TABLE IF NOT EXISTS scholar_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            url TEXT,
            full_text TEXT
        )
    ''')
    conn.commit()
    conn.close()

def insert_data(title, url, full_text):
    conn = sqlite3.connect('scholar_data.db')
    c = conn.cursor()
    c.execute(''' 
        INSERT INTO scholar_results (title, url, full_text)
        VALUES (?, ?, ?)
    ''', (title, url, full_text))
    conn.commit()
    conn.close()

def download_and_store_websites(topics, sites):
    driver = init_selenium_driver()

    for topic in topics:
        for site in sites:
            base_url = get_base_url(site)
            if base_url:
                url = base_url.format(topic.replace(" ", "+"))
                
                results = getScholarData(url, driver, site=site)
                if results:
                    for result in results:
                        insert_data(result['title'], result['url'], result['full_text'])  # Exclude 'topic'

    driver.quit()  # Close the Selenium driver after all tasks are done

def get_base_url(site):
    """Return the base URL format for different sites."""
    if site == "scholar":
        return "https://scholar.google.com/scholar?q={}&hl=en"
    elif site == "pubmed":
        return "https://pubmed.ncbi.nlm.nih.gov/?term={}"

    else:
        print(f"Unknown site: {site}")
        return None

def display_db_contents():
    conn = sqlite3.connect('scholar_data.db')
    c = conn.cursor()

    # Fetch all rows from the scholar_results table
    c.execute('SELECT * FROM scholar_results')
    rows = c.fetchall()

    # Check if there are any results and print them
    if rows:
        print("Displaying all rows from scholar_results:")
        for row in rows:
            print(row)  # This will print each row as a tuple
    else:
        print("No data found in scholar_results.")

    conn.close()

def load_topics_from_file(file_path):
    """Load topics from a text file where each line is a research topic."""
    try:
        with open(file_path, 'r') as file:
            topics = [line.strip() for line in file.readlines()]
        return topics
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return []

# Example usage
init_db()

# Load topics from a text file (one topic per line)
topics_file = 'C:/Users/iegre/VSCode/research_topics.txt'
topics = load_topics_from_file(topics_file)

# List of sites to scrape
sites = ["scholar", "pubmed"]  # Add more sites here as needed

# Download and store websites for the topics and sites
download_and_store_websites(topics, sites)

# Display the contents of the database
display_db_contents()
