from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import pandas as pd

# Configurar Selenium
chrome_options = Options()
chrome_options.add_argument("--headless")  # Ejecuta Chrome en modo headless

# Iniciar el navegador Chrome
driver: WebDriver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# Abrir la página web
url = "https://dentaleshop.com.co/"
driver.get(url)

# Esperar hasta que los productos sean visibles
try:
    WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "product-miniature")))

    # Obtener el contenido de la página con JavaScript cargado
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # Extraer productos
    productos = []
    for producto in soup.find_all('article', class_='product-miniature'):  # Buscar productos por la clase correcta
        nombre = producto.find('h3', class_='product-title').text.strip() if producto.find('h3', class_='product-title') else 'No disponible'
        precio = producto.find('span', class_='price').text.strip() if producto.find('span', class_='price') else 'No disponible'
        imagen = producto.find('img')['src'] if producto.find('img') else 'No disponible'
        productos.append({'nombre': nombre, 'precio': precio, 'imagen': imagen})

    # Guardar datos en un archivo CSV
    if productos:
        df = pd.DataFrame(productos)
        df.to_csv('productos.csv', index=False, encoding='utf-8')
        print("Productos extraídos correctamente y guardados en productos.csv")
    else:
        print("No se encontraron productos")

finally:
    # Cerrar el navegador
    driver.quit()
